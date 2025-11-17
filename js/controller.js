import * as model from './models.js';
import recipeView from './view/Recipeview.js';
import searchView from './view/searchView.js';
import resultsView from './view/ResultsView.js';
import paginationView from './view/paginationView.js';

console.log('searchView:', searchView);

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
   // recipeView.renderMessage('La receta fue localizada con éxito! 🎉');

  } catch (err) {
    recipeView.renderError(`Ocurrió un error al obtener la receta: ${err.message}`);
    console.error(err);
  }
}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    // Render de página 1
    resultsView.render(model.getSearchResultsPage(1));

    // Render de botones de paginación
    paginationView.render(model.state.search);

  } catch (err) {
    resultsView.renderError();
    console.error(err);
  }
}


function controlPagination(goToPage) {
  // Renderizar resultados de la nueva página
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Renderizar los botones actualizados
  paginationView.render(model.state.search);
}
function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
