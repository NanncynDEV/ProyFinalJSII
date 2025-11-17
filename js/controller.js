import * as model from './models.js';
import recipeView from './view/Recipeview.js';
import searchView from './view/searchView.js';
import resultsView from './view/ResultsView.js';
console.log('searchView:', searchView);

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    recipeView.renderMessage('La receta fue localizada con éxito! 🎉');

  } catch (err) {
    recipeView.renderError(`Ocurrió un error al obtener la receta: ${err.message}`);
    console.error(err);
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    // 1️⃣ Mostrar spinner en área de resultados
    resultsView.renderSpinner();

    // 2️⃣ Cargar resultados desde la API
    await model.loadSearchResults(query);

    // 3️⃣ Renderizar resultados en pantalla
    resultsView.render(model.state.search.results);

  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();