//creation de la classe principale Recipe
class Recipe {
    constructor(name, time, description) {
        this.name = name
        this.time = time
        this.description = description
        this.ingredients = []
        this.appliances = []
        this.ustensils = []
        this.isSelected = 0;
    }

    //ajout des ingredients     
    _addIngredient(IngredientAdded) {
        this.ingredients.push(IngredientAdded)
    }
    
    //ajout des appareils
    _addAppliance(ApplianceAdded) {
        this.appliances.push(ApplianceAdded)
    }    

    //ajout des ustensils
    _addUstensil(UstensilAdded) {
        this.ustensils.push(UstensilAdded)
    }
}


//creation de la sous classe Ingredient
class Ingredient {
    constructor(name, quantity, unit) {
        this.name = name;
        this.quantity = this._validFormatQuantity(quantity);
        this.unit = this._validFormatUnit(unit);
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


//creation de la sous classe Appliance
class Appliance {
    constructor(name) {
        this.name = name;
    }
}


//creation de la sous classe ustensil
class Ustensil {
    constructor(name) {
        this.name = name;
    }
}