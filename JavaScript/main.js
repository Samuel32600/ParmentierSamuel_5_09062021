import { recipes } from './recipes.js';

//---------------------Ingredients--------------------
//extraire les ingredients du tableau recette
let listingIngredient = []
getAllIngredientFromRecipes()

function getAllIngredientFromRecipes() {
    let allIngredients = []
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(oneIngredient => {
            let newIngredientToAdd = oneIngredient.ingredient
            allIngredients.push(newIngredientToAdd)
        })
        // console.log("l'ensemble des tableaux ingredients")
        // console.log(allIngredients)
    })
    allIngredients.forEach(ingredient => {
        if (!listingIngredient.includes(ingredient)) {
            listingIngredient.push(ingredient)
            listingIngredient.sort()
        }
    })
    // console.log("l'ensemble des ingredients triés")
    // console.table(listingIngredient)
}

//-----affichage de la liste complete des ingredients
const IngredientContainer = document.getElementById("box1-ingredients")
const box1Extended = document.getElementById("box1-display-content")
const down1 = document.getElementById("chevron-down-1")
const up1 = document.getElementById("chevron-up-1")
const selectContainerIngredient = document.getElementById("box-select")

down1.addEventListener("click", downIngredient)
up1.addEventListener("click", upIngredient)

// fonction au clic sur le chevron bas
function downIngredient() {
    IngredientContainer.classList.remove("hidden")
    box1Extended.classList.add("box-extend")
    up1.classList.remove("hidden")
    down1.classList.add("hidden")
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';

    //creation de chaque paragraphe venant du listing
    listingIngredient.forEach(Ingredient => {
        let newElement = document.createElement("p")
        newElement.classList.add("ingredient")
        newElement.setAttribute("data-element", Ingredient)
        newElement.innerText = Ingredient
        IngredientContainer.appendChild(newElement)
        //ecoute pour la creation du tag
        newElement.addEventListener("click", tagIngredient)
    })
}

// fonction au clic sur le chevron haut
function upIngredient() {
    IngredientContainer.classList.add("hidden")
    box1Extended.classList.remove("box-extend")
    up1.classList.add("hidden")
    down1.classList.remove("hidden")
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
    listingIngredient = []
}

//creation du tag Ustensil + fermeture
//fonction tag
function tagIngredient() {
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ingredient")
    newDivSelect.classList.add("box1-select-ingredients", "box1");
    selectContainerIngredient.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = this.innerText;
    newDivSelect.appendChild(newElementSelect);
    //texte barré
    this.classList.add("ingredient-hide")
    //creation de l'icone
    let newIconSelect = document.createElement("i")
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect)
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove()
    })
}


//---------------------Appareils--------------------
//extraire les appareils du tableau recette
let listingAppliance = []
getAllApplianceFromRecipes()

function getAllApplianceFromRecipes() {
    let allAppliance = []
    recipes.forEach(recipe => {
        let newAppliancetoAdd = recipe.appliance
        allAppliance.push(newAppliancetoAdd)
    })
    // console.log("l'ensemble des tableaux appareils")
    // console.log(allAppliance)
    allAppliance.forEach(appliance => {
        if (!listingAppliance.includes(appliance)) {
            listingAppliance.push(appliance)
            listingAppliance.sort()
        }
    })
    // console.log("l'ensemble des appareils triés")
    // console.log(listingAppliance)
}

//-----affichage de la liste complete des appareils
const ApplianceContainer = document.getElementById("box2-appliance")
const box2Extended = document.getElementById("box2-display-content")
const down2 = document.getElementById("chevron-down-2")
const up2 = document.getElementById("chevron-up-2")
const selectContainerAppliance = document.getElementById("box-select")

down2.addEventListener("click", downAppliance)
up2.addEventListener("click", upAppliance)

