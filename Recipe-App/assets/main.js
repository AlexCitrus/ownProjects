const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetails = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const APP_ID = "94f4353f";
const API_KEY = "ad2fa088bd506f53f655fa82fecd83a2";
const APP_KEY2 = "9496aad1c6a94adb948a7cf17739f89d";
const generateHTML = (results) => {
  let html = ``;
  let html2 = ``;
  results.forEach((results) => {
    let ingredients = results.recipe.ingredientLines;
    html += `
                <div class="meal-item" data-id = "">
              <div class="meal-img">
                <img src="${results.recipe.image}" alt="food" srcset="" />
              </div>
              <div class="meal-name">
                <h3>${results.recipe.label}</h3>
                <a href="${results.recipe.url}" class="recipe-btn" target="_blank">Get Recipe</a>
              </div>
            </div> 
                `;
  });
  mealList.classList.remove("notFound");
  console.log(results);

  mealList.innerHTML = html;
};

recipeCloseBtn.addEventListener("click", () => {
  mealDetails.parentElement.classList.remove("showRecipe");
});

// SEARCH

searchBtn.addEventListener("click", (e) => {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);

  (async () => {
    const res = await fetch(
      `https://api.edamam.com/search?q=${searchInputTxt}&app_id=${APP_ID}&app_key=${API_KEY}`
      // `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInputTxt}`
    );
    const data = await res.json();
    console.log(data);
    generateHTML(data.hits);
    let html = "";
    if (data.count > 0) {
      let results = data.hits;
      results.forEach((results) => {
        let ingredients = results.recipe.ingredientLines;
        html += `
                    <div class="meal-item" data-id = "">
                  <div class="meal-img">
                    <img src="${results.recipe.image}" alt="food" srcset="" />
                  </div>
                  <div class="meal-name">
                    <h3>${results.recipe.label}</h3>
                    <a href="${results.recipe.url}" class="recipe-btn" target="_blank">Get Recipe</a>
                  </div>
                </div> 
                    `;
      });
    } else {
      html = "Sorry, no meals found for your ingredient!";
      mealList.classList.add("notFound");
    }

    mealList.innerHTML = html;
  })();
});

// mealList.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (e.target.classList.contains("recipe-btn")) {

//     // let mealItem = e.target.parentElement.parentElement;
//     // fetch(
//     //   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
//     // )
//     //   .then((res) => res.json())
//     //   .then((data) => mealRecipeModal(data.meals));
//   }
// })
