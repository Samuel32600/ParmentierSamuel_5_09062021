"use strict";

//***************************
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
  });
} //*****************************************
// recuperation des elements des 3 filtres
//*****************************************


function createFilters() {
  var listingIngredient = [];
  var listingAppliance = [];
  var listingUstensil = [];
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    if (oneOfRecipe.isSelected === totalFilters) {
      if (oneOfRecipe.hasInput === true && inputType === true || inputType === false) {
        //tableau ingredient
        oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
          if (listingIngredient.includes(oneOfIngredient.name) === false) {
            listingIngredient.push(oneOfIngredient.name);
          }
        });
        listingIngredient.sort(); //tableau appliance

        oneOfRecipe.appliances.forEach(function (oneOfAppliance) {
          if (listingAppliance.includes(oneOfAppliance.name) === false) {
            listingAppliance.push(oneOfAppliance.name);
          }
        });
        listingAppliance.sort(); // //tableau ustensil

        oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
          if (listingUstensil.includes(oneOfUstensil.name) === false) {
            listingUstensil.push(oneOfUstensil.name);
          }
        });
        listingUstensil.sort();
      }
    }
  });
  threeFilters = [listingIngredient, listingAppliance, listingUstensil];
  seeFilters();
  displayError();
} //************************************
// affichage des elements des filtres
//************************************


function seeFilters() {
  var specialFilter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var filtersUsed = threeFilters;

  if (specialFilter !== false) {
    filtersUsed = specialFilter;
  }

  var configFilter = ["box1-ingredients", "box2-appliance", "box3-ustensils"];
  configFilter.forEach(function (containerName, index) {
    var containerFilter = document.getElementById(containerName);
    containerFilter.innerHTML = "";
    filtersUsed[index].forEach(function (oneOfElement) {
      var newElement = document.createElement("p");
      newElement.classList.add("element");
      newElement.innerText = oneOfElement;
      containerFilter.appendChild(newElement); //verification si l'element est deja dans le tableau des elements selectionnés

      if (elementSelectededinFilter.includes(oneOfElement) === false) {
        newElement.addEventListener("click", function () {
          elementSelectededinFilter.push(oneOfElement); // console.log("voici l'ensemble des elements selectionnés", elementSelectededinFilter)

          addOneFilter(oneOfElement, index);
        });
      } else {
        newElement.classList.add("element-hide");
      }
    });
  });
} //************************************
// recherche dans l'input des filtres
//************************************


function searchInFilters() {
  //recherche d'ingredient
  var inputIngredient = document.getElementById("ingredient-search");
  inputIngredient.addEventListener("input", function () {
    var inputType = this.value;
    var temporaryArray = [];

    if (inputType.length > -1) {
      threeFilters[0].forEach(function (oneOfElement) {
        if (oneOfElement.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputType.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          temporaryArray.push(oneOfElement);
        }
      });
    } else {
      seeFilters();
    }

    seeFilters([temporaryArray, threeFilters[1], threeFilters[2]]);
  }); //recherche d'appareil

  var inputAppliance = document.getElementById("appliance-search");
  inputAppliance.addEventListener("input", function () {
    var inputType = this.value;
    var temporaryArray = [];

    if (inputType.length > -1) {
      threeFilters[1].forEach(function (oneOfElement) {
        if (oneOfElement.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputType.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          temporaryArray.push(oneOfElement);
        }
      });
    } else {
      seeFilters();
    }

    seeFilters([threeFilters[0], temporaryArray, threeFilters[2]]);
  }); //recherche d'ustensil

  var inputUstensil = document.getElementById("ustensil-search");
  inputUstensil.addEventListener("input", function () {
    var inputType = this.value;
    var temporaryArray = [];

    if (inputType.length > -1) {
      threeFilters[2].forEach(function (oneOfElement) {
        if (oneOfElement.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputType.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          temporaryArray.push(oneOfElement);
        }
      });
    } else {
      seeFilters();
    }

    seeFilters([threeFilters[0], threeFilters[1], temporaryArray]);
  });
} //******************************************************
// action suite a la selection d'un element des filtres
//******************************************************


