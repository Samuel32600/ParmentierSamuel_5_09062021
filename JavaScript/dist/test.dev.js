"use strict";

var _recipes = require("./recipes.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//tableau avec l'ensemble des données
var allRecipesOfObject = [];
var allIngredients = [];
var allAppliances = [];
var allUstensils = [];
var recipesfound = []; // tableau avec données triées et doublon supprimé

var listingIngredient = [];
var listingAppliance = [];
var listingUstensil = []; //nouveau tableau apres les selections des filtres

var ingredientFilter = [];
var applianceFilter = [];
var ustensilFilter = [];
var mainRecipes = document.getElementById("allRecipes");
var mainSearch = document.getElementById("main-search");
var totalFilters = 0;
var IngredientContainer = document.getElementById("box1-ingredients");
var box1Extended = document.getElementById("box1-display-content");
var down1 = document.getElementById("chevron-down-1");
var up1 = document.getElementById("chevron-up-1");
var selectContainerIngredient = document.getElementById("box-select");
var inputIngredient = document.getElementById("ingredient-search");
down1.addEventListener("click", downIngredient);
up1.addEventListener("click", upIngredient);
var ApplianceContainer = document.getElementById("box2-appliance");
var box2Extended = document.getElementById("box2-display-content");
var down2 = document.getElementById("chevron-down-2");
var up2 = document.getElementById("chevron-up-2");
var selectContainerAppliance = document.getElementById("box-select");
var inputAppliance = document.getElementById("appliance-search");
down2.addEventListener("click", downAppliance);
up2.addEventListener("click", upAppliance);
var UstensilContainer = document.getElementById("box3-ustensils");
var box3Extended = document.getElementById("box3-display-content");
var down3 = document.getElementById("chevron-down-3");
var up3 = document.getElementById("chevron-up-3");
var selectContainerUstensils = document.getElementById("box-select");
var inputUstensil = document.getElementById("ustensil-search");
down3.addEventListener("click", downUstensil);
up3.addEventListener("click", upUstensil);

var Recipe =
/*#__PURE__*/
function () {
  function Recipe(name, time, description) {
    _classCallCheck(this, Recipe);

    this.name = name;
    this.time = time;
    this.description = description;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.hasFilters = 0;
  } //************************************
  //       ajout des ingredients     
  //************************************


  _createClass(Recipe, [{
    key: "_addIngredient",
    value: function _addIngredient(IngredientAdded) {
      this.ingredients.push(IngredientAdded);
    } //incrementation du nombre de filtre

  }, {
    key: "_addIngredientFilter",
    value: function _addIngredientFilter(ingredientName) {
      var _this = this;

      this.ingredients.forEach(function (oneOfIngredient) {
        if (oneOfIngredient.name === ingredientName) {
          oneOfIngredient.isChecked = true;
          _this.hasFilters += 1;
        }
      });
    }
  }, {
    key: "_removeIngredientFilter",
    value: function _removeIngredientFilter(ingredientName) {
      var _this2 = this;

      this.ingredients.forEach(function (oneOfIngredient) {
        if (oneOfIngredient.name === ingredientName) {
          oneOfIngredient.isChecked = false;
          _this2.hasFilters -= 1;
        }
      });
    } //************************************
    //        ajout des appareils
    //************************************

  }, {
    key: "_addAppliance",
    value: function _addAppliance(ApplianceAdded) {
      this.appliances.push(ApplianceAdded);
    } //incrementation du nombre de filtre

  }, {
    key: "_addApplianceFilter",
    value: function _addApplianceFilter(applianceName) {
      var _this3 = this;

      this.appliances.forEach(function (oneOfAppliance) {
        if (oneOfAppliance.name === applianceName) {
          oneOfAppliance.isChecked = true;
          _this3.hasFilters += 1;
        }
      });
    }
  }, {
    key: "_removeApplianceFilter",
    value: function _removeApplianceFilter(applianceName) {
      var _this4 = this;

      this.appliances.forEach(function (oneOfAppliance) {
        if (oneOfAppliance.name === applianceName) {
          oneOfAppliance.isChecked = false;
          _this4.hasFilters -= 1;
        }
      });
    } //************************************
    //         ajout des ustensils
    //************************************

  }, {
    key: "_addUstensil",
    value: function _addUstensil(UstensilAdded) {
      this.ustensils.push(UstensilAdded);
    } //incrementation du nombre de filtre

  }, {
    key: "_addUstensilFilter",
    value: function _addUstensilFilter(ustensilName) {
      var _this5 = this;

      this.ustensils.forEach(function (oneOfUstensil) {
        if (oneOfUstensil.name === ustensilName) {
          oneOfUstensil.isChecked = true;
          _this5.hasFilters += 1;
        }
      });
    }
  }, {
    key: "_removeUstensilFilter",
    value: function _removeUstensilFilter(ustensilName) {
      var _this6 = this;

      this.ustensils.forEach(function (oneOfUstensil) {
        if (oneOfUstensil.name === ustensilName) {
          oneOfUstensil.isChecked = false;
          _this6.hasFilters -= 1;
        }
      });
    }
  }]);

  return Recipe;
}(); //************************************
//  definition des classes des tags
//************************************


var Ingredient =
/*#__PURE__*/
function () {
  function Ingredient(name, quantity, unit) {
    _classCallCheck(this, Ingredient);

    this.name = name;
    this.quantity = this._validFormatQuantity(quantity);
    this.unit = this._validFormatUnit(unit);
    this.isChecked = false;

    this._validFormatUnit();
  } //mettre la valeur de quantity en forme


  _createClass(Ingredient, [{
    key: "_validFormatQuantity",
    value: function _validFormatQuantity(number) {
      if (typeof number === "undefined") {
        return number = "";
      } else {
        return number;
      }
    } //adapté la valeur de l'unité

  }, {
    key: "_validFormatUnit",
    value: function _validFormatUnit(number) {
      var mesure = this._validFormatQuantity(number);

      if (mesure.length > 2) {
        return mesure.substring(9, 0);
      } else {
        return mesure;
      }
    }
  }]);

  return Ingredient;
}();

var Appliance = function Appliance(name) {
  _classCallCheck(this, Appliance);

  this.name = name;
  this.isChecked = false;
};

var Ustensil = function Ustensil(name) {
  _classCallCheck(this, Ustensil);

  this.name = name;
  this.isChecked = false;
}; //extraire les elements de chaque recette (le nom, le temps et la description)


_recipes.recipes.forEach(function (oneOfRecipe) {
  var newRecipe = new Recipe(oneOfRecipe.name, oneOfRecipe.time, oneOfRecipe.description); //-----extraire les ingredients de recipes + sous tableaux ingredients-----

  oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
    var newIngredient = new Ingredient(oneOfIngredient.ingredient, oneOfIngredient.quantity, oneOfIngredient.unit);
    allIngredients.push(newIngredient.name); //fonction pour rajouter les ingredients dans la classe principale Recipe

    newRecipe._addIngredient(newIngredient);
  }); //-----extraire les appareils de recipes-----    

  var newAppliance = new Appliance(oneOfRecipe.appliance);
  allAppliances.push(newAppliance.name); //fonction pour rajouter les appareils dans la classe principale Recipe

  newRecipe._addAppliance(newAppliance); //-----extraire les ustensiles de recipes-----


  oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
    var newUstensil = new Ustensil(oneOfUstensil);
    allUstensils.push(newUstensil.name); //fonction pour rajouter les ustensiles dans la classe principale Recipe

    newRecipe._addUstensil(newUstensil);
  });
  allRecipesOfObject.push(newRecipe);
}); //************************************
//            Ingredients
//************************************
//suppression doublon + trier alphabetiquement


