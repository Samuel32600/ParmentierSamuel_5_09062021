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

function getAllIngredientFromRecipes() {
    let allIngredients = []
    recipes.forEach(recipe => {
        // console.table(recipe.ingredients)
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
        //console.log("Voici les appareils de la recette : ", recipe.name)
        //console.table(recipe.appliance)
        let newAppliancetoAdd = recipe.appliance
        allAppliance.push(newAppliancetoAdd)
    })
    return allAppliance
}
//supprimer les doublons
function removeDuplicateAppliance() {
    let uniqueAppliance = [];
allAppliance.forEach(appliance=>{
    if (!uniqueAppliance.includes(appliance)){
        uniqueAppliance.push(appliance)
    }
})
return uniqueAppliance
}
//trier par ordre alphabetique
function sortByAlphabetAllAppliance(){
    return uniqueAppliance.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllAppliance(uniqueAppliance) {
   console.table(uniqueAppliance)
}
//appel des funtions
let allAppliance = getAllApplianceFromRecipes()
let uniqueAppliance = removeDuplicateAppliance()
uniqueAppliance = sortByAlphabetAllAppliance()
seeAllAppliance(uniqueAppliance)

