import { recipes } from './recipes.js';

//------Ingredients-----
//extraire les ingredients du tableau recette
function getAllIngredientFromRecipes() {
    let allIngredients = []
    recipes.forEach(recipe => {
        // console.log("Voici les ingrédients de la recette : ", recipe.name)
        recipe.ingredients.forEach(oneIngredient => {
            // console.log(oneIngredient.ingredient)
            let newIngredientToAdd = oneIngredient.ingredient
            allIngredients.push(newIngredientToAdd)
        })
    })
    return allIngredients
}
//supprimer les doublons
function removeDuplicateIngredients() {
    let listingIngredient = [];
    allIngredients.forEach(ingredient => {
        if (!listingIngredient.includes(ingredient)) {
            listingIngredient.push(ingredient)
        }
    })
    return listingIngredient
}
//trier par ordre alphabetique
function sortByAlphabetAllIngredients() {
    return listingIngredient.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllIngredient(listingIngredient) {
    console.log("voici la liste des ingrédients")
    console.table(listingIngredient)
}
//appel des functions
let allIngredients = getAllIngredientFromRecipes()
let listingIngredient = removeDuplicateIngredients()
listingIngredient = sortByAlphabetAllIngredients()
seeAllIngredient(listingIngredient)


//------Appliance-----
//extraire les appareils du tableau recette
function getAllApplianceFromRecipes() {
    let allAppliance = []
    recipes.forEach(recipe => {
        //console.table(recipe.appliance)
        let newAppliancetoAdd = recipe.appliance
        allAppliance.push(newAppliancetoAdd)
    })
    return allAppliance
}
//supprimer les doublons
function removeDuplicateAppliance() {
    let listingAppliance = [];
    allAppliance.forEach(appliance => {
        if (!listingAppliance.includes(appliance)) {
            listingAppliance.push(appliance)
        }
    })
    return listingAppliance
}
//trier par ordre alphabetique
function sortByAlphabetAllAppliance() {
    return listingAppliance.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllAppliance(listingAppliance) {
    console.log("voici la liste des appareils")
    console.table(listingAppliance)
}
//appel des funtions
let allAppliance = getAllApplianceFromRecipes()
let listingAppliance = removeDuplicateAppliance()
listingAppliance = sortByAlphabetAllAppliance()
seeAllAppliance(listingAppliance)


//------Ustensils-----
//extraire les appareils du tableau recette
function getAllUstensilsFromRecipes() {
    let allUstensils = []
    recipes.forEach(recipe => {
        //console.table(recipe.ustensils)
        let newUstensilstoAdd = recipe.ustensils
        allUstensils.push(newUstensilstoAdd)
    })
    return allUstensils
}
//supprimer les doublons
function removeDuplicateUstensils() {
    let listingUstensil = [];
    allUstensils.flat().forEach(ustensil => {
        if (!listingUstensil.includes(ustensil)) {
            listingUstensil.push(ustensil)
        }
    })
    return listingUstensil
}
//trier par ordre alphabetique
function sortByAlphabetAllUstensils() {
    return listingUstensil.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllUstensils(listingUstensil) {
    console.log("voici la liste des ustensiles")
    console.table(listingUstensil)
}
//appel des funtions
let allUstensils = getAllUstensilsFromRecipes()
let listingUstensil = removeDuplicateUstensils()
listingUstensil = sortByAlphabetAllUstensils()
seeAllUstensils(listingUstensil)

//addition des 3 tableaux
//let all = [listingIngredient + listingAppliance + listingUstensil]
//console.table(all)

//affichage de la liste des ingrédients
let isIngredientDisplayed = false
document.getElementById("box1-display-content").addEventListener("click", function showHide() {
    if (isIngredientDisplayed === false) {
        //console.log("On affiche la liste d'éléments")
        document.getElementById("box1-ingredients").classList.remove("hidden")
        document.getElementById("chevron-up-1").classList.remove("hidden")
        document.getElementById("chevron-down-1").classList.add("hidden")
    } else {
        //console.log("On cache la liste d'éléments")
        document.getElementById("box1-ingredients").classList.add("hidden")
        document.getElementById("chevron-up-1").classList.add("hidden")
        document.getElementById("chevron-down-1").classList.remove("hidden")
    }
    //
    return isIngredientDisplayed = !isIngredientDisplayed
})

//remplissage du tableau des ingredients
const ingredientContainer = document.getElementById("box1-ingredients")
listingIngredient.forEach(Ingredient => {
    let newElement = document.createElement("p")
    newElement.classList.add("ingredient")
    newElement.setAttribute("data-element", Ingredient)
    newElement.innerText = Ingredient
    newElement.addEventListener("click", function (event) {
        console.log("On a clické sur l'élément", Ingredient)
        listOfIngredientClicked.push(Ingredient)
        displayAllIngredientClicked()
    })
    ingredientContainer.appendChild(newElement)
})
let listOfIngredientClicked = []
function displayAllIngredientClicked() {
    console.table(listOfIngredientClicked)
}

//affichage de la liste des appareils
let isApplianceDisplayed = false
document.getElementById("box2-display-content").addEventListener("click", function showHide() {
    if (isApplianceDisplayed === false) {
        //console.log("On affiche la liste d'éléments")
        document.getElementById("box2-appliance").classList.remove("hidden")
        document.getElementById("chevron-up-2").classList.remove("hidden")
        document.getElementById("chevron-down-2").classList.add("hidden")
    } else {
        //console.log("On cache la liste d'éléments")
        document.getElementById("box2-appliance").classList.add("hidden")
        document.getElementById("chevron-up-2").classList.add("hidden")
        document.getElementById("chevron-down-2").classList.remove("hidden")
    }

    return isApplianceDisplayed = !isApplianceDisplayed
})

//remplissage du tableau des appareils
const applianceContainer = document.getElementById("box2-appliance")
let listOfApplianceClicked = []
listingAppliance.forEach(Appliance => {
    let newElement = document.createElement("p")
    newElement.classList.add("appliance")
    newElement.setAttribute("data-element", Appliance)
    newElement.innerText = Appliance
    newElement.addEventListener("click", function (event) {
        console.log("On a clické sur l'élément", Appliance)
        listOfIngredientClicked.push(Appliance)
        displayAllApplianceClicked()
    })
    applianceContainer.appendChild(newElement)
})
function displayAllApplianceClicked() {
    console.table(listOfApplianceClicked)
}

//affichage de la liste des ustensiles
let isUstensilsDisplayed = false
document.getElementById("box3-display-content").addEventListener("click", function showHide() {
    if (isUstensilsDisplayed === false) {
        //console.log("On affiche la liste d'éléments")
        document.getElementById("box3-ustensils").classList.remove("hidden")
        document.getElementById("chevron-up-3").classList.remove("hidden")
        document.getElementById("chevron-down-3").classList.add("hidden")
    } else {
        //console.log("On cache la liste d'éléments")
        document.getElementById("box3-ustensils").classList.add("hidden")
        document.getElementById("chevron-up-3").classList.add("hidden")
        document.getElementById("chevron-down-3").classList.remove("hidden")
    }

    return isUstensilsDisplayed = !isUstensilsDisplayed
})

//remplissage du tableau des ustensiles
const UstensilContainer = document.getElementById("box3-ustensils")
let listOfUstensilsClicked = []
listingUstensil.forEach(Ustensil => {
    let newElement = document.createElement("p")
    newElement.classList.add("ustensil")
    //newElement.setAttribute("data-element", Ustensil)
    newElement.innerText = Ustensil
    newElement.addEventListener("click", function selection(event) {
        console.log("On a clické sur l'élément", Ustensil)
        listOfUstensilsClicked.push(Ustensil)
        displayAllUstensilClicked()
    })
    UstensilContainer.appendChild(newElement)
})

//selection des elements filtrés
const selectContainer = document.getElementById("box-select")
function displayAllUstensilClicked() {
    console.table(listOfUstensilsClicked)    
    listOfUstensilsClicked.forEach(array => {
        let newDivSelect = document.createElement("div")
        newDivSelect.classList.add("box3-select-ustensils")
        selectContainer.appendChild(newDivSelect)
        let newElementSelect = document.createElement("p")
        newElementSelect.classList.add("box3")
        newElementSelect.innerText = listOfUstensilsClicked
        newDivSelect.appendChild(newElementSelect)  
    })
    
    
}

