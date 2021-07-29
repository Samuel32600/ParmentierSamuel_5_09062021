import { recipes } from './recipes.js';
//tableau avec l'ensemble des données
let allRecipesOfObject = []
let allIngredients = []
let allAppliances = []
let allUstensils = []
// tableau avec données triées et doublon supprimé
let listingIngredient = [];
let listingAppliance = [];
let listingUstensil = [];

const mainRecipes = document.getElementById("allRecipes");
let totalFilters = 0;

class Recipe {
    constructor(name, time, description) {
        this.name = name
        this.time = time
        this.description = description
        this.ingredients = []
        this.appliances = []
        this.ustensils = []
        this.hasFilters = 0;
    }

    //------------------------------------
    //-----ajout des ingredients----------
    //------------------------------------
    _addIngredient(IngredientAdded) {
        this.ingredients.push(IngredientAdded)
    }

    //incrementation du nombre de filtre
    _addIngredientFilter(ingredientName) {
        this.ingredients.forEach((oneOfIngredient) => {
            if (oneOfIngredient.name === ingredientName) {
                oneOfIngredient.isChecked = true
                this.hasFilters += 1
                // console.log(this.name)
            }
        })
    }
    _removeIngredientFilter(ingredientName) {
        this.ingredients.forEach((oneOfIngredient) => {
            if (oneOfIngredient.name === ingredientName) {
                oneOfIngredient.isChecked = false
                this.hasFilters -= 1
            }
        })
    }
    //----------------------------------
    //-----ajout des appareils----------
    //----------------------------------
    _addAppliance(ApplianceAdded) {
        this.appliances.push(ApplianceAdded)
    }
    //incrementation du nombre de filtre
    _addApplianceFilter(applianceName) {
        this.appliances.forEach((oneOfAppliance) => {
            if (oneOfAppliance.name === applianceName) {
                oneOfAppliance.isChecked = true
                this.hasFilters += 1
                // console.log(this.name)
            }
        })
    }
    _removeApplianceFilter(applianceName) {
        this.appliances.forEach((oneOfAppliance) => {
            if (oneOfAppliance.name === applianceName) {
                oneOfAppliance.isChecked = false
                this.hasFilters -= 1
            }
        })
    }
    //----------------------------------
    //-----ajout des ustensils----------
    //----------------------------------
    _addUstensil(UstensilAdded) {
        this.ustensils.push(UstensilAdded)
    }
    //incrementation du nombre de filtre
    _addUstensilFilter(ustensilName) {
        this.ustensils.forEach((oneOfUstensil) => {
            if (oneOfUstensil.name === ustensilName) {
                oneOfUstensil.isChecked = true
                this.hasFilters += 1
                console.log(this.name)
            }
        })
    }
    _removeUstensilFilter(ustensilName) {
        this.ustensils.forEach((oneOfUstensil) => {
            if (oneOfUstensil.name === ustensilName) {
                oneOfUstensil.isChecked = false
                this.hasFilters -= 1
            }
        })
    }
}

class Ingredient {
    constructor(name, quantity, unit) {
        this.name = name;
        // this.quantity = quantity
        this.quantity = this._validFormatQuantity(quantity);
        // this.unit = unit
        this.unit = this._validFormatUnit(unit);
        this.isChecked = false;
        this._validFormatUnit()
    }

    //mettre la valeur de quantity en forme
    _validFormatQuantity(number) {
        if (typeof number === "undefined") {
            return number = "";
        } else {
            return number;
        }
    }
    //adapté la valeur de l'unité
    _validFormatUnit(number) {
        let mesure = this._validFormatQuantity(number);
        if (mesure.length > 2) {
            return mesure.substring(9, 0);
        } else {
            return mesure;
        }
    }
}

class Appliance {
    constructor(name) {
        this.name = name;
        this.isChecked = false;
    }
}

class Ustensil {
    constructor(name) {
        this.name = name;
        this.isChecked = false;
    }
}

//extraire les elements de chaque recette (le nom, le temps et la description)
recipes.forEach((oneOfRecipe) => {
    let newRecipe = new Recipe(oneOfRecipe.name, oneOfRecipe.time, oneOfRecipe.description)

    //-----extraire les ingredients de recipes + sous tableaux ingredients-----
    oneOfRecipe.ingredients.forEach((oneOfIngredient) => {
        let newIngredient = new Ingredient(oneOfIngredient.ingredient, oneOfIngredient.quantity, oneOfIngredient.unit)
        allIngredients.push(newIngredient.name)
        //fonction pour rajouter les ingredients dans la classe principale Recipe
        newRecipe._addIngredient(newIngredient)
    })

    //-----extraire les appareils de recipes-----    
    let newAppliance = new Appliance(oneOfRecipe.appliance)
    allAppliances.push(newAppliance.name)
    //fonction pour rajouter les appareils dans la classe principale Recipe
    newRecipe._addAppliance(newAppliance)

    //-----extraire les ustensiles de recipes-----
    oneOfRecipe.ustensils.forEach((oneOfUstensil) => {
        let newUstensil = new Ustensil(oneOfUstensil)
        allUstensils.push(newUstensil.name)
        //fonction pour rajouter les ustensiles dans la classe principale Recipe
        newRecipe._addUstensil(newUstensil)
    })

    allRecipesOfObject.push(newRecipe)
})

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

//suppression doublon + trier alphabetiquement
listingIngredient = [...new Set(allIngredients)]
listingIngredient.sort()

