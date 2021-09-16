import { recipes } from './recipes.js';

//tableau avec l'ensemble des données
let allRecipesOfObject = []
let allRecipesFounded = []
let allIngredients = []
let allAppliances = []
let allUstensils = []

// tableau avec données triées et doublon supprimé
let listingIngredient = [];
let listingAppliance = [];
let listingUstensil = [];

//nouveau tableau apres les selections des filtres
let ingredientFilter = []
let applianceFilter = []
let ustensilFilter = []

//tableau suite selection d'un tag
let taggedIngredients = []
let taggedAppliance = []
let taggedUstensils = []

const mainRecipes = document.getElementById("allRecipes");
const mainSearch = document.getElementById("main-search");
let totalFilters = 0;

const IngredientContainer = document.getElementById("box1-ingredients");
const box1Extended = document.getElementById("box1-display-content");
const down1 = document.getElementById("chevron-down-1");
const up1 = document.getElementById("chevron-up-1");
const selectContainerIngredient = document.getElementById("box-select");
const inputIngredient = document.getElementById("ingredient-search")
down1.addEventListener("click", downIngredient);
up1.addEventListener("click", upIngredient);

const ApplianceContainer = document.getElementById("box2-appliance");
const box2Extended = document.getElementById("box2-display-content");
const down2 = document.getElementById("chevron-down-2");
const up2 = document.getElementById("chevron-up-2");
const selectContainerAppliance = document.getElementById("box-select");
const inputAppliance = document.getElementById("appliance-search");
down2.addEventListener("click", downAppliance);
up2.addEventListener("click", upAppliance);

