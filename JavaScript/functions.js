//***************************
// recuperation des recettes
//***************************
function createAllRecipes() {
    //extraire les elements de chaque recette (le nom, le temps et la description)
    recipes.forEach((oneOfRecipe) => {
        let newRecipe = new Recipe(oneOfRecipe.name, oneOfRecipe.time, oneOfRecipe.description)

        //extraire les ingredients de recipes + sous tableaux ingredients
        oneOfRecipe.ingredients.forEach((oneOfIngredient) => {
            let newIngredient = new Ingredient(oneOfIngredient.ingredient, oneOfIngredient.quantity, oneOfIngredient.unit)
            //fonction pour rajouter les ingredients dans la classe principale Recipe
            newRecipe._addIngredient(newIngredient)
        })

        //extraire les appareils de recipes    
        let newAppliance = new Appliance(oneOfRecipe.appliance)
        //fonction pour rajouter les appareils dans la classe principale Recipe
        newRecipe._addAppliance(newAppliance)

        //extraire les ustensiles de recipes
        oneOfRecipe.ustensils.forEach((oneOfUstensil) => {
            let newUstensil = new Ustensil(oneOfUstensil)
            //fonction pour rajouter les ustensiles dans la classe principale Recipe
            newRecipe._addUstensil(newUstensil)
        })

        allRecipesOfObject.push(newRecipe)
    })
}

//*****************************************
// recuperation des elements des 3 filtres
//*****************************************
function createFilters() {

    let listingIngredient = [];
    let listingAppliance = [];
    let listingUstensil = [];

    allRecipesOfObject.forEach((oneOfRecipe) => {
        if (oneOfRecipe.isSelected === totalFilters) {
            if ((oneOfRecipe.hasInput === true && inputType === true) || (inputType === false)) {
                //tableau ingredient
                oneOfRecipe.ingredients.forEach((oneOfIngredient) => {
                    if (listingIngredient.includes(oneOfIngredient.name) === false) {
                        listingIngredient.push(oneOfIngredient.name)
                    }
                })
                listingIngredient.sort()

                //tableau appliance
                oneOfRecipe.appliances.forEach((oneOfAppliance) => {
                    if (listingAppliance.includes(oneOfAppliance.name) === false) {
                        listingAppliance.push(oneOfAppliance.name)
                    }
                })
                listingAppliance.sort()

                // //tableau ustensil
                oneOfRecipe.ustensils.forEach((oneOfUstensil) => {
                    if (listingUstensil.includes(oneOfUstensil.name) === false) {
                        listingUstensil.push(oneOfUstensil.name)
                    }
                })
                listingUstensil.sort()
            }
        }
    })
    threeFilters = [listingIngredient, listingAppliance, listingUstensil]

    seeFilters()
    displayError()

}

//************************************
// affichage des elements des filtres
//************************************
function seeFilters(specialFilter = false) {

    let filtersUsed = threeFilters;

    if (specialFilter !== false) {
        filtersUsed = specialFilter
    }

    let configFilter = [
        "box1-ingredients",
        "box2-appliance",
        "box3-ustensils"
    ]

    configFilter.forEach((containerName, index) => {
        let containerFilter = document.getElementById(containerName)
        containerFilter.innerHTML = ""

        filtersUsed[index].forEach((oneOfElement) => {
            let newElement = document.createElement("p");
            newElement.classList.add("element");
            newElement.innerText = oneOfElement;
            containerFilter.appendChild(newElement);

            //verification si l'element est deja dans le tableau des elements selectionnés
            if ((elementSelectededinFilter).includes(oneOfElement) === false) {

                newElement.addEventListener("click", function () {
                    elementSelectededinFilter.push(oneOfElement)
                    // console.log("voici l'ensemble des elements selectionnés", elementSelectededinFilter)
                    addOneFilter(oneOfElement, index)
                })
            } else {
                newElement.classList.add("element-hide")
            }
        })
    })
}

