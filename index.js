document.addEventListener("DOMContentLoaded", () => {
  getRecipes();
});

const getRecipes = () => {
  fetch("http://localhost:3000/api/v1/recipes")
    .then((response) => response.json())
    .then((recipes) => {
      recipes.data.forEach((recipe) => {
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
      });
    })
    .catch((err) => console.log(err, "this is an error!!!"));
};
