import { SearchComponent } from '../../Componentes/search.js';

export class CourseView {
  constructor() {
    this.courseListContainer = document.getElementById('course-list');
    this.categoryFilter = document.getElementById('category-filter');
    
    // Inicializar componente de busca
    this.searchComponent = new SearchComponent('search-component-container', 'Buscar cursos por nome, categoria ou tipo...');
    
    // Debug: verificar se os elementos existem
    console.log('course-list element:', this.courseListContainer);
    console.log('category-filter element:', this.categoryFilter);
    console.log('search component:', this.searchComponent);
  }

  // Renderiza a lista de cursos no DOM
  renderCourses(courses) {
    console.log('Renderizando cursos:', courses); // Debug
    
    if (!this.courseListContainer) {
      console.error('Elemento course-list não encontrado!');
      return;
    }
    
    this.courseListContainer.innerHTML = ''; // Limpa a lista antes de renderizar

    if (courses.length === 0) {
      this.courseListContainer.innerHTML = '<p class="text-center text-gray-500">Nenhum curso encontrado.</p>';
      return;
    }

    courses.forEach(course => {
      console.log('Criando card para:', course); // Debug
      const courseCard = this.createCourseCard(course);
      this.courseListContainer.appendChild(courseCard);
    });
  }

  // Cria o elemento HTML para um card de curso
  createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow';
    
    // Mapeamento de categorias para ícones
    const categoryIcons = {
      'Emergência': '🚑',
      'Saúde Pública': '📊', 
      'Biossegurança': '🛡️',
      'Enfermagem': '💊',
      'Medicina': '⚕️',
      'Fisioterapia': '🏃‍♂️',
      'Psicologia': '🧠',
      'Odontologia': '🦷',
      'Farmácia': '💉',
      'Nutrição': '🥗',
      'default': '📚'
    };

    // Mapeamento de tipos para títulos e descrições
    const typeMapping = {
      'Básico': {
        title: 'Básico',
        description: 'Cursos introdutórios para desenvolvimento de competências fundamentais em saúde',
        icon: '📖'
      },
      'Aperfeiçoamento': {
        title: 'Aperfeiçoamento', 
        description: 'Cursos para aprimoramento de conhecimentos e habilidades específicas',
        icon: '📈'
      },
      'Especialização': {
        title: 'Especialização',
        description: 'Cursos de pós-graduação lato sensu para aprofundamento em áreas específicas', 
        icon: '🎓'
      },
      'Atualização': {
        title: 'Atualização',
        description: 'Cursos para atualização em novas tecnologias e práticas em saúde',
        icon: '🔄'
      },
      'Residência': {
        title: 'Residências Saúde',
        description: 'Programas de residência multiprofissional e médica em saúde',
        icon: '💚'
      },
      'Técnico': {
        title: 'Técnico',
        description: 'Cursos técnicos para formação de profissionais de nível médio',
        icon: '🔧'
      },
      'Treinamento': {
        title: 'Treinamentos de Habilidades',
        description: 'Treinamentos práticos para desenvolvimento de habilidades específicas',
        icon: '👥'
      },
      'Simulação': {
        title: 'Centro de Simulação em Saúde',
        description: 'Cursos práticos com simulação realística para profissionais de saúde',
        icon: '🏆'
      }
    };

    const typeInfo = typeMapping[course.type] || typeMapping['Básico'];
    const icon = categoryIcons[course.category] || categoryIcons['default'];
    
    card.innerHTML = `
      <div class="text-center">
        <div class="text-4xl mb-4 text-green-600">${typeInfo.icon}</div>
        <h3 class="text-xl font-bold mb-3 text-gray-800">${typeInfo.title}</h3>
        <p class="text-sm text-gray-600 mb-4 leading-relaxed">${typeInfo.description}</p>
        
        <div class="flex items-center justify-center mb-2 text-sm text-gray-500">
          <span class="mr-2">📚</span>
          <span>${course.coursesCount || 1} curso${(course.coursesCount && course.coursesCount > 1) ? 's' : ''}</span>
          <span class="mx-2">•</span>
          <span class="mr-2">⏱️</span>
          <span>${course.duration || '40-80h'}</span>
        </div>
        
        <button data-course-id="${course.id}" class="details-button w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mt-4">
          Ver Cursos
        </button>
      </div>
    `;
    return card;
  }

  // Adiciona os "escutadores de eventos" para interações do usuário
  bindFilterChange(handler) {
    // Usar o componente de busca
    if (this.searchComponent) {
      this.searchComponent.onSearch((searchTerm, results) => {
        handler(searchTerm, this.categoryFilter ? this.categoryFilter.value : 'all');
      });
    }

    if (this.categoryFilter) {
      this.categoryFilter.addEventListener('change', () => {
        handler(this.searchComponent ? this.searchComponent.getValue() : '', this.categoryFilter.value);
      });
    }
  }

  bindSearchResults(handler) {
    // Bind para resultados de busca em tempo real
    if (this.searchComponent) {
      this.searchComponent.onSearch((searchTerm) => {
        if (searchTerm.trim().length >= 2) {
          const results = handler(searchTerm);
          this.searchComponent.showResults(results);
        } else {
          this.searchComponent.hideResults();
        }
      });

      // Override do método de clique em resultado
      this.searchComponent.handleResultClick = (courseId) => {
        // Extrair o tipo do curso do ID (ex: "basico-1" -> "basico")
        const courseType = this.getCourseTypeFromId(courseId);
        if (courseType) {
          // Navegar para a página de cursos do tipo específico
          window.location.href = `./courses?type=${courseType}`;
        }
        this.searchComponent.hideResults();
      };
    }
  }

  // Método auxiliar para extrair tipo do curso do ID
  getCourseTypeFromId(courseId) {
    // Ex: "basico-1" -> "basico"
    const parts = courseId.split('-');
    return parts[0];
  }

  // Método auxiliar para obter tipo do curso pelo ID (para tipos principais)
  getCourseTypeById(courseId) {
    // Mapear IDs para tipos de curso
    const typeMapping = {
      'basico': 'basico',
      'aperfeicoamento': 'aperfeicoamento', 
      'atualizacao': 'atualizacao',
      'especializacao': 'especializacao',
      'residencia': 'residencia',
      'tecnico': 'tecnico',
      'treinamento': 'treinamento',
      'simulacao': 'simulacao'
    };
    
    return typeMapping[courseId] || courseId;
  }

  bindDetailsClick(handler) {
    if (this.courseListContainer) {
      this.courseListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('details-button')) {
          const courseId = event.target.dataset.courseId;
          console.log('🖱️ CLIQUE NO BOTÃO - courseId:', courseId);
          console.log('🔗 Elemento clicado:', event.target);
          handler(courseId);
        }
      });
    }
  }
}