import {recipes} from './recipes.js';

//------Ingredients-----
//extraire les appareils du tableau recette
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
    let uniqueIngredient = [];
    allIngredients.forEach(ingredient => {
        if (!uniqueIngredient.includes(ingredient)) {
            uniqueIngredient.push(ingredient)
        }
    })
    return uniqueIngredient
}
//trier par ordre alphabetique
function sortByAlphabetAllIngredients() {
    return uniqueIngredient.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllIngredient(uniqueIngredient) {
    console.log("voici la liste des ingrédients")
    console.table(uniqueIngredient)
}
//appel des functions
let allIngredients = getAllIngredientFromRecipes()
let uniqueIngredient = removeDuplicateIngredients()
uniqueIngredient = sortByAlphabetAllIngredients()
seeAllIngredient(uniqueIngredient)


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
    let uniqueAppliance = [];
    allAppliance.forEach(appliance => {
        if (!uniqueAppliance.includes(appliance)) {
            uniqueAppliance.push(appliance)
        }
    })
    return uniqueAppliance
}
//trier par ordre alphabetique
function sortByAlphabetAllAppliance() {
    return uniqueAppliance.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllAppliance(uniqueAppliance) {
    console.log("voici la liste des appareils")
    console.table(uniqueAppliance)
}
//appel des funtions
let allAppliance = getAllApplianceFromRecipes()
let uniqueAppliance = removeDuplicateAppliance()
uniqueAppliance = sortByAlphabetAllAppliance()
seeAllAppliance(uniqueAppliance)


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
    let uniqueUstensil = [];
    allUstensils.flat().forEach(ustensil => {
        if (!uniqueUstensil.includes(ustensil)) {
            uniqueUstensil.push(ustensil)
        }
    })
    return uniqueUstensil
}
//trier par ordre alphabetique
function sortByAlphabetAllUstensils() {
    return uniqueUstensil.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllUstensils(uniqueUstensil) {
    console.log("voici la liste des ustensiles")
    console.table(uniqueUstensil)
}
//appel des funtions
let allUstensils = getAllUstensilsFromRecipes()
let uniqueUstensil = removeDuplicateUstensils()
uniqueUstensil = sortByAlphabetAllUstensils()
seeAllUstensils(uniqueUstensil)

let all = [uniqueIngredient + uniqueAppliance + uniqueUstensil]
console.table(all)