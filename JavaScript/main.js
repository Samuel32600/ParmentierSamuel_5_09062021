import { recipes } from './recipes.js';


//-----------Ingredients----------

//extraire les ingredients du tableau recette
let allIngredients = getAllIngredientFromRecipes()
function getAllIngredientFromRecipes() {
    let allIngredients = []
    recipes.forEach(recipe => {
        //console.log("Voici les ingrédients de la recette : ", recipe.name)
        recipe.ingredients.forEach(oneIngredient => {
            //console.log(oneIngredient.ingredient)
            let newIngredientToAdd = oneIngredient.ingredient
            allIngredients.push(newIngredientToAdd)
        })
    })
    return allIngredients
}

//supprimer les doublons
let listingIngredient = removeDuplicateIngredients()
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
listingIngredient = sortByAlphabetAllIngredients()
function sortByAlphabetAllIngredients() {
    return listingIngredient.sort()
}

//faire apparaitre dans la console la liste finale
seeAllIngredient(listingIngredient)
function seeAllIngredient(listingIngredient) {
    //console.log("voici la liste des ingrédients")
    //console.table(listingIngredient)
}

//-----affichage de la liste des ingrédients
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
    return isIngredientDisplayed = !isIngredientDisplayed
})

//remplissage du tableau des ingredients
const ingredientContainer = document.getElementById("box1-ingredients")
let listOfIngredientClicked = []
listingIngredient.forEach(Ingredient => {
    let newElement = document.createElement("p")
    newElement.classList.add("ingredient")
    newElement.setAttribute("data-element", Ingredient)
    newElement.innerText = Ingredient
    newElement.addEventListener("click", function (event) {
        //console.log("On a clické sur l'élément", Ingredient)
        listOfIngredientClicked.push(Ingredient)
        displayAllIngredientClicked()
    })
    ingredientContainer.appendChild(newElement)
})

//selection des elements filtrés
const selectContainerIngredient = document.getElementById("box-select")
function displayAllIngredientClicked() {
    console.table(listOfIngredientClicked);
    listOfIngredientClicked.forEach(divHtmlIngredient => {
        //creation de la div
        let newDivSelect = document.createElement("div");
        newDivSelect.setAttribute("id", "box-tag-ingredient")
        newDivSelect.classList.add("box1-select-ingredients", "box1");
        selectContainerIngredient.appendChild(newDivSelect);
        //creation du texte
        let newElementSelect = document.createElement("p");
        newElementSelect.classList.add("box__text");
        newElementSelect.innerText = listOfIngredientClicked;
        newDivSelect.appendChild(newElementSelect);
        //creation de l'icone
        let newIconSelect = document.createElement("i")
        newIconSelect.classList.add("far", "fa-times-circle");
        newIconSelect.addEventListener("click", closeIngredient)
        newDivSelect.appendChild(newIconSelect);
    })     
}

//fermeture des tags Ustensils
function closeIngredient() {
    document.getElementById("box-tag-ingredient").remove();    
}



//-----------Appareils----------

//extraire les appareils du tableau recette
let allAppliance = getAllApplianceFromRecipes()
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
let listingAppliance = removeDuplicateAppliance()
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
listingAppliance = sortByAlphabetAllAppliance()
function sortByAlphabetAllAppliance() {
    return listingAppliance.sort()
}

//faire apparaitre dans la console la liste finale
seeAllAppliance(listingAppliance)
function seeAllAppliance(listingAppliance) {
    //console.log("voici la liste des appareils")
    //console.table(listingAppliance)
}

//-----affichage de la liste des appareils
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
        //console.log("On a clické sur l'élément", Appliance)
        listOfApplianceClicked.push(Appliance)
        displayAllApplianceClicked()
    })
    applianceContainer.appendChild(newElement)
})


//selection des elements filtrés
const selectContainerAppliance = document.getElementById("box-select")
function displayAllApplianceClicked() {
    console.table(listOfApplianceClicked);
    listOfApplianceClicked.forEach(divHtmlappliance => {
        //creation de la div
        let newDivSelect = document.createElement("div");
        newDivSelect.setAttribute("id", "box-tag-appliance")
        newDivSelect.classList.add("box2-select-appliances", "box2");
        selectContainerAppliance.appendChild(newDivSelect);
        //creation du texte
        let newElementSelect = document.createElement("p");
        newElementSelect.classList.add("box__text");
        newElementSelect.innerText = listOfApplianceClicked;
        newDivSelect.appendChild(newElementSelect);
        //creation de l'icone
        let newIconSelect = document.createElement("i")
        newIconSelect.classList.add("far", "fa-times-circle");
        newIconSelect.addEventListener("click", closeAppliance)
        newDivSelect.appendChild(newIconSelect);
    })     
}

//fermeture des tags Ustensils
function closeAppliance() {
    document.getElementById("box-tag-appliance").remove();    
}

//----------Ustensils----------

//extraire les appareils du tableau recette
let allUstensils = getAllUstensilsFromRecipes()
function getAllUstensilsFromRecipes() {
    let allUstensils = []
    recipes.forEach(recipe => {
        console.table(recipe.name)
        let newUstensilstoAdd = recipe.ustensils
        allUstensils.push(newUstensilstoAdd)
    })
    return allUstensils
}

let listingUstensil = removeDuplicateUstensils()
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

listingUstensil = sortByAlphabetAllUstensils()
//trier par ordre alphabetique
function sortByAlphabetAllUstensils() {
    return listingUstensil.sort()
}

//faire apparaitre dans la console la liste finale
seeAllUstensils(listingUstensil)
function seeAllUstensils(listingUstensil) {
    console.log("voici la liste des ustensiles")
    console.table(listingUstensil)
}

//-----affichage de la liste des ustensiles
let isUstensilsDisplayed = false
document.getElementById("box3-display-content").addEventListener("click", function showHide() {
    if (isUstensilsDisplayed === false) {
        console.log("On affiche la liste d'éléments")
        document.getElementById("box3-ustensils").classList.remove("hidden")
        document.getElementById("chevron-up-3").classList.remove("hidden")
        document.getElementById("chevron-down-3").classList.add("hidden")
    } else {
        console.log("On cache la liste d'éléments")
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
    newElement.setAttribute("data-element", Ustensil)
    newElement.innerText = Ustensil
    newElement.addEventListener("click", function selection(event) {
        console.log("On a clické sur l'élément", Ustensil)
        listOfUstensilsClicked.push(Ustensil)
        displayAllUstensilClicked()
    })
    UstensilContainer.appendChild(newElement)
})

//selection des elements filtrés
const selectContainerUstensils = document.getElementById("box-select")
function displayAllUstensilClicked() {
    console.table(listOfUstensilsClicked);
    listOfUstensilsClicked.forEach(divHtmlUstensils => {
        //creation de la div
        let newDivSelect = document.createElement("div");
        newDivSelect.setAttribute("id", "box-tag-ustensil")
        newDivSelect.classList.add("box3-select-ustensils", "box3");        
        selectContainerUstensils.appendChild(newDivSelect);
        //creation du texte
        let newElementSelect = document.createElement("p");
        newElementSelect.classList.add("box__text");
        newElementSelect.innerText = listOfUstensilsClicked;
        newDivSelect.appendChild(newElementSelect);
        //creation de l'icone
        let newIconSelect = document.createElement("i")
        newIconSelect.classList.add("far", "fa-times-circle");
        newIconSelect.addEventListener("click", closeUstensil)
        newDivSelect.appendChild(newIconSelect);
    })     
}

//fermeture des tags Ustensils
function closeUstensil() {
    document.getElementById("box-tag-ustensil").remove();    
}