import { recipes } from './recipes.js';

//------------------------------------------------------------------------------------------
//---------------------Ingredients----------------------------------------------------------
//------------------------------------------------------------------------------------------
const IngredientContainer = document.getElementById("box1-ingredients");
const box1Extended = document.getElementById("box1-display-content");
const down1 = document.getElementById("chevron-down-1");
const up1 = document.getElementById("chevron-up-1");
const selectContainerIngredient = document.getElementById("box-select");
const inputIngredient = document.getElementById("ingredient-search")

down1.addEventListener("click", downIngredient);
up1.addEventListener("click", upIngredient);

let listingIngredient = [];
getAllIngredientFromRecipes();

// //extraire les ingredients du tableau recette
function getAllIngredientFromRecipes() {
    let allIngredients = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(oneIngredient => {
            let newIngredientToAdd = oneIngredient.ingredient;
            allIngredients.push(newIngredientToAdd);
        })
    })
    allIngredients.forEach(ingredient => {
        if (!listingIngredient.includes(ingredient)) {
            listingIngredient.push(ingredient);
            listingIngredient.sort();
        }
    })
    console.log("l'ensemble des ingredients triés");
    console.table(listingIngredient);
}

// fonction au clic sur le chevron bas
function downIngredient() {
    IngredientContainer.classList.remove("hidden");
    box1Extended.classList.add("box-extend");
    up1.classList.remove("hidden");
    down1.classList.add("hidden");
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';

    //creation de chaque paragraphe venant du listing
    listingIngredient.forEach(Ingredient => {
        let newElement = document.createElement("p");
        newElement.classList.add("ingredient");
        newElement.setAttribute("data-element", Ingredient);
        newElement.innerText = Ingredient;
        IngredientContainer.appendChild(newElement);

        //ecoute pour la creation du tag
        newElement.addEventListener("click", tagIngredient);

        //ecoute de l'input
        inputIngredient.addEventListener("input", function () {
            if (!Ingredient.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputIngredient.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElement.remove()
            }
            else {
                IngredientContainer.appendChild(newElement)
            }
        })
    })
}

//creation du tag Ingredient + fermeture
//fonction tag
function tagIngredient() {
    this.removeEventListener("click", tagIngredient)
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ingredient");
    newDivSelect.classList.add("box1-select-ingredients", "box1");
    selectContainerIngredient.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let ingredientName = this.innerText
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = ingredientName;
    newDivSelect.appendChild(newElementSelect);
    //texte barré
    this.classList.add("ingredient-hide");
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove();
        let newElement = document.querySelector(`[data-element="${ingredientName}"]`)
        newElement.addEventListener("click", tagIngredient)
        newElement.classList.remove("ingredient-hide")
    })
}

// fonction au clic sur le chevron haut
function upIngredient() {
    IngredientContainer.classList.add("hidden");
    box1Extended.classList.remove("box-extend");
    up1.classList.add("hidden");
    down1.classList.remove("hidden");
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
    listingIngredient = [];
}

//------------------------------------------------------------------------------------------
//---------------------Appareils------------------------------------------------------------
//------------------------------------------------------------------------------------------
const ApplianceContainer = document.getElementById("box2-appliance");
const box2Extended = document.getElementById("box2-display-content");
const down2 = document.getElementById("chevron-down-2");
const up2 = document.getElementById("chevron-up-2");
const selectContainerAppliance = document.getElementById("box-select");
const inputAppliance = document.getElementById("appliance-search");

down2.addEventListener("click", downAppliance);
up2.addEventListener("click", upAppliance);

let listingAppliance = [];
getAllApplianceFromRecipes();

// extraire les appareils du tableau recette
function getAllApplianceFromRecipes() {
    let allAppliance = [];
    recipes.forEach(recipe => {
        let newAppliancetoAdd = recipe.appliance;
        allAppliance.push(newAppliancetoAdd);
    })
    allAppliance.forEach(appliance => {
        if (!listingAppliance.includes(appliance)) {
            listingAppliance.push(appliance);
            listingAppliance.sort();
        }
    })
    // console.log("l'ensemble des appareils triés");
    // console.log(listingAppliance);
}

