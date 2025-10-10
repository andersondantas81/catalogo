export class CourseDetailView {
  constructor() {
    this.courseListContainer = document.getElementById('course-list');
    this.searchInput = document.getElementById('search-input');
    this.yearFilter = document.getElementById('year-filter');
    this.areaFilter = document.getElementById('area-filter');
    this.sectorFilter = document.getElementById('sector-filter');
    this.pageTitle = document.getElementById('page-title');
    this.pageSubtitle = document.getElementById('page-subtitle');
    this.backButton = document.getElementById('back-button');
    this.loadingElement = document.getElementById('loading');
    this.noCoursesElement = document.getElementById('no-courses');
    
    // Debug
    console.log('CourseDetailView initialized');
    console.log('Elements found:', {
      courseList: !!this.courseListContainer,
      searchInput: !!this.searchInput,
      filters: !!(this.yearFilter && this.areaFilter && this.sectorFilter)
    });
  }

  // Atualiza o título da página baseado no tipo de curso
  updatePageTitle(courseType, typeInfo) {
    if (this.pageTitle && this.pageSubtitle) {
      this.pageTitle.textContent = `Cursos de ${typeInfo.title}`;
      this.pageSubtitle.textContent = typeInfo.description;
    }
  }

  // Renderiza a lista de cursos específicos
  renderCourses(courses) {
    console.log('Renderizando cursos específicos:', courses);
    
    if (!this.courseListContainer) {
      console.error('Container de cursos não encontrado!');
      return;
    }

    // Esconder loading e mensagem de "não encontrado"
    this.hideLoading();
    this.hideNoCourses();

    this.courseListContainer.innerHTML = '';

    if (courses.length === 0) {
      this.showNoCourses();
      return;
    }

    courses.forEach(course => {
      const courseCard = this.createCourseDetailCard(course);
      this.courseListContainer.appendChild(courseCard);
    });
  }

  // Cria um card detalhado para um curso específico
  createCourseDetailCard(course) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative';
    
    // Mapeamento de categorias para cores das tags
    const categoryColors = {
      'Gestão': 'bg-blue-100 text-blue-800',
      'Humanização': 'bg-orange-100 text-orange-800',
      'Vigilância': 'bg-indigo-100 text-indigo-800',
      'Cuidados': 'bg-green-100 text-green-800',
      'Saúde Mental': 'bg-purple-100 text-purple-800',
      'Emergência': 'bg-red-100 text-red-800',
      'Diretrizes': 'bg-gray-100 text-gray-800',
      'Tecnologia': 'bg-cyan-100 text-cyan-800',
      'Epidemiologia': 'bg-teal-100 text-teal-800',
      'Multiprofissional': 'bg-pink-100 text-pink-800',
      'Médica': 'bg-blue-100 text-blue-800',
      'Enfermagem': 'bg-green-100 text-green-800',
      'Radiologia': 'bg-gray-100 text-gray-800',
      'Procedimentos': 'bg-yellow-100 text-yellow-800',
      'Farmacologia': 'bg-indigo-100 text-indigo-800',
      'Obstetrícia': 'bg-pink-100 text-pink-800',
      'default': 'bg-gray-100 text-gray-800'
    };

    const tagColor = categoryColors[course.category] || categoryColors['default'];
    
    card.innerHTML = `
      <!-- Tag da categoria -->
      <div class="absolute top-4 right-4">
        <span class="px-3 py-1 text-xs font-semibold rounded-full ${tagColor}">
          ${course.category}
        </span>
      </div>
      
      <!-- Conteúdo do card -->
      <div class="pr-20">
        <h3 class="text-xl font-bold text-gray-900 mb-3">${course.title}</h3>
        <p class="text-gray-600 mb-4 leading-relaxed">${course.description}</p>
        
        <!-- Informações do curso -->
        <div class="space-y-2 text-sm">
          <div class="flex items-center text-gray-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>${course.duration} • ${course.modality}</span>
          </div>
          
          <div class="flex items-center text-gray-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>${course.participants} participantes</span>
          </div>
          
          <div class="flex items-center text-gray-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 5h.01M3 10h18a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V11a1 1 0 011-1z"></path>
            </svg>
            <span>Início: ${course.startDate}</span>
          </div>
          
          <div class="flex items-center text-gray-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>${course.location}</span>
          </div>
        </div>
      </div>
    `;
    
    return card;
  }

  // Bind eventos dos filtros
  bindFilterChange(handler) {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        handler({
          search: this.searchInput.value,
          year: this.yearFilter?.value || '2025',
          area: this.areaFilter?.value || 'all',
          sector: this.sectorFilter?.value || 'all'
        });
      });
    }

    [this.yearFilter, this.areaFilter, this.sectorFilter].forEach(filter => {
      if (filter) {
        filter.addEventListener('change', () => {
          handler({
            search: this.searchInput?.value || '',
            year: this.yearFilter?.value || '2025',
            area: this.areaFilter?.value || 'all',
            sector: this.sectorFilter?.value || 'all'
          });
        });
      }
    });
  }

  // Bind evento do botão voltar
  bindBackButton(handler) {
    if (this.backButton) {
      this.backButton.addEventListener('click', handler);
    }
  }

  // Métodos de loading e estados
  showLoading() {
    if (this.loadingElement) {
      this.loadingElement.classList.remove('hidden');
    }
    if (this.courseListContainer) {
      this.courseListContainer.classList.add('hidden');
    }
  }

  hideLoading() {
    if (this.loadingElement) {
      this.loadingElement.classList.add('hidden');
    }
    if (this.courseListContainer) {
      this.courseListContainer.classList.remove('hidden');
    }
  }

  showNoCourses() {
    if (this.noCoursesElement) {
      this.noCoursesElement.classList.remove('hidden');
    }
  }

  hideNoCourses() {
    if (this.noCoursesElement) {
      this.noCoursesElement.classList.add('hidden');
    }
  }
}