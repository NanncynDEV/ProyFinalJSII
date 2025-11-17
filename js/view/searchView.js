// searchView.js
class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
     // console.log('SUBMIT DETECTADO 🚀'); // 👈 prueba
      handler(); // Llamar controlador
    });
  }
}

export default new SearchView();