// fonction au clic sur le chevron bas
function downAppliance() {
    ApplianceContainer.classList.remove("hidden");
    box2Extended.classList.add("box-extend");
    up2.classList.remove("hidden");
    down2.classList.add("hidden");
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

        //ecoute de l'input
        inputAppliance.addEventListener("input", function () {
            if (!Appliance.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputAppliance.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElement.remove()
            }
            else {
                ApplianceContainer.appendChild(newElement)
            }
        })
    })
}

//creation du tag Appareil + fermeture
function tagAppliance() {
    this.removeEventListener("click", tagAppliance)
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-appliance");
    newDivSelect.classList.add("box2-select-appliances", "box2");
    selectContainerAppliance.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let applianceName = this.innerText
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = applianceName;
    newDivSelect.appendChild(newElementSelect);
    //texte barré
    this.classList.add("appliance-hide");
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove();
        let newElement = document.querySelector(`[data-element="${applianceName}"]`)
        newElement.addEventListener("click", tagAppliance)
        newElement.classList.remove("appliance-hide")
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

//------------------------------------------------------------------------------------------
//--------------------Ustensils-------------------------------------------------------------
//------------------------------------------------------------------------------------------

const UstensilContainer = document.getElementById("box3-ustensils");
const box3Extended = document.getElementById("box3-display-content");
const down3 = document.getElementById("chevron-down-3");
const up3 = document.getElementById("chevron-up-3");
const selectContainerUstensils = document.getElementById("box-select");
const inputUstensil = document.getElementById("ustensil-search");

down3.addEventListener("click", downUstensil);
up3.addEventListener("click", upUstensil);

let listingUstensil = [];
getAllUstensilsFromRecipes();

//extraire les appareils du tableau recette
function getAllUstensilsFromRecipes() {
    let allUstensils = [];
    recipes.forEach(recipe => {
        let newUstensilstoAdd = recipe.ustensils;
        allUstensils.push(newUstensilstoAdd);
    })
    allUstensils.flat().forEach(ustensil => {
        if (!listingUstensil.includes(ustensil)) {
            listingUstensil.push(ustensil);
            listingUstensil.sort();
        }
    })
    // console.log("l'ensemble des ustensiles triés")
    // console.table(listingUstensil)
}

// fonction au clic sur le chevron bas
function downUstensil() {
    UstensilContainer.classList.remove("hidden");
    box3Extended.classList.add("box-extend");
    up3.classList.remove("hidden");
    down3.classList.add("hidden");
    document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensile';

    //suite au listing, lancement de la creation de chaque element
    listingUstensil.forEach(Ustensil => {
        let newElement = document.createElement("p");
        newElement.classList.add("ustensil");
        newElement.setAttribute("data-element", Ustensil);
        newElement.innerText = Ustensil;
        UstensilContainer.appendChild(newElement);

        //ecoute pour la creation du tag
        newElement.addEventListener("click", tagUstensil);

        //ecoute de l'input
        inputUstensil.addEventListener("input", function () {
            if (!Ustensil.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputUstensil.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElement.remove()
            }
            else {
                UstensilContainer.appendChild(newElement)
            }
        })
    })
}

//creation du tag Ustensil + fermeture
function tagUstensil() {
    this.removeEventListener("click", tagUstensil)
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ustensil");
    newDivSelect.classList.add("box3-select-ustensils", "box3");
    selectContainerUstensils.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let ustensilName = this.innerText
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = ustensilName;
    newDivSelect.appendChild(newElementSelect);
    //texte barré
    this.classList.add("ustensil-hide");
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove();
        let newElement = document.querySelector(`[data-element="${ustensilName}"]`)
        newElement.addEventListener("click", tagUstensil)
        newElement.classList.remove("ustensil-hide")
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
