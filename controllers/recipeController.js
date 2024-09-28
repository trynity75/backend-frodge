const { recipes } = require('../middlewares/validationBody')
const Recipe = require('./../models/Recipe')

const createRecipe = async (req, res) => {
  const { name, imageurl, ingredients, allergens, preparation, category, vegetarian } = req.body;
  console.log(ingredients);

  try {
    // Verifica si la receta ya existe
    const existingRecipe = await Recipe.findOne({ name });
    if (existingRecipe) {
      return res.status(400).json({
        ok: false,
        msg: `${existingRecipe.name} ya existe en la base de datos!`
      });
    }

    // Convierte los ingredientes a minúsculas
    const lowerItemsArray = ingredients.map(ingredient => ingredient.toLowerCase());

    // Crea una nueva instancia de la receta
    const newRecipe = new Recipe({
      name,
      imageurl,
      ingredients: lowerItemsArray,
      allergens,
      preparation,
      category,
      vegetarian
    });

    // Guarda la nueva receta en la base de datos
    await newRecipe.save();

    return res.status(201).json({
      ok: true,
      msg: `La receta "${newRecipe.name}" ha sido creada en la base de datos`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error del servidor, por favor contactar a soporte.'
    });
  }
};


// const createRecipe = async (req, res) => {
//   const { name, imageurl, ingredients,  allergens, preparation, category, vegetarian  }  = req.body
//   console.log(ingredients)
//   try {
//     const recipe = await Recipe.findOne({ name: name })
//     if (recipe) return res.status(400).json({
//       ok: false,
//       msg: `${recipe.name} ya existe en la base de datos!`
//     })
//     const lowerItemsArray = []
//     ingredients.map(ingredient => {
//       lowerItemsArray.push(ingredient.toLowerCase())
//     });

//     const Recipe = new Recipe ({
//       name: name,
//       imageurl: imageurl,
//       ingredients: lowerItemsArray,
//       allergens: allergens,
//       preparation: preparation,
//       category: category,
//       vegetarian: vegetarian
//     })
//     await Recipe.save()
//     return res.status(201).json({
//       ok: true,
//       msg: `La receta ${Recipe.name} ha sido creada en la base de datos`
//     })
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       ok: false,
//       msg: 'Error del servidor, por favor contactar a soporte.'
//     })
//   }
// }

const deleteRecipeById = async (req, res) => {
  const id = req.params.id
  try {
    const recipe = await Recipe.findByIdAndDelete(id)
    if(!recipe) {
      return res.status(400).json({
        ok: false,
        msg: 'El id es obligatorio'
      })
    }
    return res.status(200).json({
      ok: true,
      msg: 'Receta eliminada correctamente'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Error, por favor contacte a soporte'
    })
  }
}

const updateRecipeById = async (req, res) => {
  const id = req.params.id
  const data = req.body
  try {
    const updateRecipe = await Recipe.findOneAndUpdate({_id: id}, data, {new: true})
    return res.status(200).json ({
      ok: true,
      msg: 'Receta actualizada',
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json ({
      ok: false,
      msg: 'No se pudo actualizar'
    })
  }
}

const findRecipesByIngredients = async (req, res) => {
  try {
    const ingredients = req.body.ingredients
    const lowerItemsArray = []
    ingredients.forEach(ingredient => {
      lowerItemsArray.push(ingredient.toLowerCase())
    });
    const recipes = await Recipe.find({ ingredients: { $all: lowerItemsArray } });

    console.log(recipes)
    if(recipes.length===0) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontraron recetas relacionadas'
      })
    }
    res.status(200).json(recipes)
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al buscar receta'
    })
  } 
};

const findRecipeByName = async (req, res) => {
  try {
    const name = req.body.name
    const lowerName = name.toLowerCase()
    console.log(lowerName)
    const recipes = await Recipe.findOne({ name: lowerName });
    console.log(recipes)
    if(!recipes){
      return res.status(400).json({
        ok: false,
        msg: 'Receta no encontrada'
      })
    }
      return res.status(200).json(recipes)
    }catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        msg: 'Por favor contacte a soporte'
      })
  }  
}

const getRecipeByIngredientName = async (req, res) => {
  try {
    const name = req.params.name
    const lowerName = name.toLowerCase()
    console.log(lowerName)
    const recipes = await Recipe.find({ ingredients: lowerName });
    console.log(recipes)
    if (!recipes) {
      return res.status(400).json({
        ok: false,
        msg: 'Receta no encontrada'
      })
    }
    return res.status(200).json({
      recipes: recipes
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Por favor contacte a soporte'
    })
  }
}

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No products found in the database!'
      })
    }

    return res.status(200).json({
      ok: true,
      recipes
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Server error, please contact support.'
    })
  }
}





module.exports = { 
  createRecipe, 
  deleteRecipeById,
  updateRecipeById, 
  findRecipesByIngredients, 
  findRecipeByName,
  getAllRecipes,
  getRecipeByIngredientName
}