// fonction au clic sur le chevron bas
function downAppliance() {
    ApplianceContainer.classList.remove("hidden")
    box2Extended.classList.add("box-extend")
    up2.classList.remove("hidden")
    down2.classList.add("hidden")
    document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil';

    //creation de chaque paragraphe venant du listing
    listingAppliance.forEach(Appliance => {
        let newElement = document.createElement("p");
        newElement.classList.add("appliance");
        newElement.setAttribute("data-element", Appliance);
        newElement.innerText = Appliance;
        ApplianceContainer.appendChild(newElement);
        //ecoute pour la creation du tag
        newElement.addEventListener("click", tagAppliance);
    })
}

// fonction au clic sur le chevron haut
function upAppliance() {
    ApplianceContainer.classList.add("hidden");
    box2Extended.classList.remove("box-extend");
    up2.classList.add("hidden");
    down2.classList.remove("hidden");
    document.getElementsByName('APPAREIL')[0].placeholder = 'Appareil';
    listingAppliance = [];
}

//creation du tag Appareil + fermeture
function tagAppliance() {
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-appliance");
    newDivSelect.classList.add("box2-select-appliances", "box2");
    selectContainerAppliance.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = this.innerText;
    newDivSelect.appendChild(newElementSelect);
    //texte barré
    this.classList.add("appliance-hide")
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect)

    //fermeture du tag    
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove()
        innerText.classList.remove("appliance-hide")
    })
}


//--------------------Ustensils--------------------
//extraire les appareils du tableau recette
let listingUstensil = []
getAllUstensilsFromRecipes()

function getAllUstensilsFromRecipes() {
    let allUstensils = []
    recipes.forEach(recipe => {
        let newUstensilstoAdd = recipe.ustensils
        allUstensils.push(newUstensilstoAdd)
    })
    // console.log("l'ensemble des tableaux ustensiles")
    // console.log(allUstensils)
    allUstensils.flat().forEach(ustensil => {
        if (!listingUstensil.includes(ustensil)) {
            listingUstensil.push(ustensil)
            listingUstensil.sort()
        }
    })
    // console.log("l'ensemble des ustensiles triés")
    // console.table(listingUstensil)
}

//-----affichage de la liste complete des ustensiles
const UstensilContainer = document.getElementById("box3-ustensils")
const box3Extended = document.getElementById("box3-display-content")
const down3 = document.getElementById("chevron-down-3")
const up3 = document.getElementById("chevron-up-3")
const selectContainerUstensils = document.getElementById("box-select")

down3.addEventListener("click", downUstensil)
up3.addEventListener("click", upUstensil)

// fonction au clic sur le chevron bas
function downUstensil() {
    UstensilContainer.classList.remove("hidden")
    box3Extended.classList.add("box-extend")
    up3.classList.remove("hidden")
    down3.classList.add("hidden")
    document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensil';

    //creation de chaque paragraphe venant du listing
    listingUstensil.forEach(Ustensil => {
        let newElement = document.createElement("p")
        newElement.classList.add("ustensil")
        newElement.setAttribute("data-element", Ustensil)
        newElement.innerText = Ustensil;
        UstensilContainer.appendChild(newElement)
        //ecoute pour la creation du tag       
        newElement.addEventListener("click", tagUstensil)
    })
}

// fonction au clic sur le chevron haut
function upUstensil() {
    UstensilContainer.classList.add("hidden");
    box3Extended.classList.remove("box-extend");
    up3.classList.add("hidden");
    down3.classList.remove("hidden");
    document.getElementsByName('USTENSIL')[0].placeholder = 'Ustensiles';
    listingUstensil = [];
}

//creation du tag Ustensil + fermeture
//fonction tag
function tagUstensil() {
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ustensil");
    newDivSelect.classList.add("box3-select-ustensils", "box3");
    selectContainerUstensils.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = this.innerText;
    newDivSelect.appendChild(newElementSelect);
    //texte barré
    this.classList.add("ustensil-hide")
    //creation de l'icone
    let newIconSelect = document.createElement("i")
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect)
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove()
    })
}


