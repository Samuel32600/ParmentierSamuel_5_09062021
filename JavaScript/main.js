let allRecipesOfObject = [];
let threeFilters = []
let totalFilters = 0;
let elementSelectededinFilter = []
let inputType = false
let recipesFound = false

createAllRecipes()
createFilters()
principalSearch()
searchInFilters()

//variable chevron Ingredient
const IngredientContainer = document.getElementById("box1-ingredients");
const box1Extended = document.getElementById("box1-display-content");
const down1 = document.getElementById("chevron-down-1");
const up1 = document.getElementById("chevron-up-1");
down1.addEventListener("click", downIng)
up1.addEventListener("click",upIng)

//variable chevron Appareil
const ApplianceContainer = document.getElementById("box2-appliance");
const box2Extended = document.getElementById("box2-display-content");
const down2 = document.getElementById("chevron-down-2");
const up2 = document.getElementById("chevron-up-2");
down2.addEventListener("click", downApp)
up2.addEventListener("click", upApp) 

//variable chevron Ustensil
const UstensilContainer = document.getElementById("box3-ustensils");
const box3Extended = document.getElementById("box3-display-content");
const down3 = document.getElementById("chevron-down-3");
const up3 = document.getElementById("chevron-up-3");
down3.addEventListener("click", downUst)
up3.addEventListener("click", upUst)