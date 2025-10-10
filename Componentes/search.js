// Componente de Busca Reutilizável
export class SearchComponent {
  constructor(containerId, placeholder = "Buscar...") {
    this.container = document.getElementById(containerId);
    this.placeholder = placeholder;
    this.searchValue = '';
    this.onSearchCallback = null;
    
    this.init();
  }

  init() {
    if (!this.container) {
      console.error(`Container com ID '${this.containerId}' não encontrado`);
      return;
    }

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="relative w-full max-w-4xl mx-auto">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input 
          type="text" 
          id="search-input-component" 
          placeholder="${this.placeholder}" 
          class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-esp-green focus:border-esp-green text-gray-700 placeholder-gray-500"
          value="${this.searchValue}"
        >
        <div id="search-results" class="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <!-- Resultados aparecerão aqui -->
        </div>
      </div>
    `;

    this.searchInput = this.container.querySelector('#search-input-component');
    this.resultsContainer = this.container.querySelector('#search-results');
  }

  bindEvents() {
    if (this.searchInput) {
      // Busca em tempo real
      this.searchInput.addEventListener('input', (e) => {
        this.searchValue = e.target.value;
        this.handleSearch();
      });

      // Fechar resultados ao clicar fora
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target)) {
          this.hideResults();
        }
      });

      // Mostrar resultados ao focar
      this.searchInput.addEventListener('focus', () => {
        if (this.searchValue.trim()) {
          this.handleSearch();
        }
      });
    }
  }

  handleSearch() {
    const query = this.searchValue.trim();
    
    if (query.length === 0) {
      this.hideResults();
      if (this.onSearchCallback) {
        this.onSearchCallback('', []);
      }
      return;
    }

    if (query.length < 2) {
      this.showResults([]);
      return;
    }

    // Chama o callback com a query
    if (this.onSearchCallback) {
      this.onSearchCallback(query, []);
    }
  }

  // Método para definir callback de busca
  onSearch(callback) {
    this.onSearchCallback = callback;
  }

  // Método para mostrar resultados
  showResults(results) {
    if (!this.resultsContainer) return;

    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="p-4 text-gray-500 text-center">
          <span>Nenhum resultado encontrado</span>
        </div>
      `;
    } else {
      this.resultsContainer.innerHTML = results.map(result => `
        <div class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" data-course-id="${result.id}">
          <div class="flex items-start space-x-3">
            <span class="text-2xl">${result.icon || '📚'}</span>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 truncate">${result.title}</h4>
              <p class="text-xs text-gray-500 mt-1 line-clamp-2">${result.description}</p>
              <div class="flex items-center mt-2 space-x-4">
                <span class="text-xs text-esp-green font-medium">${result.type || result.category}</span>
                <span class="text-xs text-gray-400">${result.duration}</span>
                ${result.location ? `<span class="text-xs text-gray-400">${result.location}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Bind click eventos nos resultados
      this.resultsContainer.querySelectorAll('[data-course-id]').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const courseId = item.getAttribute('data-course-id');
          this.handleResultClick(courseId);
        });
      });
    }

    this.resultsContainer.classList.remove('hidden');
  }

  // Handler para clique em resultado
  handleResultClick(courseId) {
    // Este método pode ser sobrescrito ou usado via callback
    console.log('Resultado clicado:', courseId);
    this.hideResults();
  }

  // Esconder resultados
  hideResults() {
    if (this.resultsContainer) {
      this.resultsContainer.classList.add('hidden');
    }
  }

  // Método para definir valor da busca
  setValue(value) {
    this.searchValue = value;
    if (this.searchInput) {
      this.searchInput.value = value;
    }
  }

  // Método para obter valor atual
  getValue() {
    return this.searchValue;
  }

  // Método para limpar busca
  clear() {
    this.setValue('');
    this.hideResults();
    if (this.onSearchCallback) {
      this.onSearchCallback('', []);
    }
  }

  // Método para focar no input
  focus() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }
}