const searchBtn = document.getElementById("search-btn")
const drinkList = document.getElementById("drink")
const drinkDetailsContent = document.querySelector(".drink-details-content")
const recipeCloseBtn = document.getElementById("recipe-close-btn")

searchBtn.addEventListener("click", getDrinkList)
drinkList.addEventListener("click", getDrinkRecipe)
recipeCloseBtn.addEventListener("click", () => {
  drinkDetailsContent.parentElement.classList.remove("showRecipe")
})

function getDrinkList () {
  let searchInputText = document.getElementById("search-input").value.trim()
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      let html = ""
      if (data.drinks) {
        data.drinks.forEach(drink => {
          html += `
          <div class = "drink-item" data-id = "${drink.idDrink}">
            <div class = "drink-img">
              <img src = "${drink.strDrinkThumb}" alt = "drink">
            </div>
            <div class = "drink-name">
              <h3>${drink.strDrink}</h3>
              <a href = "#" class = "recipe-btn">Get Recipe</a>
            </div>
          </div>`
        })
        drinkList.classList.remove("notFound")
      }

//ERROR: VM1493:1 Uncaught (in promise) SyntaxError: Unexpected end of JSON input
//at script.js:15:22

      // else {
      //   html = "Sorry, we didn´t find any recipe with this ingredient. Try another."
      //   mealList.classList.add("notFound")
      // }
      //  if (searchInputText === ""){
      //   html = "Please enter an ingredient."
      //   mealList.classList.add("notFound")
      // }
      drinkList.innerHTML = html
    })
  }

function getDrinkRecipe (e) {

  e.preventDefault()
  if (e.target.classList.contains("recipe-btn")) {
    let drinkItem = e.target.parentElement.parentElement
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`)
      .then(res => res.json())
      .then(data => //console.log(data))
      drinkRecipeModal(data.drinks))
  }
}

function drinkRecipeModal (drink) {
  console.log(drink);
  drink = drink[0]
  let html = `
          <h2 class = "recipe-title">${drink.strDrink}</h2>
          <p class = "recipe-category">${drink.strCategory}</p>
          <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${drink.strInstructions}</p>
          </div>
          <div class = "recipe-drink-img">
            <img src = "${drink.strDrinkThumb}" alt = "">
          </div>
  `
  drinkDetailsContent.innerHTML = html
  drinkDetailsContent.parentElement.classList.add("showRecipe")
}