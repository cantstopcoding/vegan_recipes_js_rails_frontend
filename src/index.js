document.addEventListener("DOMContentLoaded", () => {
  getRecipes();

  const createRecipeForm = document.querySelector("#create-recipe-form");

  createRecipeForm.addEventListener("submit", (e) => createRecipeHandler(e));
});

const getRecipes = () => {
  fetch("http://localhost:3000/api/v1/recipes")
    .then((response) => response.json())
    .then((recipes) => {
      recipes.data.forEach((recipe) => {
        let newRecipe = new Recipe(recipe, recipe.attributes);
        document.querySelector("#recipe-container").innerHTML +=
          newRecipe.renderRecipeCard();
      });
    })
    .catch((err) => console.log(err, "this is an error!!!"));
};

const createRecipeHandler = (e) => {
  e.preventDefault();
  const inputTitle = document.querySelector("#input-title").value;
  const inputUrl = document.querySelector("#input-url").value;
  const inputInstructions = document.querySelector("#input-instructions").value;
  const inputIngredients = document.querySelector("#input-ingredients").value;
  const categoryId = parseInt(document.querySelector("#categories").value);
  postFetch(
    inputTitle,
    inputUrl,
    inputInstructions,
    inputIngredients,
    categoryId
  );
  // console.log(e);
};

const postFetch = (
  title,
  image_url,
  instructions,
  ingredients,
  category_id,
  category
) => {
  fetch("http://localhost:3000/api/v1/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      image_url,
      instructions,
      ingredients,
      category_id,
      category,
    }),
  })
    .then((response) => response.json())
    .then((recipe) => {
      if (Array.isArray(recipe)) {
        alert(recipe.join(", "));
      } else {
        console.log(recipe);
        const recipeData = recipe.data;

        newRecipe = new Recipe(recipeData, recipeData.attributes);

        document.querySelector("#recipe-container").innerHTML +=
          newRecipe.renderRecipeCard();
      }
    })
    .catch((err) => {
      console.log(err, "this is an error!!!");
    });
};