const UstensilContainer = document.getElementById("box3-ustensils");
const box3Extended = document.getElementById("box3-display-content");
const down3 = document.getElementById("chevron-down-3");
const up3 = document.getElementById("chevron-up-3");
const selectContainerUstensils = document.getElementById("box-select");
const inputUstensil = document.getElementById("ustensil-search");
down3.addEventListener("click", downUstensil);
up3.addEventListener("click", upUstensil);



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

    //************************************
    //       ajout des ingredients     
    //************************************

    _addIngredient(IngredientAdded) {
        this.ingredients.push(IngredientAdded)
    }

    //incrementation du nombre de filtre
    _addIngredientFilter(ingredientName) {
        this.ingredients.forEach((oneOfIngredient) => {
            if (oneOfIngredient.name === ingredientName) {
                oneOfIngredient.isChecked = true
                this.hasFilters += 1
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

    //************************************
    //        ajout des appareils
    //************************************
    _addAppliance(ApplianceAdded) {
        this.appliances.push(ApplianceAdded)
    }

    //incrementation du nombre de filtre
    _addApplianceFilter(applianceName) {
        this.appliances.forEach((oneOfAppliance) => {
            if (oneOfAppliance.name === applianceName) {
                oneOfAppliance.isChecked = true
                this.hasFilters += 1
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

    //************************************
    //         ajout des ustensils
    //************************************
    _addUstensil(UstensilAdded) {
        this.ustensils.push(UstensilAdded)
    }

    //incrementation du nombre de filtre
    _addUstensilFilter(ustensilName) {
        this.ustensils.forEach((oneOfUstensil) => {
            if (oneOfUstensil.name === ustensilName) {
                oneOfUstensil.isChecked = true
                this.hasFilters += 1
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

//***************************************
//  definition des classes des 3 Filtres
//***************************************
class Ingredient {
    constructor(name, quantity, unit) {
        this.name = name;
        this.quantity = this._validFormatQuantity(quantity);
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
allRecipesFounded = allRecipesOfObject

//************************************
//            Ingredients
//************************************

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
    createIngredientListing()
}


//creation de chaque paragraphe venant du listing
function createIngredientListing() {
    listingIngredient.forEach((Ingredient) => {
        let newElement = document.createElement("p");
        newElement.classList.add("ingredient");
        newElement.setAttribute("data-element", Ingredient);
        newElement.innerText = Ingredient;
        IngredientContainer.appendChild(newElement);
        //ecoute pour la creation du tag
        newElement.addEventListener("click", tagIngredient);
        //ecoute de l'input de recherche
        inputIngredient.addEventListener("input", function () {
            if (!Ingredient.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputIngredient.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElement.remove()
            } else {
                IngredientContainer.appendChild(newElement)
            }
        })
    })
}


//creation du tag Ingredient + fermeture
function tagIngredient() {
    taggedIngredients.push(this.innerText)
    this.removeEventListener("click", tagIngredient)
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ingredient-" + this.innerText);
    newDivSelect.classList.add("box1-select-ingredients", "box1");
    selectContainerIngredient.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let ingredientName = this.innerText
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = ingredientName;
    newDivSelect.appendChild(newElementSelect);
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);
    //lancement de la fonction pour selection une recette en fonction de l'ingredient cliqué
    addIngredient(ingredientName)
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

// selection d'un Ingredient
function addIngredient(ingredientName) {
    totalFilters += 1
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._addIngredientFilter(ingredientName)
    })
    getValidRecipe()
}

// déselection d'un Ingredient
function removeIngredient(ingredientName) {
    totalFilters -= 1
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._removeIngredientFilter(ingredientName)
    })
    getValidRecipe()
}

// mise a jour du listing Ingredient
function updateFilterIngredient() {
    listingIngredient = []
    document.querySelectorAll("#box1-ingredients p").forEach(e => e.remove())
    ingredientFilter.forEach((ingredientFiltered) => {
        let newElementFiltered = document.createElement("p");
        newElementFiltered.classList.add("ingredient");
        newElementFiltered.setAttribute("data-element", ingredientFiltered);
        newElementFiltered.innerText = ingredientFiltered;
        IngredientContainer.appendChild(newElementFiltered)
        newElementFiltered.addEventListener("click", tagIngredient);
        if (taggedIngredients.includes(ingredientFiltered)) {
            newElementFiltered.classList.add("ingredient-hide")
            newElementFiltered.removeEventListener("click", tagIngredient)
            let newDivSelect = document.getElementById("box-tag-ingredient-" + ingredientFiltered)
            newDivSelect.addEventListener("click", function () {
                taggedIngredients.forEach(function (oneTaggedIngredient, index) {
                    if (oneTaggedIngredient === ingredientFiltered) {
                        taggedIngredients.splice(index, 1)
                        newDivSelect.remove();
                        let newElement = document.querySelector(`[data-element="${ingredientFiltered}"]`)
                        newElement.addEventListener("click", tagIngredient)
                        newElement.classList.remove("ingredient-hide")
                        // lancement de la fonction pour supprimer la selection de l'ustensil cliqué
                        removeIngredient(ingredientFiltered)
                    }
                })
            })
        }
        //ecoute de l'input de recherche
        inputIngredient.addEventListener("input", function () {
            if (!ingredientFiltered.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputIngredient.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElementFiltered.remove()
            } else {
                IngredientContainer.appendChild(newElementFiltered)
            }
        })
    })
}

//************************************
//              Appareils
//************************************

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
    createApplianceListing()
}


//creation de chaque paragraphe venant du listing
function createApplianceListing() {
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
            } else {
                ApplianceContainer.appendChild(newElement)
            }
        })
    })
}


//creation du tag Appareil + fermeture
function tagAppliance() {
    taggedAppliance.push(this.innerText)
    this.removeEventListener("click", tagAppliance)
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-appliance-" + this.innerText);
    newDivSelect.classList.add("box2-select-appliances", "box2");
    selectContainerAppliance.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let applianceName = this.innerText
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = applianceName;
    newDivSelect.appendChild(newElementSelect);
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);
    //lancement de la fonction pour selection une recette en fonction de l'ustensil cliqué
    addAppliance(applianceName)
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

// selection d'un Appareil
function addAppliance(applianceName) {
    totalFilters += 1
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._addApplianceFilter(applianceName)
    })
    getValidRecipe()
}

// déselection d'un Appareil
function removeAppliance(applianceName) {
    totalFilters -= 1
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._removeApplianceFilter(applianceName)
    })
    getValidRecipe()
}

