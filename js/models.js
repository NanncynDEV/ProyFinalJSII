//import { API_URL } from './config.js';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';



// Estado Global de la Aplicación
//Aquí se almacenan los datos que se comparten entre módulos
export const state = {
  recipe: {}, // Receta actual
  search: {
    query: '',
    results: [],   // Aquí quedará el arreglo que necesitas (el de tu imagen)
    page: 1,                    // 👈 nueva propiedad
    resultsPerPage: RES_PER_PAGE,   // 👈 nueva propiedad
  },
  bookmarks: [],
};


export async function loadRecipe(id) {
  try {
    //console.log('Cargando receta con ID:', id);

    const data = await getJSON(`${API_URL}${id}`);
    //console.log('Datos recibidos desde la API:', data);

    const { recipe: r } = data.data;

    state.recipe = {
      id: r.id,
      title: r.title,
      publisher: r.publisher,
      sourceUrl: r.source_url,
      image: r.image_url,
      servings: r.servings,
      cookTime: r.cooking_time,
      ingredients: r.ingredients,
    };

    //console.log('Receta cargada:', state.recipe);
  } catch (err) {
  console.log(`${err} 💥💥💥💥`);
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;


    console.log("Buscando recetas con query:", query);

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log("Resultados recibidos:", data);

  
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    console.log("Resultados formateados:", state.search.results);

  } catch (err) {
    throw err;
  }
}

//async function controlSearchResults(query) {
 // try {
   // if (!query) return;
   // await loadSearchResults(query);
   //await loadSearchResults("pizza");
//console.log(state.search.query);    // "pizza"
//console.log(state.search.results);  // array de objetos formateados
 //   recipeView.renderSearchResults(state.search.results);
 // } catch (err) {
 //   console.error(err);
 // }
//}

async function controlSearchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    // ⬇ ⬇ ⬇ AQUÍ
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    resultsView.renderError();
  }
}


export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;
  

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}
//model.getSearchResultsPage(1).length  // → 10
//model.getSearchResultsPage(2).length