//************************************
// recherche dans l'input des filtres
//************************************
function searchInFilters() {

    //recherche d'ingredient
    const inputIngredient = document.getElementById("ingredient-search");
    inputIngredient.addEventListener("input", function () {
        let inputType = this.value;
        let temporaryArray = [];
        if (inputType.length > -1) {
            threeFilters[0].forEach(function (oneOfElement) {
                if (oneOfElement.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputType.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    temporaryArray.push(oneOfElement)
                }
            })
        } else {
            seeFilters()
        }
        seeFilters([temporaryArray, threeFilters[1], threeFilters[2]])
    })

    //recherche d'appareil
    const inputAppliance = document.getElementById("appliance-search");
    inputAppliance.addEventListener("input", function () {
        let inputType = this.value;
        let temporaryArray = [];
        if (inputType.length > -1) {
            threeFilters[1].forEach(function (oneOfElement) {
                if (oneOfElement.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputType.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    temporaryArray.push(oneOfElement)
                }
            })
        } else {
            seeFilters()
        }
        seeFilters([threeFilters[0], temporaryArray, threeFilters[2]])
    })

    //recherche d'ustensil
    const inputUstensil = document.getElementById("ustensil-search");
    inputUstensil.addEventListener("input", function () {
        let inputType = this.value;
        let temporaryArray = [];
        if (inputType.length > -1) {
            threeFilters[2].forEach(function (oneOfElement) {
                if (oneOfElement.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputType.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    temporaryArray.push(oneOfElement)
                }
            })
        } else {
            seeFilters()
        }
        seeFilters([threeFilters[0], threeFilters[1], temporaryArray])
    })
}

//******************************************************
// action suite a la selection d'un element des filtres
//******************************************************
function addOneFilter(elementSelected, categoryOfElement) {
    totalFilters += 1
    // console.log(categoryOfElement)

    let category = [
        "ingredients",
        "appliances",
        "ustensils",
    ]

    // console.log("on a cliqué sur", elementSelected, "et c'est un element de type", category[categoryOfElement])

    //boucle sur l'ensemble des recettes disponibles
    allRecipesOfObject.forEach(function (oneOfRecipe) {

        //recette apres selection d'un ingredient
        if (category[categoryOfElement] === "ingredients") {
            oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
                if (elementSelected === oneOfIngredient.name) {
                    oneOfRecipe.isSelected += 1
                }
            })
        }

        //recette apres selection d'un appareil
        if (category[categoryOfElement] === "appliances") {
            oneOfRecipe.appliances.forEach(function (oneOfAppliance) {
                if (elementSelected === oneOfAppliance.name) {
                    oneOfRecipe.isSelected += 1
                }
            })
        }

        //recette apres selection d'un ustensil
        if (category[categoryOfElement] === "ustensils") {
            oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
                if (elementSelected === oneOfUstensil.name) {
                    oneOfRecipe.isSelected += 1
                }
            })
        }
    })

    createTag(elementSelected, categoryOfElement)
    getValidRecipeV2()

}

//*************************************************
// creation d'un tag + ecoute pour refermer le tag
//*************************************************
function createTag(elementSelected, color) {

    let colorTag = [
        "box1",
        "box2",
        "box3"
    ]

    const selectContainer = document.getElementById("box-select")
    //creation de la div
    let newDivSelect = document.createElement("div");
    newDivSelect.setAttribute("id", "box-tag-" + elementSelected);
    newDivSelect.classList.add("box-newTag", colorTag[color]);
    selectContainer.appendChild(newDivSelect);
    //creation du texte
    let newElementSelect = document.createElement("p");
    let textTag = elementSelected
    newElementSelect.classList.add("box__text");
    newElementSelect.innerText = textTag;
    newDivSelect.appendChild(newElementSelect);
    //creation de l'icone
    let newIconSelect = document.createElement("i");
    newIconSelect.classList.add("far", "fa-times-circle");
    newDivSelect.appendChild(newIconSelect);

    //suppression du tag suite a la selection de la croix
    let tagRemove = document.getElementById("box-tag-" + elementSelected)
    tagRemove.addEventListener("click", function () {
        // console.log("je veux fermer la div" + elementSelected)
        tagRemove.remove()
        elementSelectededinFilter.forEach(function (element, index) {
            if (element === elementSelected) {
                elementSelectededinFilter.splice(index, 1)
            }
        })
        removeOneFilter(elementSelected, color)
    })
}

//********************************************************
// action suite a la déselection d'un element des filtres
//********************************************************
function removeOneFilter(elementSelected, categoryOfElement) {
    totalFilters -= 1

    let category = [
        "ingredients",
        "appliances",
        "ustensils",
    ]

    // console.log("on a déselctionné", elementSelected, "et c'est un element de type", category[categoryOfElement])

    allRecipesOfObject.forEach(function (oneOfRecipe) {

        //recette apres deselection d'un ingredient
        if (category[categoryOfElement] === "ingredients") {
            oneOfRecipe.ingredients.forEach(function (oneOfIngredient) {
                if (elementSelected === oneOfIngredient.name) {
                    oneOfRecipe.isSelected -= 1
                }
            })
        }

        //recette apres deselection d'un appareil
        if (category[categoryOfElement] === "appliances") {
            oneOfRecipe.appliances.forEach(function (oneOfAppliance) {
                if (elementSelected === oneOfAppliance.name) {
                    oneOfRecipe.isSelected -= 1
                }
            })
        }

        //recette apres deselection d'un ustensil
        if (category[categoryOfElement] === "ustensils") {
            oneOfRecipe.ustensils.forEach(function (oneOfUstensil) {
                if (elementSelected === oneOfUstensil.name) {
                    oneOfRecipe.isSelected -= 1
                }
            })
        }
    })
    getValidRecipeV2()
}

