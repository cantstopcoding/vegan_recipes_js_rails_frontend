class Recipe {
  constructor(recipe, recipeAttributes) {
    this.id = recipe.id;
    (this.title = recipeAttributes.title),
      (this.ingredients = recipeAttributes.ingredients),
      (this.instructions = recipeAttributes.instructions),
      (this.image_url = recipeAttributes.image_url),
      (this.category = recipeAttributes.category);
    Recipe.all.push(this);
  }

  renderRecipeCard = () => {
    return `
      <div data-id=${this.id}>
        <img src=${this.image_url} height="200" width="250">
        <h3>${this.title}</h3>
        <p>${this.ingredients}</p>
        <p>${this.instructions}</p>
        <p>${this.category.name}</p>
        <button data-id=${this.id}>edit</button>
      </div>
      <br>
      <br>
    `;
  };
}

Recipe.all = [];