// fonction au clic sur le chevron bas
function downIngredient() {
    IngredientContainer.classList.remove("hidden");
    box1Extended.classList.add("box-extend");
    up1.classList.remove("hidden");
    down1.classList.add("hidden");
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';

    //creation de chaque paragraphe venant du listing
    listingIngredient.forEach((Ingredient) => {
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
    //lancement de la fonction pour selection une recette en fonction de l'ingredient cliqué
    addIngredient(ingredientName)
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove();
        let newElement = document.querySelector(`[data-element="${ingredientName}"]`)
        newElement.addEventListener("click", tagIngredient)
        newElement.classList.remove("ingredient-hide")
        // lancement de la fonction pour supprimer la selection de l'ingredient cliqué
        removeIngredient(ingredientName)
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

function addIngredient(ingredientName) {
    totalFilters += 1
    console.log("L'utilisateur a cliqué sur ", ingredientName, "et on a maintenant", totalFilters, "filtres actifs")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._addIngredientFilter(ingredientName)
    })
    getValidRecipe()
}

function removeIngredient(ingredientName) {
    totalFilters -= 1
    console.log("L'utilisateur a supprimé ", ingredientName, "et on a maintenant", totalFilters, "filtres actifs")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._removeIngredientFilter(ingredientName)
    })
    getValidRecipe()
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

//suppression doublon + trier alphabetiquement
listingAppliance = [...new Set(allAppliances)]
listingAppliance.sort()

// fonction au clic sur le chevron bas
function downAppliance() {
    ApplianceContainer.classList.remove("hidden");
    box2Extended.classList.add("box-extend");
    up2.classList.remove("hidden");
    down2.classList.add("hidden");
    document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil';
    //creation de chaque paragraphe venant du listing
    listingAppliance.forEach((Appliance) => {
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
    //lancement de la fonction pour selection une recette en fonction de l'ustensil cliqué
    addAppliance(applianceName)
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove();
        let newElement = document.querySelector(`[data-element="${applianceName}"]`)
        newElement.addEventListener("click", tagAppliance)
        newElement.classList.remove("appliance-hide")
        // lancement de la fonction pour supprimer la selection de l'appareil cliqué
        removeAppliance(applianceName)
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

function addAppliance(applianceName) {
    totalFilters += 1
    console.log("L'utilisateur a cliqué sur ", applianceName, "et on a maintenant", totalFilters, "filtres actifs")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._addApplianceFilter(applianceName)
    })
    getValidRecipe()
}

function removeAppliance(applianceName) {
    totalFilters -= 1
    console.log("L'utilisateur a supprimé ", applianceName, "et on a maintenant", totalFilters, "filtres actifs")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._removeApplianceFilter(applianceName)
    })
    getValidRecipe()
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

//suppression doublon + trier alphabetiquement
listingUstensil = [...new Set(allUstensils)]
listingUstensil.sort()

// fonction au clic sur le chevron bas
function downUstensil() {
    UstensilContainer.classList.remove("hidden");
    box3Extended.classList.add("box-extend");
    up3.classList.remove("hidden");
    down3.classList.add("hidden");
    document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensile';

    //creation de chaque paragraphe venant du listing
    listingUstensil.forEach((Ustensil) => {
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
    //lancement de la fonction pour selection une recette en fonction de l'ustensil cliqué
    addUstensil(ustensilName)
    //fermeture du tag par la croix  
    newIconSelect.addEventListener("click", function () {
        newDivSelect.remove();
        let newElement = document.querySelector(`[data-element="${ustensilName}"]`)
        newElement.addEventListener("click", tagUstensil)
        newElement.classList.remove("ustensil-hide")
        // lancement de la fonction pour supprimer la selection de l'ustensil cliqué
        removeUstensil(ustensilName)
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

function addUstensil(ustensilName) {
    totalFilters += 1
    console.log("L'utilisateur a cliqué sur ", ustensilName, "et on a maintenant", totalFilters, "filtres actifs")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._addUstensilFilter(ustensilName)
    })
    getValidRecipe()
}

function removeUstensil(ustensilName) {
    totalFilters -= 1
    console.log("L'utilisateur a supprimé ", ustensilName, "et on a maintenant", totalFilters, "filtres actifs")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._removeUstensilFilter(ustensilName)
    })
    getValidRecipe()
}

//affichage des recettes en fonction des filtres selectionnés
function getValidRecipe() {
    console.log("les recettes disponibles avec les", totalFilters, "filtres selectionnés")
    allRecipesOfObject.forEach((oneOfRecipe) => {
        if (oneOfRecipe.hasFilters === totalFilters) {
            console.log(oneOfRecipe.name)
            card(oneOfRecipe)
        }
    })
}

//création d'une carte recette
function card(recipe) {
    let CardRecipe = "";
    CardRecipe += `<figure>
    <img class="recette">
    <figcaption>
        <aside class="title">
            <p class="name">
                ${recipe.name}
            </p>
            <div class="duration">
                <i class="far fa-clock"></i>
                <p class="time">${recipe.time} min</p>
            </div>
        </aside>
        <div class="text">
            <ul class="ingredients">               
                ${recipe.ingredients.map(elementOfIngredient =>`
                <li>
                        <span>${elementOfIngredient.name} : </span>${elementOfIngredient.quantity} ${elementOfIngredient.unit}
                </li>`).join("")}
            </ul>
            <p class="description">${recipe.description}</p>
        </div>
    </figcaption>
</figure>`

mainRecipes.insertAdjacentHTML('beforeend', CardRecipe)
}