function addOneFilter(elementSelected, categoryOfElement) {
  totalFilters += 1; // console.log(categoryOfElement)

  var category = ["ingredients", "appliances", "ustensils"]; // console.log("on a cliqué sur", elementSelected, "et c'est un element de type", category[categoryOfElement])
  //boucle sur l'ensemble des recettes disponibles

  allRecipesOfObject.forEach(function (oneOfRecipe) {
    //recette apres selection d'un ingredient
    if (category[categoryOfElement] === "ingredients") {
      oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
        if (elementSelected === oneOfIngredient.name) {
          oneOfRecipe.isSelected += 1;
        }
      });
    } //recette apres selection d'un appareil


    if (category[categoryOfElement] === "appliances") {
      oneOfRecipe.appliances.forEach(function (oneOfAppliance) {
        if (elementSelected === oneOfAppliance.name) {
          oneOfRecipe.isSelected += 1;
        }
      });
    } //recette apres selection d'un ustensil


    if (category[categoryOfElement] === "ustensils") {
      oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
        if (elementSelected === oneOfUstensil.name) {
          oneOfRecipe.isSelected += 1;
        }
      });
    }
  });
  createTag(elementSelected, categoryOfElement);
  getValidRecipeV2();
} //*************************************************
// creation d'un tag + ecoute pour refermer le tag
//*************************************************


function createTag(elementSelected, color) {
  var colorTag = ["box1", "box2", "box3"];
  var selectContainer = document.getElementById("box-select"); //creation de la div

  var newDivSelect = document.createElement("div");
  newDivSelect.setAttribute("id", "box-tag-" + elementSelected);
  newDivSelect.classList.add("box-newTag", colorTag[color]);
  selectContainer.appendChild(newDivSelect); //creation du texte

  var newElementSelect = document.createElement("p");
  var textTag = elementSelected;
  newElementSelect.classList.add("box__text");
  newElementSelect.innerText = textTag;
  newDivSelect.appendChild(newElementSelect); //creation de l'icone

  var newIconSelect = document.createElement("i");
  newIconSelect.classList.add("far", "fa-times-circle");
  newDivSelect.appendChild(newIconSelect); //suppression du tag suite a la selection de la croix

  var tagRemove = document.getElementById("box-tag-" + elementSelected);
  tagRemove.addEventListener("click", function () {
    // console.log("je veux fermer la div" + elementSelected)
    tagRemove.remove();
    elementSelectededinFilter.forEach(function (element, index) {
      if (element === elementSelected) {
        elementSelectededinFilter.splice(index, 1);
      }
    });
    removeOneFilter(elementSelected, color);
  });
} //********************************************************
// action suite a la déselection d'un element des filtres
//********************************************************


function removeOneFilter(elementSelected, categoryOfElement) {
  totalFilters -= 1;
  var category = ["ingredients", "appliances", "ustensils"]; // console.log("on a déselctionné", elementSelected, "et c'est un element de type", category[categoryOfElement])

  allRecipesOfObject.forEach(function (oneOfRecipe) {
    //recette apres deselection d'un ingredient
    if (category[categoryOfElement] === "ingredients") {
      oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
        if (elementSelected === oneOfIngredient.name) {
          oneOfRecipe.isSelected -= 1;
        }
      });
    } //recette apres deselection d'un appareil


    if (category[categoryOfElement] === "appliances") {
      oneOfRecipe.appliances.forEach(function (oneOfAppliance) {
        if (elementSelected === oneOfAppliance.name) {
          oneOfRecipe.isSelected -= 1;
        }
      });
    } //recette apres deselection d'un ustensil


    if (category[categoryOfElement] === "ustensils") {
      oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
        if (elementSelected === oneOfUstensil.name) {
          oneOfRecipe.isSelected -= 1;
        }
      });
    }
  });
  getValidRecipeV2();
} //*****************************************
// affichage des recettes valide version 2
//*****************************************


function getValidRecipeV2() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  recipesFound = false;
  var operationCount = 0;

  if (input !== false) {
    allRecipesOfObject.forEach(function (oneOfRecipe) {
      var inputFound = false;
      operationCount++; // nom des recettes

      if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        inputFound = true;
      } // description des recettes


      if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        inputFound = true;
      } // ingredients des recettes


      oneOfRecipe.ingredients.forEach(function (ingr) {
        if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          inputFound = true;
        }
      });
      oneOfRecipe.hasInput = inputFound;
    });
  }

  allRecipesOfObject.forEach(function (oneOfRecipe) {
    operationCount++;

    if (oneOfRecipe.isSelected !== totalFilters) {
      oneOfRecipe.hasInput = false;
    }
  });
  console.log("Voici le nombre d'opérations : ", operationCount);
  card();
  createFilters();
} //******************************
// creation d'une carte recette
//******************************