listingIngredient = _toConsumableArray(new Set(allIngredients));
listingIngredient.sort(); // fonction au clic sur le chevron bas

function downIngredient() {
  IngredientContainer.classList.remove("hidden");
  box1Extended.classList.add("box-extend");
  up1.classList.remove("hidden");
  down1.classList.add("hidden");
  document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient'; //creation de chaque paragraphe venant du listing

  listingIngredient.forEach(function (Ingredient) {
    var newElement = document.createElement("p");
    newElement.classList.add("ingredient");
    newElement.setAttribute("data-element", Ingredient);
    newElement.innerText = Ingredient;
    IngredientContainer.appendChild(newElement); //ecoute pour la creation du tag

    newElement.addEventListener("click", tagIngredient); //ecoute de l'input de recherche

    inputIngredient.addEventListener("input", function () {
      if (!Ingredient.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputIngredient.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        newElement.remove();
      } else {
        IngredientContainer.appendChild(newElement);
      }
    });
  });
} //creation du tag Ingredient + fermeture
//fonction tag


function tagIngredient() {
  this.removeEventListener("click", tagIngredient); //creation de la div

  var newDivSelect = document.createElement("div");
  newDivSelect.setAttribute("id", "box-tag-ingredient");
  newDivSelect.classList.add("box1-select-ingredients", "box1");
  selectContainerIngredient.appendChild(newDivSelect); //creation du texte

  var newElementSelect = document.createElement("p");
  var ingredientName = this.innerText;
  newElementSelect.classList.add("box__text");
  newElementSelect.innerText = ingredientName;
  newDivSelect.appendChild(newElementSelect); //texte barré dans le filtre

  this.classList.add("ingredient-hide"); //creation de l'icone

  var newIconSelect = document.createElement("i");
  newIconSelect.classList.add("far", "fa-times-circle");
  newDivSelect.appendChild(newIconSelect); //lancement de la fonction pour selection une recette en fonction de l'ingredient cliqué

  addIngredient(ingredientName); //fermeture du tag par la croix  

  newIconSelect.addEventListener("click", function () {
    newDivSelect.remove();
    var newElement = document.querySelector("[data-element=\"".concat(ingredientName, "\"]"));
    newElement.addEventListener("click", tagIngredient);
    newElement.classList.remove("ingredient-hide"); // lancement de la fonction pour supprimer la selection de l'ingredient cliqué

    removeIngredient(ingredientName);
  });
} // fonction au clic sur le chevron haut


