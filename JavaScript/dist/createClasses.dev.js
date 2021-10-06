"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//creation de la classe principale Recipe
var Recipe =
/*#__PURE__*/
function () {
  function Recipe(name, time, description) {
    _classCallCheck(this, Recipe);

    this.name = name;
    this.time = time;
    this.description = description;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.isSelected = 0;
    this.hasInput = false;
  } //ajout des ingredients     


  _createClass(Recipe, [{
    key: "_addIngredient",
    value: function _addIngredient(IngredientAdded) {
      this.ingredients.push(IngredientAdded);
    } //ajout des appareils

  }, {
    key: "_addAppliance",
    value: function _addAppliance(ApplianceAdded) {
      this.appliances.push(ApplianceAdded);
    } //ajout des ustensils

  }, {
    key: "_addUstensil",
    value: function _addUstensil(UstensilAdded) {
      this.ustensils.push(UstensilAdded);
    }
  }]);

  return Recipe;
}(); //creation de la sous classe Ingredient


var Ingredient =
/*#__PURE__*/
function () {
  function Ingredient(name, quantity, unit) {
    _classCallCheck(this, Ingredient);

    this.name = name;
    this.quantity = this._validFormatQuantity(quantity);
    this.unit = this._validFormatUnit(unit);

    this._validFormatUnit();
  } //mettre la valeur de quantity en forme


  _createClass(Ingredient, [{
    key: "_validFormatQuantity",
    value: function _validFormatQuantity(number) {
      if (typeof number === "undefined") {
        return number = "";
      } else {
        return number;
      }
    } //adapté la valeur de l'unité

  }, {
    key: "_validFormatUnit",
    value: function _validFormatUnit(number) {
      var mesure = this._validFormatQuantity(number);

      if (mesure.length > 2) {
        return mesure.substring(9, 0);
      } else {
        return mesure;
      }
    }
  }]);

  return Ingredient;
}(); //creation de la sous classe Appliance


var Appliance = function Appliance(name) {
  _classCallCheck(this, Appliance);

  this.name = name;
}; //creation de la sous classe ustensil


var Ustensil = function Ustensil(name) {
  _classCallCheck(this, Ustensil);

  this.name = name;
};