function card() {
  var mainRecipes = document.getElementById("allRecipes");
  mainRecipes.innerText = "";
  allRecipesOfObject.forEach(function (recipe) {
    if (recipe.isSelected === totalFilters) {
      if (recipe.hasInput === true && inputType === true || inputType === false) {
        recipesFound = true;
        var CardRecipe = "";
        CardRecipe += "\n                <figure class=\"result-recipe\">\n                    <img class=\"recette\">\n                    <figcaption>\n                        <aside class=\"title\">\n                            <p class=\"name\">".concat(recipe.name, "</p>\n                            <div class=\"duration\">\n                                <i class=\"far fa-clock\"></i>\n                                <p class=\"time\">").concat(recipe.time, " min</p>\n                            </div>\n                        </aside>\n                        <div class=\"text\">\n                            <ul class=\"ingredients\">               \n                                ").concat(recipe.ingredients.map(function (elementOfIngredient) {
          return "\n                                <li>\n                                    <span>".concat(elementOfIngredient.name, " : </span>").concat(elementOfIngredient.quantity, " ").concat(elementOfIngredient.unit, "\n                                </li>");
        }).join(""), "\n                            </ul>\n                                <p class=\"description\">").concat(recipe.description, "</p>\n                        </div>\n                    </figcaption>\n                </figure>");
        mainRecipes.insertAdjacentHTML('beforeend', CardRecipe);
      }
    }
  });
} //************************************
// recherche dans la barre principale
//************************************


function principalSearch() {
  var mainSearch = document.getElementById("main-search");
  mainSearch.addEventListener("input", function () {
    if (mainSearch.value.length > 2) {
      inputType = true;
      getValidRecipeV2(mainSearch.value);
    } else {
      document.querySelectorAll('.result-recipe').forEach(function (showCards) {
        return showCards.remove();
      });
      inputType = false;
      resetInput();

      if (totalFilters > 0) {
        getValidRecipeV2();
      } else {
        createFilters();
      }
    }
  });
} //**********************************************
// action suite au reset de la barre principale
//**********************************************


function resetInput() {
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe.hasInput = false;
  });
} //******************************************
// message si aucune recette n'est trouvée
//******************************************


function displayError() {
  var errorMessage = document.getElementById('no-recipe');

  if (totalFilters > 0 || inputType === true) {
    if (recipesFound === false) {
      errorMessage.classList.remove("hidden");
    } else {
      errorMessage.classList.add("hidden");
    }
  } else {
    errorMessage.classList.add("hidden");
  }
} //*********************************
//action chevron filtre Ingredient
//*********************************


function downIng() {
  IngredientContainer.classList.remove("hidden");
  box1Extended.classList.add("box-extend");
  up1.classList.remove("hidden");
  down1.classList.add("hidden");
  document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';
  upApp();
  upUst();
}

function upIng() {
  IngredientContainer.classList.add("hidden");
  box1Extended.classList.remove("box-extend");
  up1.classList.add("hidden");
  down1.classList.remove("hidden");
  document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
} //********************************
//action chevron filtre appareil
//********************************


function downApp() {
  ApplianceContainer.classList.remove("hidden");
  box2Extended.classList.add("box-extend");
  up2.classList.remove("hidden");
  down2.classList.add("hidden");
  document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil';
  upIng();
  upUst();
}

function upApp() {
  ApplianceContainer.classList.add("hidden");
  box2Extended.classList.remove("box-extend");
  up2.classList.add("hidden");
  down2.classList.remove("hidden");
  document.getElementsByName('APPAREIL')[0].placeholder = 'Appareil';
} //*******************************
//action chevron filtre ustensil
//*******************************


function downUst() {
  UstensilContainer.classList.remove("hidden");
  box3Extended.classList.add("box-extend");
  up3.classList.remove("hidden");
  down3.classList.add("hidden");
  document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensile';
  upIng();
  upApp();
}

function upUst() {
  UstensilContainer.classList.add("hidden");
  box3Extended.classList.remove("box-extend");
  up3.classList.add("hidden");
  down3.classList.remove("hidden");
  document.getElementsByName('USTENSIL')[0].placeholder = 'Ustensiles';
}