function upIngredient() {
  IngredientContainer.classList.add("hidden");
  box1Extended.classList.remove("box-extend");
  up1.classList.add("hidden");
  down1.classList.remove("hidden");
  document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
  listingIngredient = [];
} // selection d'un Ingredient


function addIngredient(ingredientName) {
  totalFilters += 1;
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe._addIngredientFilter(ingredientName);
  });
  getValidRecipe();
} // déselection d'un Ingredient


function removeIngredient(ingredientName) {
  totalFilters -= 1;
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe._removeIngredientFilter(ingredientName);
  });
  getValidRecipe();
} // mise a jour du listing Ingredient


function updateFilterIngredient() {
  listingIngredient = [];
  document.querySelectorAll("#box1-ingredients p").forEach(function (e) {
    return e.remove();
  });
  ingredientFilter.forEach(function (ingredientFiltered) {
    var newElementFiltered = document.createElement("p");
    newElementFiltered.classList.add("ingredient");
    newElementFiltered.setAttribute("data-element", ingredientFiltered);
    newElementFiltered.innerText = ingredientFiltered;
    IngredientContainer.appendChild(newElementFiltered);
    newElementFiltered.addEventListener("click", tagIngredient); //ecoute de l'input de recherche

    inputIngredient.addEventListener("input", function () {
      if (!ingredientFiltered.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputIngredient.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        newElementFiltered.remove();
      } else {
        IngredientContainer.appendChild(newElementFiltered);
      }
    });
  });
} //************************************
//              Appareils
//************************************
//suppression doublon + trier alphabetiquement


