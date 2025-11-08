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
    const resp = await fetch(
    "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
  );
// Link del inciso h
//const resp = await fetch(
//    "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzz"
 //   );
 
    // Convertimos a JSON
    const data = await resp.json();// En este punto se convie la respuesta en json , requiere una cons data 

    console.log("Datos recibidos desde la API:");
    console.log(data);
     console.log('Respuesta:', resp);
    console.log('Data:', data);
    const recipe = data.data.recipe;
    console.log('Receta:', recipe);
    

  } catch (error) {// Obtener la receta completa
let recipe = data.data.recipe;

// Desestructuración y renombramiento de propiedades
recipe = {
  id: recipe.id,
  title: recipe.title,
  publisher: recipe.publisher,
  sourceUrl: recipe.source_url,
  image: recipe.image_url,
  servings: recipe.servings,
  cookTime: recipe.cooking_time,
  ingredients: recipe.ingredients,
};

// Imprimir en consola la receta limpia:
console.log("RECETA PROCESADA:");
console.log(recipe);

    console.error("Ocurrió un error al obtener la receta:", error);
  

// Crear el HTML dinámico con template string
const Markup = `
  <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="src/img/icons.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="src/img/icons.svg#icon-bookmark-fill"></use>
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
                <use href="./img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ?? ""}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit ?? ""}</span>
                ${ing.description}
              </div>
            </li>
          `;
        })
        .join("")}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="./img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
`;
// Crear el HTML dinámico con template string
const markup = `
  <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="./img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="./img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="./img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="./img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="./img/icons.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="./img/icons.svg#icon-bookmark-fill"></use>
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
                <use href="./img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ?? ""}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit ?? ""}</span>
                ${ing.description}
              </div>
            </li>
          `;
        })
        .join("")}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="./img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
`;

recipeContainer.innerHTML = "";
recipeContainer.insertAdjacentHTML("afterbegin",Markup);

      }
    }
showRecipe();

// https://forkify-api.herokuapp.com/v2
