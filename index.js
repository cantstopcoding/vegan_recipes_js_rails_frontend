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
        render(recipe);
      });
    })
    .catch((err) => console.log(err, "this is an error!!!"));
};

const render = (recipe) => {
  const recipeMarkup = `
            <div data-id=${recipe.id}>
                <img src=${recipe.attributes.image_url} height="200" width="250">
                <h3>${recipe.attributes.title}</h3>
                <p>${recipe.attributes.ingredients}</p>
                <p>${recipe.attributes.instructions}</p>
                <p>${recipe.attributes.category.name}</p>
                <button data-id={recipe.id}>edit</button>
            </div>
            <br>
            <br>
        `;

  document.querySelector("#recipe-container").innerHTML += recipeMarkup;
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
        document.querySelector("#errors").innerHTML += recipe.join(", ");
      } else {
        const recipeData = recipe.data;
        render(recipeData);
      }
    })
    .catch((err) => {
      console.log(err, "this is an error!!!");
    });
};