listingAppliance = _toConsumableArray(new Set(allAppliances));
listingAppliance.sort(); // fonction au clic sur le chevron bas

function downAppliance() {
  ApplianceContainer.classList.remove("hidden");
  box2Extended.classList.add("box-extend");
  up2.classList.remove("hidden");
  down2.classList.add("hidden");
  document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil'; //creation de chaque paragraphe venant du listing

  listingAppliance.forEach(function (Appliance) {
    var newElement = document.createElement("p");
    newElement.classList.add("appliance");
    newElement.setAttribute("data-element", Appliance);
    newElement.innerText = Appliance;
    ApplianceContainer.appendChild(newElement); //ecoute pour la creation du tag

    newElement.addEventListener("click", tagAppliance); //ecoute de l'input

    inputAppliance.addEventListener("input", function () {
      if (!Appliance.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputAppliance.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        newElement.remove();
      } else {
        ApplianceContainer.appendChild(newElement);
      }
    });
  });
} //creation du tag Appareil + fermeture


function tagAppliance() {
  this.removeEventListener("click", tagAppliance); //creation de la div

  var newDivSelect = document.createElement("div");
  newDivSelect.setAttribute("id", "box-tag-appliance");
  newDivSelect.classList.add("box2-select-appliances", "box2");
  selectContainerAppliance.appendChild(newDivSelect); //creation du texte

  var newElementSelect = document.createElement("p");
  var applianceName = this.innerText;
  newElementSelect.classList.add("box__text");
  newElementSelect.innerText = applianceName;
  newDivSelect.appendChild(newElementSelect); //texte barré dans le filtre

  this.classList.add("appliance-hide"); //creation de l'icone

  var newIconSelect = document.createElement("i");
  newIconSelect.classList.add("far", "fa-times-circle");
  newDivSelect.appendChild(newIconSelect); //lancement de la fonction pour selection une recette en fonction de l'ustensil cliqué

  addAppliance(applianceName); //fermeture du tag par la croix  

  newIconSelect.addEventListener("click", function () {
    newDivSelect.remove();
    var newElement = document.querySelector("[data-element=\"".concat(applianceName, "\"]"));
    newElement.addEventListener("click", tagAppliance);
    newElement.classList.remove("appliance-hide"); // lancement de la fonction pour supprimer la selection de l'appareil cliqué

    removeAppliance(applianceName);
  });
} // fonction au clic sur le chevron haut


function upAppliance() {
  ApplianceContainer.classList.add("hidden");
  box2Extended.classList.remove("box-extend");
  up2.classList.add("hidden");
  down2.classList.remove("hidden");
  document.getElementsByName('APPAREIL')[0].placeholder = 'Appareil';
  listingAppliance = [];
} // selection d'un Appareil


function addAppliance(applianceName) {
  totalFilters += 1;
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe._addApplianceFilter(applianceName);
  });
  getValidRecipe();
} // déselection d'un Appareil


function removeAppliance(applianceName) {
  totalFilters -= 1;
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe._removeApplianceFilter(applianceName);
  });
  getValidRecipe();
} // mise a jour du listing Appliance


function updateFilterAppliance() {
  listingAppliance = [];
  document.querySelectorAll("#box2-appliance p").forEach(function (e) {
    return e.remove();
  });
  applianceFilter.forEach(function (applianceFiltered) {
    var newElementFiltered = document.createElement("p");
    newElementFiltered.classList.add("appliance");
    newElementFiltered.setAttribute("data-element", applianceFiltered);
    newElementFiltered.innerText = applianceFiltered;
    ApplianceContainer.appendChild(newElementFiltered);
    newElementFiltered.addEventListener("click", tagAppliance); //ecoute de l'input

    inputAppliance.addEventListener("input", function () {
      if (!applianceFiltered.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputAppliance.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        newElementFiltered.remove();
      } else {
        ApplianceContainer.appendChild(newElementFiltered);
      }
    });
  });
} //************************************
//             Ustensils
//************************************
//suppression doublon + trier alphabetiquement


