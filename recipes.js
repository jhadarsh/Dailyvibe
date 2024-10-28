const appId = "33a3f731";

const appKey = "a589fd2158b5d422643ae2722cfa2951";

async function searchRecipe() {
  const ingredient = document.getElementById("searchInput").value;
  if (!ingredient) {
    alert("Please enter an ingredient!");
    return;
  }

  const url = `https://api.edamam.com/search?q=${encodeURIComponent(
    ingredient
  )}&app_id=${appId}&app_key=${appKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length > 0) {
      displayRecipes(data.hits);
    } else {
      document.getElementById(
        "recipeResults"
      ).innerHTML = `<p>No recipes found!</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById(
      "recipeResults"
    ).innerHTML = `<p>Could not fetch data. Please try again.</p>`;
  }
}

function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipeResults");
  resultsContainer.innerHTML = recipes
    .map(
      (recipe) => `
        <div class="recipe">
            <img src="${recipe.recipe.image}" alt="Recipe Image">
            <h2>${recipe.recipe.label}</h2>
            <p><strong>Calories:</strong> ${Math.round(
              recipe.recipe.calories
            )}</p>
            <p><strong>Source:</strong> ${recipe.recipe.source}</p>
            <a href="${recipe.recipe.url}" target="_blank">View Full Recipe</a>
        </div>
    `
    )
    .join("");
}
