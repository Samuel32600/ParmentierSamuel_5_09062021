"use strict";

var allRecipesOfObject = [];
var allRecipesFounded = [];
var threeFilters = [];
var totalFilters = 0; //***************************
// recuperation des recettes
//***************************

function createAllRecipes() {
  //extraire les elements de chaque recette (le nom, le temps et la description)
  recipes.forEach(function (oneOfRecipe) {
    var newRecipe = new Recipe(oneOfRecipe.name, oneOfRecipe.time, oneOfRecipe.description); //extraire les ingredients de recipes + sous tableaux ingredients

    oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
      var newIngredient = new Ingredient(oneOfIngredient.ingredient, oneOfIngredient.quantity, oneOfIngredient.unit); //fonction pour rajouter les ingredients dans la classe principale Recipe

      newRecipe._addIngredient(newIngredient);
    }); //extraire les appareils de recipes    

    var newAppliance = new Appliance(oneOfRecipe.appliance); //fonction pour rajouter les appareils dans la classe principale Recipe

    newRecipe._addAppliance(newAppliance); //extraire les ustensiles de recipes


    oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
      var newUstensil = new Ustensil(oneOfUstensil); //fonction pour rajouter les ustensiles dans la classe principale Recipe

      newRecipe._addUstensil(newUstensil);
    });
    allRecipesOfObject.push(newRecipe);
  }); // console.table(allRecipesOfObject)

  allRecipesFounded = allRecipesOfObject;
} //*****************************************
// recuperation des elements des 3 filtres
//*****************************************


function createFilters() {
  var listingIngredient = [];
  var listingAppliance = [];
  var listingUstensil = [];
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    //tableau ingredient
    oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
      if (listingIngredient.includes(oneOfIngredient.name) === false) {
        listingIngredient.push(oneOfIngredient.name);
        listingIngredient.sort();
      }
    }); //tableau appliance

    oneOfRecipe.appliances.forEach(function (oneOfAppliance) {
      if (listingAppliance.includes(oneOfAppliance.name) === false) {
        listingAppliance.push(oneOfAppliance.name);
        listingAppliance.sort();
      }
    }); //tableau ustensil

    oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
      if (listingUstensil.includes(oneOfUstensil.name) === false) {
        listingUstensil.push(oneOfUstensil.name);
        listingUstensil.sort();
      }
    });
  }); // console.table(listingIngredient)
  // console.table(listingAppliance)
  // console.table(listingUstensil)

  threeFilters = [listingIngredient, listingAppliance, listingUstensil];
  seeFilters();
} //************************************
// affichage des elements des filtres
//************************************


function seeFilters() {
  var configFilter = ["box1-ingredients", "box2-appliance", "box3-ustensils"];
  configFilter.forEach(function (containerName, index) {
    var containerFilter = document.getElementById(containerName);
    threeFilters[index].forEach(function (oneOfElement) {
      var newElement = document.createElement("p");
      newElement.classList.add("element");
      newElement.innerText = oneOfElement;
      containerFilter.appendChild(newElement);
    });
  }); // const IngredientContainer = document.getElementById("box1-ingredients")
  // threeFilters[0].forEach((oneOfIngredient) => {
  //     let newElement = document.createElement("p");
  //     newElement.classList.add("ingredient");
  //     // newElement.setAttribute("data-element", Ingredient);
  //     newElement.innerText = oneOfIngredient;
  //     IngredientContainer.appendChild(newElement);
  // })
  // const ApplianceContainer = document.getElementById("box2-appliance")
  // threeFilters[1].forEach((oneOfAppliance) => {
  //     let newElement = document.createElement("p");
  //     newElement.classList.add("appliance");
  //     // newElement.setAttribute("data-element", Appliance);
  //     newElement.innerText = oneOfAppliance;
  //     ApplianceContainer.appendChild(newElement);
  // })
  // const UstensilContainer = document.getElementById("box3-ustensils");
  // threeFilters[2].forEach((oneOfUstensil) => {
  //     let newElement = document.createElement("p");
  //     newElement.classList.add("ustensil");
  //     // newElement.setAttribute("data-element", Ustensil);
  //     newElement.innerText = oneOfUstensil;
  //     UstensilContainer.appendChild(newElement);
  // })
}

createAllRecipes();
createFilters();