listingUstensil = _toConsumableArray(new Set(allUstensils));
listingUstensil.sort(); // fonction au clic sur le chevron bas

function downUstensil() {
  UstensilContainer.classList.remove("hidden");
  box3Extended.classList.add("box-extend");
  up3.classList.remove("hidden");
  down3.classList.add("hidden");
  document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensile'; //creation de chaque paragraphe venant du listing    

  listingUstensil.forEach(function (Ustensil) {
    var newElement = document.createElement("p");
    newElement.classList.add("ustensil");
    newElement.setAttribute("data-element", Ustensil);
    newElement.innerText = Ustensil;
    UstensilContainer.appendChild(newElement); // ecoute pour la creation du tag

    newElement.addEventListener("click", tagUstensil); //ecoute de l'input

    inputUstensil.addEventListener("input", function () {
      if (!Ustensil.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputUstensil.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        newElement.remove();
      } else {
        UstensilContainer.appendChild(newElement);
      }
    });
  });
} //creation du tag Ustensil + fermeture


function tagUstensil() {
  this.removeEventListener("click", tagUstensil); //creation de la div

  var newDivSelect = document.createElement("div");
  newDivSelect.setAttribute("id", "box-tag-ustensil");
  newDivSelect.classList.add("box3-select-ustensils", "box3");
  selectContainerUstensils.appendChild(newDivSelect); //creation du texte

  var newElementSelect = document.createElement("p");
  var ustensilName = this.innerText;
  newElementSelect.classList.add("box__text");
  newElementSelect.innerText = ustensilName;
  newDivSelect.appendChild(newElementSelect); //texte barré

  this.classList.add("ustensil-hide"); //creation de l'icone

  var newIconSelect = document.createElement("i");
  newIconSelect.classList.add("far", "fa-times-circle");
  newDivSelect.appendChild(newIconSelect); //lancement de la fonction pour selection une recette en fonction de l'ustensil cliqué

  addUstensil(ustensilName); //fermeture du tag par la croix  

  newIconSelect.addEventListener("click", function () {
    newDivSelect.remove();
    var newElement = document.querySelector("[data-element=\"".concat(ustensilName, "\"]"));
    newElement.addEventListener("click", tagUstensil);
    newElement.classList.remove("ustensil-hide"); // lancement de la fonction pour supprimer la selection de l'ustensil cliqué

    removeUstensil(ustensilName);
  });
} // fonction au clic sur le chevron haut


function upUstensil() {
  UstensilContainer.classList.add("hidden");
  box3Extended.classList.remove("box-extend");
  up3.classList.add("hidden");
  down3.classList.remove("hidden");
  document.getElementsByName('USTENSIL')[0].placeholder = 'Ustensiles';
  listingUstensil = [];
} // selection d'un Ustensil


function addUstensil(ustensilName) {
  totalFilters += 1;
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe._addUstensilFilter(ustensilName);
  });
  getValidRecipe();
} // déselection d'un Ustensil


function removeUstensil(ustensilName) {
  totalFilters -= 1;
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    oneOfRecipe._removeUstensilFilter(ustensilName);
  });
  getValidRecipe();
} // mise a jour du listing Ustensil
// newElementFiltered.addEventListener("click", hide)
//         function hide(){
//             if( newElementFiltered.isChecked = true){
//                 ustensilFiltered.classList.add("ustensil-hide")}  
//             else{
//                 ustensilFiltered.classList.remove("ustensil-hide")
//             }
//         }


