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
        document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';
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
        document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
    }
})

//remplissage du tableau des ingredients

let listOfIngredientClicked = []
listingIngredient.forEach(Ingredient => {
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
                oneIngredient.classList.add("ingredient-hide")
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
                oneIngredient.classList.remove("ingredient-hide")
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
        document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil';
    }
})

up2.addEventListener("click", function () {
    if (isApplianceDisplayed === false) {
        // console.log("On cache la liste d'éléments")
        ApplianceContainer.classList.add("hidden")
        box2Extended.classList.remove("box-extend")
        up2.classList.add("hidden")
        down2.classList.remove("hidden")
        document.getElementsByName('APPAREIL')[0].placeholder = 'Appareil';
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
                oneAppliance.classList.add("appliance-hide")
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
                oneAppliance.classList.remove("appliance-hide");
            }
        })
    })
    newDivSelect.appendChild(newIconSelect);
}


//--------------------Ustensils--------------------

//extraire les appareils du tableau recette
let allUstensils = getAllUstensilsFromRecipes()
function getAllUstensilsFromRecipes() {
    let allUstensils = []
    recipes.forEach(recipe => {
        // console.table(recipe.name)
        let newUstensilstoAdd = recipe.ustensils
        allUstensils.push(newUstensilstoAdd)
    })
    return allUstensils
}

//supprimer les doublons et deconcaténation
let listingUstensil = removeDuplicateUstensils()
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
listingUstensil = sortByAlphabetAllUstensils()
function sortByAlphabetAllUstensils() {
    return listingUstensil.sort()
}

//faire apparaitre dans la console la liste finale
seeAllUstensils(listingUstensil)
function seeAllUstensils(listingUstensil) {
    // console.log("voici la liste des ustensiles")
    // console.table(listingUstensil)

    //-----affichage de la liste complete des ustensiles
    const UstensilContainer = document.getElementById("box3-ustensils")
    const down3 = document.getElementById("chevron-down-3")
    const up3 = document.getElementById("chevron-up-3")
    const box3Extended = document.getElementById("box3-display-content")
    let isUstensilsDisplayed = false

    // fonction au clic sur le chevron bas
    down3.addEventListener("click", function () {
        if (isUstensilsDisplayed === false) {
            //  console.log("On affiche la liste d'éléments")
            UstensilContainer.classList.remove("hidden")
            box3Extended.classList.add("box-extend")
            up3.classList.remove("hidden")
            down3.classList.add("hidden")
            document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensil';
        }
    })

    // fonction au clic sur le chevron haut
    up3.addEventListener("click", function () {
        if (isUstensilsDisplayed === false) {
            // console.log("On cache la liste d'éléments")
            UstensilContainer.classList.add("hidden")
            box3Extended.classList.remove("box-extend")
            up3.classList.add("hidden")
            down3.classList.remove("hidden")
            document.getElementsByName('USTENSIL')[0].placeholder = 'Ustensiles';
        }
    })

    //-----remplissage du tableau des ustensiles
    let listOfUstensilsClicked = []
    // fonction creation des chaque elements paragraphe de la liste 
    listingUstensil.forEach(Ustensil => {
        let newElement = document.createElement("p")
        newElement.classList.add("ustensil")
        newElement.setAttribute("data-element", Ustensil)
        newElement.innerText = Ustensil

        //fonction ajout de l'ustensil dans le tableau ustensil cliqué
        newElement.addEventListener("click", function (event) {
            // console.log("On a clické sur l'élément", Ustensil)
            listOfUstensilsClicked.push(Ustensil)

            // suppresion dans le listing ustensil de l'élément cliqué
            let allUstensilsOnDom = document.getElementsByClassName("ustensil")
            Array.from(allUstensilsOnDom).forEach(function (oneUstensil) {
                let oneUstensilAttribute = oneUstensil.getAttribute("data-element")
                if (oneUstensilAttribute === Ustensil) {
                    oneUstensil.classList.add("ustensil-hide")
                    oneUstensil.setAttribute("id", "UstnsilSelected-" + Ustensil)
                }
            })
            displayNewUstensil(Ustensil)

            //fermeture en recliquant sur l'element
            // let newElementSelected = document.getElementById("UstnsilSelected-" + Ustensil)
            // newElementSelected.addEventListener("click", function (event) {
            //     document.getElementById("box-tag-ustensil-" + Ustensil).remove();
            //     newElement.classList.remove("ustensil-hide");                
            // })
        })

        UstensilContainer.appendChild(newElement)
    })


    //selection des elements filtrés + creation du tag
    const selectContainerUstensils = document.getElementById("box-select");

    function displayNewUstensil(newUstensil) {
        // console.table(listOfUstensilsClicked);

        //creation de la div
        let newDivSelect = document.createElement("div");
        newDivSelect.setAttribute("id", "box-tag-ustensil-" + newUstensil);
        newDivSelect.classList.add("box3-select-ustensils", "box3");
        selectContainerUstensils.appendChild(newDivSelect);

        //creation du texte
        let newElementSelect = document.createElement("p");
        newElementSelect.classList.add("box__text");
        newElementSelect.innerText = newUstensil;
        newDivSelect.appendChild(newElementSelect);

        //creation de l'icone
        let newIconSelect = document.createElement("i")
        newIconSelect.classList.add("far", "fa-times-circle");
        newDivSelect.appendChild(newIconSelect);

        // fermeture des tags filtrés
        newIconSelect.addEventListener("click", () => {
            // console.log("L'ustensil à supprimer est : ", newUstensil);
            document.getElementById("box-tag-ustensil-" + newUstensil).remove();

            listOfUstensilsClicked.forEach(function (element, key) {
                if (element === newUstensil) {
                    listOfUstensilsClicked.splice(key, 1);
                }
            })

            // remettre dans le listing Ustensil l'élément cliqué
            let allUstensilsOnDom = document.getElementsByClassName("ustensil");
            Array.from(allUstensilsOnDom).forEach(function (oneUstensil) {
                let oneUstensilAttribute = oneUstensil.getAttribute("data-element");
                if (oneUstensilAttribute === newUstensil) {
                    oneUstensil.classList.remove("ustensil-hide");
                }
            })
        })
    }
}

    // .normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    //Je cherche un ustensile dans le champ de recherche
    const inputUstensil = document.getElementById('ustensil-search');
    // inputUstensil.addEventListener("input", searchUstensil);

    // function searchUstensil() {
    //     for(var i =0; i<listingUstensil.length; i++)
    //     if (!listingUstensil[i].includes(inputUstensil.value)){
    //         listingUstensil.splice(listingUstensil[i])
    //         console.log("ok")
    //     }
        
    // }