// mise a jour du listing Appliance
function updateFilterAppliance() {
    listingAppliance = []
    document.querySelectorAll("#box2-appliance p").forEach(e => e.remove())
    applianceFilter.forEach((applianceFiltered) => {
        let newElementFiltered = document.createElement("p");
        newElementFiltered.classList.add("appliance");
        newElementFiltered.setAttribute("data-element", applianceFiltered);
        newElementFiltered.innerText = applianceFiltered;
        ApplianceContainer.appendChild(newElementFiltered)
        newElementFiltered.addEventListener("click", tagAppliance)
        if (taggedAppliance.includes(applianceFiltered)) {
            newElementFiltered.classList.add("appliance-hide")
            newElementFiltered.removeEventListener("click", tagAppliance)
            let newDivSelect = document.getElementById("box-tag-appliance-" + applianceFiltered)
            newDivSelect.addEventListener("click", function () {
                taggedAppliance.forEach(function (oneTaggedAppliance, index) {
                    if (oneTaggedAppliance === applianceFiltered) {
                        taggedAppliance.splice(index, 1)
                        newDivSelect.remove();
                        let newElement = document.querySelector(`[data-element="${applianceFiltered}"]`)
                        newElement.addEventListener("click", tagAppliance)
                        newElement.classList.remove("appliance-hide")
                        // lancement de la fonction pour supprimer la selection de l'ustensil cliqué
                        removeAppliance(applianceFiltered)
                    }
                })

            })
        }
        //ecoute de l'input
        inputAppliance.addEventListener("input", function () {
            if (!applianceFiltered.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputAppliance.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElementFiltered.remove()

            } else {
                ApplianceContainer.appendChild(newElementFiltered)
            }
        })
    })
}

//************************************
//             Ustensils
//************************************

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
    createUstensilListing()
}

//creation de chaque paragraphe venant du listing    
function createUstensilListing() {
    listingUstensil.forEach((Ustensil) => {
        let newElement = document.createElement("p");
        newElement.classList.add("ustensil");
        newElement.setAttribute("data-element", Ustensil);
        newElement.innerText = Ustensil;
        UstensilContainer.appendChild(newElement);
        // ecoute pour la creation du tag
        newElement.addEventListener("click", tagUstensil);
        //ecoute de l'input
        inputUstensil.addEventListener("input", function () {
            if (!Ustensil.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputUstensil.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElement.remove()
            } else {
                UstensilContainer.appendChild(newElement)
            }
        })
    })
}




//creation du tag Ustensil + fermeture
function tagUstensil() {
    taggedUstensils.push(this.innerText)
    this.removeEventListener("click", tagUstensil)
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ustensil-" + this.innerText);
    newDivSelect.classList.add("box3-select-ustensils", "box3");
    selectContainerUstensils.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let ustensilName = this.innerText
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = ustensilName;
    newDivSelect.appendChild(newElementSelect);
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);
    //lancement de la fonction pour selection une recette en fonction de l'ustensil cliqué
    addUstensil(ustensilName)
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

// selection d'un Ustensil
function addUstensil(ustensilName) {
    totalFilters += 1
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._addUstensilFilter(ustensilName)
    })
    getValidRecipe()
}

// déselection d'un Ustensil
function removeUstensil(ustensilName) {
    totalFilters -= 1
    allRecipesOfObject.forEach((oneOfRecipe) => {
        oneOfRecipe._removeUstensilFilter(ustensilName)
    })
    getValidRecipe()
}

// mise a jour du listing Ustensil
function updateFilterUstensil() {
    listingUstensil = []
    document.querySelectorAll("#box3-ustensils p").forEach(e => e.remove())
    ustensilFilter.forEach((ustensilFiltered) => {
        let newElementFiltered = document.createElement("p");
        newElementFiltered.classList.add("ustensil");
        newElementFiltered.setAttribute("data-element", ustensilFiltered);
        newElementFiltered.innerText = ustensilFiltered;
        UstensilContainer.appendChild(newElementFiltered)
        newElementFiltered.addEventListener("click", tagUstensil)
        if (taggedUstensils.includes(ustensilFiltered)) {
            newElementFiltered.classList.add("ustensil-hide")
            newElementFiltered.removeEventListener("click", tagUstensil)
            let newDivSelect = document.getElementById("box-tag-ustensil-" + ustensilFiltered)
            newDivSelect.addEventListener("click", function () {
                taggedUstensils.forEach(function (oneTaggedUstensil, index) {
                    if (oneTaggedUstensil === ustensilFiltered) {
                        taggedUstensils.splice(index, 1)
                        newDivSelect.remove();
                        let newElement = document.querySelector(`[data-element="${ustensilFiltered}"]`)
                        newElement.addEventListener("click", tagUstensil)
                        newElement.classList.remove("ustensil-hide")
                        // lancement de la fonction pour supprimer la selection de l'ustensil cliqué
                        removeUstensil(ustensilFiltered)
                    }
                })

            })
        }
        //ecoute de l'input
        inputUstensil.addEventListener("input", function () {
            if (!ustensilFiltered.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputUstensil.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                newElementFiltered.remove()
            } else {
                UstensilContainer.appendChild(newElementFiltered)
            }
        })

    })
}


//************************************
// recherche dans la barre principale
//************************************
mainSearch.addEventListener("input", principalSearchV2)