function updateFilterUstensil() {
  listingUstensil = [];
  document.querySelectorAll("#box3-ustensils p").forEach(function (e) {
    return e.remove();
  });
  ustensilFilter.forEach(function (ustensilFiltered) {
    var newElementFiltered = document.createElement("p");
    newElementFiltered.classList.add("ustensil");
    newElementFiltered.setAttribute("data-element", ustensilFiltered);
    newElementFiltered.innerText = ustensilFiltered;
    UstensilContainer.appendChild(newElementFiltered);
    newElementFiltered.addEventListener("click", tagUstensil); //ecoute de l'input

    inputUstensil.addEventListener("input", function () {
      if (!ustensilFiltered.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputUstensil.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        newElementFiltered.remove();
      } else {
        UstensilContainer.appendChild(newElementFiltered);
      }
    });
  });
} //************************************
// recherche dans la barre principale
//************************************


mainSearch.addEventListener("input", principalSearch);

function principalSearch() {
  document.querySelectorAll('.result-recipe').forEach(function (showCards) {
    return showCards.remove();
  });
  recipesfound = [];
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    if (oneOfRecipe.hasFilters === totalFilters) {
      if (mainSearch.value.length > 2) {
        if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          recipesfound.push(oneOfRecipe);
          allRecipesOfObject = recipesfound;
        } else if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          recipesfound.push(oneOfRecipe);
          allRecipesOfObject = recipesfound;
        } else {
          oneOfRecipe.ingredients.forEach(function (ingr) {
            if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
              recipesfound.push(oneOfRecipe);
              allRecipesOfObject = recipesfound;
            }
          });
        }
      }
    }
  });
  getValidRecipe();
} //*************************************************************
// affichage des recettes en fonction des filtres selectionnés
//*************************************************************


function getValidRecipe() {
  document.querySelectorAll('.result-recipe').forEach(function (showCards) {
    return showCards.remove();
  });
  ingredientFilter = [];
  applianceFilter = [];
  ustensilFilter = [];
  allRecipesOfObject.forEach(function (oneOfRecipe) {
    if (oneOfRecipe.hasFilters === totalFilters) {
      card(oneOfRecipe); //mise a jour des ingredients

      oneOfRecipe.ingredients.forEach(function (ingr) {
        if (ingredientFilter.includes(ingr.name) === false) {
          ingredientFilter.push(ingr.name);
          ingredientFilter.sort();
        }
      }); //mise a jour des appareils

      oneOfRecipe.appliances.forEach(function (appl) {
        if (applianceFilter.includes(appl.name) === false) {
          applianceFilter.push(appl.name);
          applianceFilter.sort();
        }
      }); //mise a jour des ustensiles

      oneOfRecipe.ustensils.forEach(function (ust) {
        if (ustensilFilter.includes(ust.name) === false) {
          ustensilFilter.push(ust.name);
          ustensilFilter.sort();
        }
      });
    }
  }); // nouveau tableau Ingrédient mis à jour

  updateFilterIngredient(); // nouveau tableau Appareil mis à jour

  updateFilterAppliance(); // nouveau tableau Ustensils mis à jour 

  updateFilterUstensil();
} //******************************
// création d'une carte recette
//******************************


function card(recipe) {
  var CardRecipe = "";
  CardRecipe += "<figure class=\"result-recipe\">\n    <img class=\"recette\">\n    <figcaption>\n        <aside class=\"title\">\n            <p class=\"name\">".concat(recipe.name, "</p>\n            <div class=\"duration\">\n                <i class=\"far fa-clock\"></i>\n                <p class=\"time\">").concat(recipe.time, " min</p>\n            </div>\n        </aside>\n        <div class=\"text\">\n            <ul class=\"ingredients\">               \n                ").concat(recipe.ingredients.map(function (elementOfIngredient) {
    return "\n                <li>\n                    <span>".concat(elementOfIngredient.name, " : </span>").concat(elementOfIngredient.quantity, " ").concat(elementOfIngredient.unit, "\n                </li>");
  }).join(""), "\n            </ul>\n            <p class=\"description\">").concat(recipe.description, "</p>\n        </div>\n    </figcaption>\n</figure>");
  mainRecipes.insertAdjacentHTML('beforeend', CardRecipe);
}