const searchBtn = document.getElementById("search-btn")
const drinkList = document.getElementById("drink")
const drinkDetailsContent = document.querySelector(".drink-details-content")
const recipeCloseBtn = document.getElementById("recipe-close-btn")
const notFounded = document.getElementById("not-found")

searchBtn.addEventListener("click", getDrinkList)
drinkList.addEventListener("click", getDrinkRecipe)
recipeCloseBtn.addEventListener("click", () => {
  drinkDetailsContent.parentElement.classList.remove("showRecipe")
})

function getDrinkList () {
  let searchInputText = document.getElementById("search-input").value.trim()

  if (searchInputText === "") {
    drinkList.innerHTML = ""
    notFounded.innerHTML = "<p>Please, enter an ingredient.</p>"
    notFounded.classList.add("notFound")
    return
  }

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(res => res.json())
    .then(data => {
      
      let html = ""

      if (data.drinks) {
        notFounded.innerHTML = ""
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

        document.body.style.backgroundColor = "#0B0B17"
        document.body.style.backgroundImage = "none"
      }

      drinkList.innerHTML = html

    })
    .catch(error => {
      drinkList.innerHTML = ""
      console.error('Error:', error);
      notFounded.innerHTML = "<p>Sorry, ingredient not found. Try another.</p>";
    notFounded.classList.add("notFound");
    });
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