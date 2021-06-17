//------Ustensils-----
//extraire les appareils du tableau recette
function getAllUstensilsFromRecipes() {
    let allUstensils = []
    recipes.forEach(recipe => {
        //console.log("Voici les appareils de la recette : ", recipe.name)
        console.table(recipe.ustensils.slice())
        let newUstensilstoAdd = recipe.ustensils.slice()
        allUstensils.push(newUstensilstoAdd)
    })
    return allUstensils
}

function getoneArrayForUstensils() {
    let arrayUstensil = allUstensils.split();
    return arrayUstensil}

//supprimer les doublons
function removeDuplicateUstensils() {
    let uniqueUstensil = [];
    arrayUstensil.forEach(ustensil=>{
    if (!uniqueUstensil.includes(ustensil)){
        uniqueUstensil.push(ustensil)
    }
})
return uniqueUstensil
}
//trier par ordre alphabetique
function sortByAlphabetAllUstensils(){
    return uniqueUstensil.sort()
}
//faire apparaitre dans la console la liste finale
function seeAllUstensils(uniqueUstensil) {
   //console.table(uniqueUstensil)
}
//appel des funtions
let allUstensils = getAllUstensilsFromRecipes()
allUstensils = getoneArrayForUstensils()
arrayUstensil = removeDuplicateUstensils(arrayUstensil)
uniqueUstensil = sortByAlphabetAllUstensils()
seeAllUstensils(uniqueUstensil)