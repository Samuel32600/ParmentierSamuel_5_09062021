"use strict";

//************************************
// recherche dans la barre principale
//************************************
mainSearch.addEventListener("input", principalSearch);

function principalSearch() {
  var operationCount = 0;
  document.querySelectorAll('.result-recipe').forEach(function (showCards) {
    return showCards.remove();
  });
  allRecipesOfObject = [];

  if (mainSearch.value.length > 2) {
    allRecipesFounded.forEach(function (oneOfRecipe) {
      operationCount++;

      if (oneOfRecipe.hasFilters === totalFilters) {
        if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          allRecipesOfObject.push(oneOfRecipe);
        } else if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          allRecipesOfObject.push(oneOfRecipe);
        } else {
          oneOfRecipe.ingredients.forEach(function (ingr) {
            if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
              allRecipesOfObject.push(oneOfRecipe);
            }
          });
        }
      }
    });
    getValidRecipe();
  }

  console.log("Voici le nombre d'opérations : ", operationCount);
}

function principalSearchV2() {
  var operationCount = 0;

  if (mainSearch.value.length > 2) {
    document.querySelectorAll('.result-recipe').forEach(function (showCards) {
      return showCards.remove();
    });
    allRecipesOfObject = [];
    allRecipesFounded.forEach(function (oneOfRecipe) {
      operationCount++;

      if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        allRecipesOfObject.push(oneOfRecipe);
      } else if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        allRecipesOfObject.push(oneOfRecipe);
      } else {
        oneOfRecipe.ingredients.forEach(function (ingr) {
          if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
            allRecipesOfObject.push(oneOfRecipe);
          }
        });
      }
    });
    allRecipesOfObject.forEach(function (oneSemiValidatedRecipe, index) {
      operationCount++;

      if (oneSemiValidatedRecipe.hasFilters !== totalFilters) {
        allRecipesOfObject.splice(index, 1);
      }
    });
    getValidRecipe();
  }

  console.log("Voici le nombre d'opérations : ", operationCount);
}