function principalSearch() {
    let operationCount = 0

    document.querySelectorAll('.result-recipe').forEach((showCards) => showCards.remove())
    allRecipesOfObject = []


    if (mainSearch.value.length > 2) {

        allRecipesFounded.forEach((oneOfRecipe) => {
            operationCount++

            if (oneOfRecipe.hasFilters === totalFilters) {
                if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    allRecipesOfObject.push(oneOfRecipe)
                } else if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    allRecipesOfObject.push(oneOfRecipe)
                } else {
                    oneOfRecipe.ingredients.forEach(function (ingr) {
                        if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                            allRecipesOfObject.push(oneOfRecipe)
                        }
                    })
                }
            }
        })
        getValidRecipe()
    }
    else {
        console.log("je vide les tableaux")
        document.querySelectorAll("#box1-ingredients p").forEach(e => e.remove())
        listingIngredient = [...new Set(allIngredients)]
        listingIngredient.sort()
        createIngredientListing()
        document.querySelectorAll("#box2-appliance p").forEach(e => e.remove())
        listingAppliance = [...new Set(allAppliances)]
        listingAppliance.sort()
        createApplianceListing()
        document.querySelectorAll("#box3-ustensils p").forEach(e => e.remove())
        listingUstensil = [...new Set(allUstensils)]
        listingUstensil.sort()
        createUstensilListing()
    }
    console.log("Voici le nombre d'opérations : ", operationCount)
}


function principalSearchV2() {
    let operationCount = 0
    if (mainSearch.value.length > 2) {
        document.querySelectorAll('.result-recipe').forEach((showCards) => showCards.remove())
        allRecipesOfObject = []
        allRecipesFounded.forEach((oneOfRecipe) => {
            operationCount++
            if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                allRecipesOfObject.push(oneOfRecipe)
            } else if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                allRecipesOfObject.push(oneOfRecipe)
            } else {
                oneOfRecipe.ingredients.forEach(function (ingr) {
                    if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(mainSearch.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                        allRecipesOfObject.push(oneOfRecipe)
                    }
                })
            }
        })

        allRecipesOfObject.forEach(function (oneSemiValidatedRecipe, index) {
            operationCount++
            if (oneSemiValidatedRecipe.hasFilters !== totalFilters) {
                allRecipesOfObject.splice(index, 1)
            }
        })
        getValidRecipe()
    }
    console.log("Voici le nombre d'opérations : ", operationCount)

}

//*************************************************************
// affichage des recettes en fonction des filtres selectionnés
//*************************************************************
function getValidRecipe() {

    document.querySelectorAll('.result-recipe').forEach((showCards) => showCards.remove())
    ingredientFilter = []
    applianceFilter = []
    ustensilFilter = []

    allRecipesOfObject.forEach((oneOfRecipe) => {

        if (oneOfRecipe.hasFilters === totalFilters) {
            card(oneOfRecipe)

            //mise a jour des ingredients
            oneOfRecipe.ingredients.forEach((ingr) => {
                if (ingredientFilter.includes(ingr.name) === false) {
                    ingredientFilter.push(ingr.name)
                    ingredientFilter.sort()
                }
            })
            //mise a jour des appareils
            oneOfRecipe.appliances.forEach((appl) => {
                if (applianceFilter.includes(appl.name) === false) {
                    applianceFilter.push(appl.name)
                    applianceFilter.sort()
                }
            })
            //mise a jour des ustensiles
            oneOfRecipe.ustensils.forEach((ust) => {
                if (ustensilFilter.includes(ust.name) === false) {
                    ustensilFilter.push(ust.name)
                    ustensilFilter.sort()
                }
            })
        }
        // console.log(oneOfRecipe.hasFilters)
        // console.log(totalFilters)
    })
    // nouveau tableau Ingrédient mis à jour
    updateFilterIngredient()
    // nouveau tableau Appareil mis à jour
    updateFilterAppliance()
    // nouveau tableau Ustensils mis à jour 
    updateFilterUstensil()
}

//******************************
// création d'une carte recette
//******************************
function card(recipe) {
    let CardRecipe = "";
    CardRecipe += `<figure class="result-recipe">
    <img class="recette">
    <figcaption>
        <aside class="title">
            <p class="name">${recipe.name}</p>
            <div class="duration">
                <i class="far fa-clock"></i>
                <p class="time">${recipe.time} min</p>
            </div>
        </aside>
        <div class="text">
            <ul class="ingredients">               
                ${recipe.ingredients.map(elementOfIngredient => `
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

