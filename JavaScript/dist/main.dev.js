"use strict";

var allRecipesOfObject = [];
var threeFilters = [];
var totalFilters = 0;
var elementSelectededinFilter = [];
var inputType = false;
var recipesFound = false;
createAllRecipes();
createFilters();
principalSearch();
searchInFilters(); //variable chevron Ingredient

var IngredientContainer = document.getElementById("box1-ingredients");
var box1Extended = document.getElementById("box1-display-content");
var down1 = document.getElementById("chevron-down-1");
var up1 = document.getElementById("chevron-up-1");
down1.addEventListener("click", downIng);
up1.addEventListener("click", upIng); //variable chevron Appareil

var ApplianceContainer = document.getElementById("box2-appliance");
var box2Extended = document.getElementById("box2-display-content");
var down2 = document.getElementById("chevron-down-2");
var up2 = document.getElementById("chevron-up-2");
down2.addEventListener("click", downApp);
up2.addEventListener("click", upApp); //variable chevron Ustensil

var UstensilContainer = document.getElementById("box3-ustensils");
var box3Extended = document.getElementById("box3-display-content");
var down3 = document.getElementById("chevron-down-3");
var up3 = document.getElementById("chevron-up-3");
down3.addEventListener("click", downUst);
up3.addEventListener("click", upUst);