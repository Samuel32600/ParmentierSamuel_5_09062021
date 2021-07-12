import { recipes } from './recipes.js';


//---------------------Ingredients--------------------

//extraire les ingredients du tableau recette
let allIngredients = getAllIngredientFromRecipes()
function getAllIngredientFromRecipes() {
    let allIngredients = []
    recipes.forEach(recipe => {
        // console.log("Voici les ingrédients de la recette : ", recipe.name)
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

//-----affiché et caché de la liste des ingrédients
const IngredientContainer = document.getElementById("box1-ingredients")
const box1Extended = document.getElementById("box1-display-content")
const down1 = document.getElementById("chevron-down-1")
const up1 = document.getElementById("chevron-up-1")

// affiche la liste
let isIngredientDisplayed = false
down1.addEventListener("click", function () {
    if (isApplianceDisplayed === false) {
        // console.log("On affiche la liste d'éléments")
        IngredientContainer.classList.remove("hidden")
        box1Extended.classList.add("box-extend")
        up1.classList.remove("hidden")
        down1.classList.add("hidden")
        document.getElementsByName('INGREDIENT')[0].placeholder='Recherche un ingrédient';
    }
})

//cache la liste
up1.addEventListener("click", function () {
    if (isIngredientDisplayed === false) {
        // console.log("On cache la liste d'éléments")
        IngredientContainer.classList.add("hidden")
        box1Extended.classList.remove("box-extend")
        up1.classList.add("hidden")
        down1.classList.remove("hidden")
        document.getElementsByName('INGREDIENT')[0].placeholder='Ingredients';
    }
})

//remplissage du tableau des ingredients

let listOfIngredientClicked = []
listingIngredient.slice(0,30).forEach(Ingredient => {
    let newElement = document.createElement("p")
    newElement.classList.add("ingredient")
    newElement.setAttribute("data-element", Ingredient)
    newElement.innerText = Ingredient

    newElement.addEventListener("click", function (event) {
        //console.log("On a clické sur l'élément", Ingredient)
        listOfIngredientClicked.push(Ingredient)
        // suppresion de la liste de l'élément cliqué
        let allIngredientsOnDom = document.getElementsByClassName("ingredient")
        Array.from(allIngredientsOnDom).forEach(function (oneIngredient) {
            let oneIngredientAttribute = oneIngredient.getAttribute("data-element")
            if (oneIngredientAttribute === Ingredient) {
                oneIngredient.classList.add("hidden")
            }
        })
        displayNewIngredient(Ingredient)
    })
    IngredientContainer.appendChild(newElement)
})


//selection des elements filtrés
const selectContainerIngredient = document.getElementById("box-select")

function displayNewIngredient(newIngredient) {
    // console.table(listOfIngredientClicked);
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-ingredient-" + newIngredient)
    newDivSelect.classList.add("box1-select-ingredients", "box1");
    selectContainerIngredient.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = newIngredient;
    newDivSelect.appendChild(newElementSelect);
    //creation de l'icone
    let newIconSelect = document.createElement("i")
    newIconSelect.classList.add("far", "fa-times-circle");
    newIconSelect.addEventListener("click", () => {
        // console.log("L'ingredient à supprimer est : ", newIngredient)
        document.getElementById("box-tag-ingredient-" + newIngredient).remove();
        listOfIngredientClicked.forEach(function (element, key) {
            if (element === newIngredient) {
                listOfIngredientClicked.splice(key, 1)
            }
        })
        let allIngredientsOnDom = document.getElementsByClassName("ingredient")
        Array.from(allIngredientsOnDom).forEach(function (oneIngredient) {
            let oneIngredientAttribute = oneIngredient.getAttribute("data-element")
            if (oneIngredientAttribute === newIngredient) {
                oneIngredient.classList.remove("hidden")
            }
        })
    })
    newDivSelect.appendChild(newIconSelect);
}


//---------------------Appareils--------------------

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
const ApplianceContainer = document.getElementById("box2-appliance")
const box2Extended = document.getElementById("box2-display-content")
const down2 = document.getElementById("chevron-down-2")
const up2 = document.getElementById("chevron-up-2")

let isApplianceDisplayed = false
down2.addEventListener("click", function () {
    if (isApplianceDisplayed === false) {
        // console.log("On affiche la liste d'éléments")
        ApplianceContainer.classList.remove("hidden")
        box2Extended.classList.add("box-extend")
        up2.classList.remove("hidden")
        down2.classList.add("hidden")
        document.getElementsByName('APPAREIL')[0].placeholder='Recherche un appareil';
    }
})

up2.addEventListener("click", function () {
    if (isApplianceDisplayed === false) {
        // console.log("On cache la liste d'éléments")
        ApplianceContainer.classList.add("hidden")
        box2Extended.classList.remove("box-extend")
        up2.classList.add("hidden")
        down2.classList.remove("hidden")
        document.getElementsByName('APPAREIL')[0].placeholder='Appareil';
    }
})

//remplissage du tableau des appareils
let listOfApplianceClicked = []
listingAppliance.forEach(Appliance => {
    let newElement = document.createElement("p")
    newElement.classList.add("appliance")
    newElement.setAttribute("data-element", Appliance)
    newElement.innerText = Appliance
    newElement.addEventListener("click", function (event) {
        //console.log("On a clické sur l'élément", Appliance)
        listOfApplianceClicked.push(Appliance)
        // suppresion de la liste de l'élément cliqué
        let allAppliancesOnDom = document.getElementsByClassName("appliance")
        Array.from(allAppliancesOnDom).forEach(function (oneAppliance) {
            let oneApplianceAttribute = oneAppliance.getAttribute("data-element")
            if (oneApplianceAttribute === Appliance) {
                oneAppliance.classList.add("hidden")
            }
        })
        displayNewAppliance(Appliance)
    })
    ApplianceContainer.appendChild(newElement)
})

//selection des elements filtrés
const selectContainerAppliance = document.getElementById("box-select")

function displayNewAppliance(newAppliance) {
    // console.table(listOfApplianceClicked);
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-appliance-" + newAppliance);
    newDivSelect.classList.add("box2-select-appliances", "box2");
    selectContainerAppliance.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = newAppliance;
    newDivSelect.appendChild(newElementSelect);
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newIconSelect.addEventListener("click", () => {
        // console.log("L'appareil à supprimer est : ", newAppliance);
        document.getElementById("box-tag-appliance-" + newAppliance).remove();
        listOfApplianceClicked.forEach(function (element, key) {
            if (element === newAppliance) {
                listOfApplianceClicked.splice(key, 1);
            }
        })
        let allAppliancesOnDom = document.getElementsByClassName("appliance");
        Array.from(allAppliancesOnDom).forEach(function (oneAppliance) {
            let oneApplianceAttribute = oneAppliance.getAttribute("data-element");
            if (oneApplianceAttribute === newAppliance) {
                oneAppliance.classList.remove("hidden");
            }
        })
    })
    newDivSelect.appendChild(newIconSelect);
}


//--------------------Ustensils--------------------

//extraire les appareils du tableau recette
let allUstensils = getAllUstensilsFromRecipes() //variable tous ustensiles = appel de la fonction obtenir les ustensiles des recettes
function getAllUstensilsFromRecipes() { // je lance la fonction obtenir les ustensiles des recettes
    let allUstensils = []   // je declare un tableau vide tous ustensiles
    recipes.forEach(recipe => { //dans le fichier Recipes pour chaque element je lance la fonction Recette
        // console.table(recipe.name)   j'affiche le nom de chaque recette du fichier recipes 
        let newUstensilstoAdd = recipe.ustensils    //nouveau ustensil a ajouter = fonction recette + ustensils du fichier recipes
        allUstensils.push(newUstensilstoAdd)    //j'ajoute les nouveaux ustensils dans le tableau de tous les ustensiles 
    })
    return allUstensils // je retourne la valeur du tableau de tous les ustensiles
}

//supprimer les doublons et deconcaténation
let listingUstensil = removeDuplicateUstensils()
function removeDuplicateUstensils() {
    let listingUstensil = [];   // je declare un tableau vide pour le listing des ustensiles
    allUstensils.flat().forEach(ustensil => {   //dans le tableau des ustensiles pour chaque element je lance la fonction Ustensil
        if (!listingUstensil.includes(ustensil)) {  //si diferent de listing Ustensil, j'inclus le nouvel ustensil
            listingUstensil.push(ustensil) // j'ajoute l'ensenble des nouveaux ustensiles dans le tableau listing Ustensil
        }
    })
    return listingUstensil  // je retourne la valeur du tableau du listing des ustensils
}

//trier par ordre alphabetique
listingUstensil = sortByAlphabetAllUstensils()  // le listing des ustensils = l'appel de la fonction du tri alphabetique
function sortByAlphabetAllUstensils() { // je lance la fonction du tri
    return listingUstensil.sort()   // je retourne le listing des ustensiles trier
}

//faire apparaitre dans la console la liste finale
seeAllUstensils(listingUstensil)
function seeAllUstensils(listingUstensil) { // je lance la fonction pour voir le listing des ustensiles
    // console.log("voici la liste des ustensiles")
    // console.table(listingUstensil)   j'affiche sous forme de tableau le listing ustensiles
}

//-----affichage de la liste des ustensiles
const UstensilContainer = document.getElementById("box3-ustensils") // const container Ustensil = je vais chercher l'id box3-ustensils
const down3 = document.getElementById("chevron-down-3") // const bas = je vais chercher l'id du chevron bas
const up3 = document.getElementById("chevron-up-3") // const haut = je vais chercher l'id du chevron haut
const box3Extended = document.getElementById("box3-display-content")
let isUstensilsDisplayed = false    // est l'ustensil affiché = faux
down3.addEventListener("click", function () { //sur le chevron bas à l'ecoute du click je lance la fonction anonyme
    if (isUstensilsDisplayed === false) {   // si est l'ustensil affiché === faux
        //  console.log("On affiche la liste d'éléments")
        UstensilContainer.classList.remove("hidden") //suppression de la class caché sur  l'element box3-ustensils
        box3Extended.classList.add("box-extend")
        up3.classList.remove("hidden") //suppression de la class caché sur l'element chevron-haut-3
        down3.classList.add("hidden") //ajout de la class caché sur l'element chevron-bas-3
        document.getElementsByName('USTENSIL')[0].placeholder='Recherche un ustensil';
        
    }
})
up3.addEventListener("click", function () { //sur le chevron haut à l'ecoute du click je lance la fonction anonyme
    if (isUstensilsDisplayed === false) { // si est l'ustensil affiché === faux
        // console.log("On cache la liste d'éléments")
        UstensilContainer.classList.add("hidden") //ajout de la class caché sur  l'element box3-ustensils
        box3Extended.classList.remove("box-extend")
        up3.classList.add("hidden") //ajout de la class caché sur l'element chevron-haut-3
        down3.classList.remove("hidden") //suppression de la class caché sur l'element chevron-bas-3
        document.getElementsByName('USTENSIL')[0].placeholder='Ustensiles';
    }
})

//remplissage du tableau des ustensiles
let listOfUstensilsClicked = [] // variable liste des ustensiles cliqués = tableau vide
listingUstensil.forEach(Ustensil => { // pour chaque element du listing Ustensil je lance la fonction Ustensil
    let newElement = document.createElement("p") // variable nouveau element = creation d'un paragraphe
    newElement.classList.add("ustensil") // ajout de la classe Ustensil sur l'element 
    newElement.setAttribute("data-element", Ustensil) // ajout pour chaque element d'un attribut au nom de la fonction ustensil
    newElement.innerText = Ustensil // ajout du texte de chaque ustensil pour chaque element de la fonction

    newElement.addEventListener("click", function (event) { // pour chaque ustensil a l'ecoute au click je lance la fonction anonyme 
        // console.log("On a clické sur l'élément", Ustensil)
        listOfUstensilsClicked.push(Ustensil) // dans le tableau liste des ustensiles cliqués, j'integre l'ustensil cliqué

        // suppresion dans le listing ustensil de l'élément cliqué
        let allUstensilsOnDom = document.getElementsByClassName("ustensil") // variable tous les ustensils du DOM = la paragraphe de chaque Ustensil a la classe Ustensil
        Array.from(allUstensilsOnDom).forEach(function (oneUstensil) { //  pour le tableau venant des ustensils du DOM, pour chaque element je lance la fonction un ustensil
            let oneUstensilAttribute = oneUstensil.getAttribute("data-element") // variable un ustensil attribut = un ustensil avec l'attribut data element
            if (oneUstensilAttribute === Ustensil) { // si un ustensil attribut = un ustensil
                oneUstensil.classList.add("hidden") // j'ajoute la class caché a l'element ustensil attribut
            }
        })
        displayNewUstensil(Ustensil) // appel de la fonction affiche le nouveau ustensil
    })
    UstensilContainer.appendChild(newElement) // j'ajoute le nouvel element dans le container ustensil
})

//selection des elements filtrés
const selectContainerUstensils = document.getElementById("box-select"); // container selection Utsensil = je vais chercher l'id box-select

function displayNewUstensil(newUstensil) { //fonction affiche le nouveau ustensil
    // console.table(listOfUstensilsClicked);
    //creation de la div
    let newDivSelect = document.createElement("div"); // creation de la div tag selection Ustensil
    newDivSelect.setAttribute("id", "box-tag-ustensil-" + newUstensil) // ajout de l'id box-tag-ustensil-" + newUstensil
    newDivSelect.classList.add("box3-select-ustensils", "box3"); // ajout de la class box3-select-ustensils et box3
    selectContainerUstensils.appendChild(newDivSelect); // ajout de la nouvelle div dans le container box select
    //creation du texte
    let newElementSelect = document.createElement("p"); // creation du paragraphe
    newElementSelect.classList.add("box__text"); // ajout de la class box__text
    newElementSelect.innerText = newUstensil; // ajout du texte de l'element selectionné
    newDivSelect.appendChild(newElementSelect); // ajout du paragraphe a la div parent tag selection Ustensil
    //creation de l'icone
    let newIconSelect = document.createElement("i") // creation de l'icone 
    newIconSelect.classList.add("far", "fa-times-circle"); // ajout de la class avec Font Awesome
    newDivSelect.appendChild(newIconSelect); // ajout de l'icone a la div parent tag selection Ustensil
    // fermeture des tags filtrés
    newIconSelect.addEventListener("click", () => { // j'ecoute l'evenement au clic sur l'icone de fermeture
        // console.log("L'ustensil à supprimer est : ", newUstensil);
        document.getElementById("box-tag-ustensil-" + newUstensil).remove(); //suppression de la div de l'id box-tag-ustensil-" + newUstensil
        listOfUstensilsClicked.forEach(function (element, key) { // pour chaque ustensil cliqués je lance la fonction avec pour argument l'element et la clé
            if (element === newUstensil) { // si l'element = le nouveau ustensil
                listOfUstensilsClicked.splice(key, 1); // liste ustensil cliqué retiré avec la clé de valeur 1???
            }
        })
        // ajout dans la liste de l'élément cliqué
        let allUstensilsOnDom = document.getElementsByClassName("ustensil"); // variable tous les ustensils du DOM = la paragraphe de chaque Ustensil a la classe Ustensil
        Array.from(allUstensilsOnDom).forEach(function (oneUstensil) { //pour le tableau venant des ustensils du DOM, pour chaque element je lance la fonction un ustensil
            let oneUstensilAttribute = oneUstensil.getAttribute("data-element"); // variable un ustensil attribut = un ustensil avec l'attribut data element
            if (oneUstensilAttribute === newUstensil) { //si un ustensil attribut = un ustensil
                oneUstensil.classList.remove("hidden");//j'ajoute la class caché a l'element ustensil attribut
            }
        })
    })

}

//Je cherche un ustensile dans le champ de recherche
const inputUstensil = document.getElementById('ustensil-search') // const recherche ustensil = je vais chercher l'id du champ d'ecriture
inputUstensil.addEventListener("change", searchUstensil)