//*****************************************
// affichage des recettes valide version 2
//*****************************************
function getValidRecipeV2(input = false) {
    recipesFound = false
    let operationCount = 0

    allRecipesOfObject.forEach((oneOfRecipe) => {

        let inputFound = false
        operationCount ++


                // nom des recettes
                if (oneOfRecipe.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    inputFound = true
                }

                // description des recettes
                if (oneOfRecipe.description.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                    inputFound = true
                }

                // ingredients des recettes
                oneOfRecipe.ingredients.forEach(function (ingr) {
                    if (ingr.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
                        inputFound = true
                    }
                })

                oneOfRecipe.hasInput = inputFound
            
    })
    allRecipesOfObject.forEach((oneOfRecipe) => {
        operationCount ++

        if (oneOfRecipe.isSelected !== totalFilters) {
                oneOfRecipe.hasInput = false
        }
    })
    console.log("Voici le nombre d'opérations : ", operationCount)

    card()
    createFilters()
}

//******************************
// creation d'une carte recette
//******************************
function card() {
    const mainRecipes = document.getElementById("allRecipes")
    mainRecipes.innerText = ""
    allRecipesOfObject.forEach(function (recipe) {
        if (recipe.isSelected === totalFilters) {
            if ((recipe.hasInput === true && inputType === true) || (inputType === false)) {
                recipesFound = true
                let CardRecipe = "";
                CardRecipe += `
                <figure class="result-recipe">
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
        }
    })
}

//************************************
// recherche dans la barre principale
//************************************
function principalSearch() {
    const mainSearch = document.getElementById("main-search")

    mainSearch.addEventListener("input", function () {

        if (mainSearch.value.length > 2) {
            inputType = true
            getValidRecipeV2(mainSearch.value)
        }


        else {
            document.querySelectorAll('.result-recipe').forEach((showCards) => showCards.remove())
            inputType = false
            resetInput()
            if (totalFilters > 0) {
                getValidRecipeV2()
            }
            else {
                createFilters()
            }

        }
    })
}

//**********************************************
// action suite au reset de la barre principale
//**********************************************
function resetInput() {
    allRecipesOfObject.forEach(function (oneOfRecipe) {
        oneOfRecipe.hasInput = false
    })
}

//******************************************
// message si aucune recette n'est trouvée
//******************************************
function displayError() {
    const errorMessage = document.getElementById('no-recipe')
    if (totalFilters > 0 || inputType === true) {
        if (recipesFound === false) {
            errorMessage.classList.remove("hidden")
        }
        else {
            errorMessage.classList.add("hidden")
        }

    }
    else {
        errorMessage.classList.add("hidden")
    }

}

//*********************************
//action chevron filtre Ingredient
//*********************************
function downIng() {
    IngredientContainer.classList.remove("hidden");
    box1Extended.classList.add("box-extend");
    up1.classList.remove("hidden");
    down1.classList.add("hidden");
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';
    upApp()
    upUst()
}

function upIng() {
    IngredientContainer.classList.add("hidden");
    box1Extended.classList.remove("box-extend");
    up1.classList.add("hidden");
    down1.classList.remove("hidden");
    document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
}

//********************************
//action chevron filtre appareil
//********************************
function downApp() {
    ApplianceContainer.classList.remove("hidden");
    box2Extended.classList.add("box-extend");
    up2.classList.remove("hidden");
    down2.classList.add("hidden");
    document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil';
    upIng()
    upUst()
}

function upApp(){
    ApplianceContainer.classList.add("hidden");
    box2Extended.classList.remove("box-extend");
    up2.classList.add("hidden");
    down2.classList.remove("hidden");
    document.getElementsByName('APPAREIL')[0].placeholder = 'Appareil';
}

//*******************************
//action chevron filtre ustensil
//*******************************
function downUst() {
    UstensilContainer.classList.remove("hidden");
    box3Extended.classList.add("box-extend");
    up3.classList.remove("hidden");
    down3.classList.add("hidden");
    document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensile';
    upIng()
    upApp()
}

function upUst() {
    UstensilContainer.classList.add("hidden");
    box3Extended.classList.remove("box-extend");
    up3.classList.add("hidden");
    down3.classList.remove("hidden");
    document.getElementsByName('USTENSIL')[0].placeholder = 'Ustensiles';
}


