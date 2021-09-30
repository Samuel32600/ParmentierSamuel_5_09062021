let allRecipesOfObject = [];
let allRecipesFounded = [];
let threeFilters = []
let totalFilters = 0;


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
    // console.table(allRecipesOfObject)
    allRecipesFounded = allRecipesOfObject
}

//*****************************************
// recuperation des elements des 3 filtres
//*****************************************
function createFilters() {

    let listingIngredient = [];
    let listingAppliance = [];
    let listingUstensil = [];

    allRecipesOfObject.forEach((oneOfRecipe) => {

        //tableau ingredient
        oneOfRecipe.ingredients.forEach((oneOfIngredient) => {
            if (listingIngredient.includes(oneOfIngredient.name) === false) {
                listingIngredient.push(oneOfIngredient.name)
                listingIngredient.sort()
            }
        })

        //tableau appliance
        oneOfRecipe.appliances.forEach((oneOfAppliance) => {
            if (listingAppliance.includes(oneOfAppliance.name) === false) {
                listingAppliance.push(oneOfAppliance.name)
                listingAppliance.sort()
            }
        })

        // //tableau ustensil
        oneOfRecipe.ustensils.forEach((oneOfUstensil) => {
            if (listingUstensil.includes(oneOfUstensil.name) === false) {
                listingUstensil.push(oneOfUstensil.name)
                listingUstensil.sort()
            }
        })

    })
    // console.table(listingIngredient)
    // console.table(listingAppliance)
    // console.table(listingUstensil)
    threeFilters = [listingIngredient, listingAppliance, listingUstensil]

    seeFilters()
}

//************************************
// affichage des elements des filtres
//************************************
function seeFilters() {

    let configFilter = [
        "box1-ingredients",
        "box2-appliance",
        "box3-ustensils"
    ]

    configFilter.forEach((containerName, index) => {
        let containerFilter = document.getElementById(containerName)
        containerFilter.innerHTML = ""

        threeFilters[index].forEach((oneOfElement) => {
            let newElement = document.createElement("p");
            newElement.classList.add("element");
            newElement.innerText = oneOfElement;
            containerFilter.appendChild(newElement);
        })
    })

    // const IngredientContainer = document.getElementById("box1-ingredients")
    // threeFilters[0].forEach((oneOfIngredient) => {
    //     let newElement = document.createElement("p");
    //     newElement.classList.add("ingredient");
    //     // newElement.setAttribute("data-element", Ingredient);
    //     newElement.innerText = oneOfIngredient;
    //     IngredientContainer.appendChild(newElement);
    // })

    // const ApplianceContainer = document.getElementById("box2-appliance")
    // threeFilters[1].forEach((oneOfAppliance) => {
    //     let newElement = document.createElement("p");
    //     newElement.classList.add("appliance");
    //     // newElement.setAttribute("data-element", Appliance);
    //     newElement.innerText = oneOfAppliance;
    //     ApplianceContainer.appendChild(newElement);
    // })

    // const UstensilContainer = document.getElementById("box3-ustensils");
    // threeFilters[2].forEach((oneOfUstensil) => {
    //     let newElement = document.createElement("p");
    //     newElement.classList.add("ustensil");
    //     // newElement.setAttribute("data-element", Ustensil);
    //     newElement.innerText = oneOfUstensil;
    //     UstensilContainer.appendChild(newElement);
    // })

}

//********************************
// action sur chevron haut ou bas
//********************************
function showHideListingFilter() {
    //ingredient
    const IngredientContainer = document.getElementById("box1-ingredients");
    const box1Extended = document.getElementById("box1-display-content");
    const down1 = document.getElementById("chevron-down-1");
    const up1 = document.getElementById("chevron-up-1");
    down1.addEventListener("click", downIngredient);
    up1.addEventListener("click", upIngredient);

    function downIngredient() {
        IngredientContainer.classList.remove("hidden");
        box1Extended.classList.add("box-extend");
        up1.classList.remove("hidden");
        down1.classList.add("hidden");
        document.getElementsByName('INGREDIENT')[0].placeholder = 'Recherche un ingrédient';
    }

    function upIngredient() {
        IngredientContainer.classList.add("hidden");
        box1Extended.classList.remove("box-extend");
        up1.classList.add("hidden");
        down1.classList.remove("hidden");
        document.getElementsByName('INGREDIENT')[0].placeholder = 'Ingredients';
    }

    //appareil
    const ApplianceContainer = document.getElementById("box2-appliance");
    const box2Extended = document.getElementById("box2-display-content");
    const down2 = document.getElementById("chevron-down-2");
    const up2 = document.getElementById("chevron-up-2");
    down2.addEventListener("click", downAppliance);
    up2.addEventListener("click", upAppliance);

    function downAppliance() {
        ApplianceContainer.classList.remove("hidden");
        box2Extended.classList.add("box-extend");
        up2.classList.remove("hidden");
        down2.classList.add("hidden");
        document.getElementsByName('APPAREIL')[0].placeholder = 'Recherche un appareil';
    }

    function upAppliance() {
        ApplianceContainer.classList.add("hidden");
        box2Extended.classList.remove("box-extend");
        up2.classList.add("hidden");
        down2.classList.remove("hidden");
        document.getElementsByName('APPAREIL')[0].placeholder = 'Appareil';
    }

    //ustensil
    const UstensilContainer = document.getElementById("box3-ustensils");
    const box3Extended = document.getElementById("box3-display-content");
    const down3 = document.getElementById("chevron-down-3");
    const up3 = document.getElementById("chevron-up-3");
    down3.addEventListener("click", downUstensil);
    up3.addEventListener("click", upUstensil);

    function downUstensil() {
        UstensilContainer.classList.remove("hidden");
        box3Extended.classList.add("box-extend");
        up3.classList.remove("hidden");
        down3.classList.add("hidden");
        document.getElementsByName('USTENSIL')[0].placeholder = 'Recherche un ustensile';
    }

    function upUstensil() {
        UstensilContainer.classList.add("hidden");
        box3Extended.classList.remove("box-extend");
        up3.classList.add("hidden");
        down3.classList.remove("hidden");
        document.getElementsByName('USTENSIL')[0].placeholder = 'Ustensiles';
    }

}

createAllRecipes()
createFilters()
showHideListingFilter()