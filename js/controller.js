const icons =new URL('../img/icons.svg', import.meta.url).href; // Para que funcione en parcel
console.log('Icons URL:', icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function showRecipe() {

  try {
  
    const id = window.location.hash.slice(1); // Obtenemos el ID de la URL
    console.log('ID de la receta desde la URL:', id);
    if (!id) return; // Si no hay ID, salimos de la funcion
    renderSpinnner(recipeContainer);// 23d. Llamamos a la funcion para renderizar el spinner de carga
    const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);

    //const resp = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/"${id});
    // Link del inciso h
    //const resp = await fetch(
    //    "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz"
    //   );

    // Convertimos a JSON
    const data = await resp.json();// En este punto se convie la respuesta en json , requiere una cons data 

    console.log("Datos recibidos desde la API:");
    console.log(data);
    console.log('Respuesta:', resp);
    const recipe = data.data.recipe; // Accedemos a la receta dentro de data
    console.log('Receta:', recipe);// Lo mostramos en consola

    // Crear el HTML dinámico con template string
    // const recipeContainer = document.querySelector('.recipe');
    // console.log('Contenido del recipeContainer',recipeContainer);
    const APIRecipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    const markup = `
    <figure class="recipe__fig">
          <img src="${APIRecipe.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${APIRecipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${APIRecipe.cookTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${APIRecipe.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
                  .map(ing => {
                    return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
            </div>
            </li>
            `;
                  }).join('')}
</div>
            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${APIRecipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${APIRecipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
    recipeContainer.innerHTML = "";
    recipeContainer.innerHTML = markup;
    recipeContainer.insertAdjacentHTML("afterbegin", markup);

  } catch (error) {
    console.error("Ocurrió un error al obtener la receta:", error);
  }
}
// Funcion para renderizar el spinener de carga
function renderSpinnner(parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
}
showRecipe();
['hashchange','load'].forEach(ev => window.addEventListener(ev, showRecipe));
// https://forkify-api.herokuapp.com/v2
