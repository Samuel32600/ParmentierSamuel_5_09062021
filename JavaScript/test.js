function insertAllIngredients(allIngredients) {
    allIngredients.forEach(oneIngredient => {
        let newOption = document.createElement("option");
        newOption.value = oneIngredient
        newOption.text = oneIngredient
        document.getElementById("ingredients").append(newOption)
    })
}
