class Recipe {
  constructor(recipe, recipeAttributes) {
    this.id = recipe.id;
    (this.title = recipeAttributes.title),
      (this.ingredients = recipeAttributes.ingredients),
      (this.instructions = recipeAttributes.instructions),
      (this.image_url = recipeAttributes.image_url),
      (this.category = recipeAttributes.category);
    Recipe.all.push(this);
    debugger;
  }
}

Recipe.all = [];
