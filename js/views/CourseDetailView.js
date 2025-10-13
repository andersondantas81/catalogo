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
    
    // Elementos do modal
    this.modal = document.getElementById('course-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalCategory = document.getElementById('modal-category');
    this.modalDescription = document.getElementById('modal-description');
    this.modalWorkload = document.getElementById('modal-workload');
    this.modalDuration = document.getElementById('modal-duration');
    this.modalModality = document.getElementById('modal-modality');
    this.modalParticipants = document.getElementById('modal-participants');
    this.modalLocation = document.getElementById('modal-location');
    this.modalDate = document.getElementById('modal-date');
    this.closeModalBtn = document.getElementById('close-modal');
    this.closeModalBtnFooter = document.getElementById('close-modal-btn');
    
    // Elementos de paginação
    this.paginationContainer = document.getElementById('pagination-container');
    this.prevPageBtn = document.getElementById('prev-page');
    this.nextPageBtn = document.getElementById('next-page');
    this.pageNumbersContainer = document.getElementById('page-numbers');
    
    // Configuração de paginação
    this.currentPage = 1;
    this.coursesPerPage = 10;
    this.totalCourses = 0;
    this.paginationEventsSetup = false; // Flag para evitar múltiplos listeners
    
    this.setupModalEvents();
    
    // Debug
    console.log('CourseDetailView initialized');
    console.log('Elements found:', {
      courseList: !!this.courseListContainer,
      searchInput: !!this.searchInput,
      filters: !!(this.yearFilter && this.areaFilter && this.sectorFilter),
      modal: !!this.modal,
      pagination: !!this.paginationContainer
    });
  }

  // Atualiza o título da página baseado no tipo de curso
  updatePageTitle(courseType, typeInfo) {
    if (this.pageTitle && this.pageSubtitle) {
      this.pageTitle.textContent = `Cursos de ${typeInfo.title}`;
      this.pageSubtitle.textContent = typeInfo.description;
    }
  }

  // Renderiza a lista de cursos específicos com paginação
  renderCourses(courses) {
    console.log('Renderizando cursos específicos:', courses);
    
    if (!this.courseListContainer) {
      console.error('Container de cursos não encontrado!');
      return;
    }

    // Esconder loading e mensagem de "não encontrado"
    this.hideLoading();
    this.hideNoCourses();

    this.totalCourses = courses.length;

    if (courses.length === 0) {
      this.showNoCourses();
      this.hidePagination();
      return;
    }

    // Calcular cursos para a página atual
    const startIndex = (this.currentPage - 1) * this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPage;
    const coursesToShow = courses.slice(startIndex, endIndex);

    // Limpar container e renderizar cursos da página
    this.courseListContainer.innerHTML = '';
    coursesToShow.forEach(course => {
      const courseCard = this.createCourseDetailCard(course);
      this.courseListContainer.appendChild(courseCard);
    });

    // Mostrar/esconder paginação baseado no número de cursos
    if (courses.length > this.coursesPerPage) {
      this.showPagination();
      this.updatePagination();
    } else {
      this.hidePagination();
    }
  }

  // Cria um card detalhado para um curso específico
  createCourseDetailCard(course) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative cursor-pointer';
    card.setAttribute('data-course-id', course.id);
    
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
    
    // Truncar descrição para máximo de 2 linhas (aproximadamente 120 caracteres)
    const maxDescriptionLength = 120;
    const truncatedDescription = course.description.length > maxDescriptionLength 
      ? course.description.substring(0, maxDescriptionLength) + '...'
      : course.description;
    
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
        <p class="text-gray-600 mb-4 leading-relaxed line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${truncatedDescription}
        </p>
        
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>${course.location}</span>
          </div>
        </div>
        
        <!-- Botão Ver Mais -->
        <div class="mt-4">
          <button class="text-esp-green hover:text-esp-dark-green font-medium text-sm transition-colors">
            Ver mais detalhes →
          </button>
        </div>
      </div>
    `;
    
    // Adicionar evento de clique para abrir modal
    card.addEventListener('click', () => {
      this.openCourseModal(course);
    });
    
    return card;
  }

  // Bind eventos dos filtros
  bindFilterChange(handler) {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        handler({
          search: this.searchInput.value,
          year: this.yearFilter?.value || 'all',
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
            year: this.yearFilter?.value || 'all',
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

  // Métodos do Modal
  setupModalEvents() {
    // Fechar modal com X
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.closeModal());
    }
    
    // Fechar modal com botão Fechar
    if (this.closeModalBtnFooter) {
      this.closeModalBtnFooter.addEventListener('click', () => this.closeModal());
    }
    
    // Fechar modal clicando fora
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  openCourseModal(course) {
    if (!this.modal) return;
    
    // Mapeamento de categorias para cores das tags (igual ao card)
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
    
    // Preencher dados do modal
    if (this.modalTitle) this.modalTitle.textContent = course.title;
    if (this.modalDescription) this.modalDescription.textContent = course.description;
    if (this.modalWorkload) this.modalWorkload.textContent = course.workload || course.duration;
    if (this.modalDuration) this.modalDuration.textContent = course.duration;
    if (this.modalModality) this.modalModality.textContent = course.modality;
    if (this.modalParticipants) this.modalParticipants.textContent = course.participants || 'Não informado';
    if (this.modalLocation) this.modalLocation.textContent = course.location;
    if (this.modalDate) this.modalDate.textContent = course.startDate || 'A definir';
    
    // Atualizar categoria com cor
    if (this.modalCategory) {
      this.modalCategory.textContent = course.category;
      this.modalCategory.className = `px-3 py-1 text-sm font-semibold rounded-full ${tagColor}`;
    }
    
    // Mostrar modal
    this.modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Prevenir scroll da página
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  // Métodos de Paginação
  showPagination() {
    if (this.paginationContainer) {
      this.paginationContainer.classList.remove('hidden');
      // Configurar eventos apenas uma vez
      if (!this.paginationEventsSetup) {
        this.setupPaginationEvents();
        this.paginationEventsSetup = true;
      }
    }
  }

  hidePagination() {
    if (this.paginationContainer) {
      this.paginationContainer.classList.add('hidden');
    }
  }

  setupPaginationEvents() {
    console.log('🔧 Configurando eventos de paginação...');
    
    if (this.prevPageBtn) {
      this.prevPageBtn.addEventListener('click', () => {
        console.log(`⬅️ Botão anterior clicado. Página atual: ${this.currentPage}`);
        if (this.currentPage > 1) {
          this.currentPage--;
          console.log(`➡️ Nova página: ${this.currentPage}`);
          this.onPageChange();
        }
      });
    }

    if (this.nextPageBtn) {
      this.nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(this.totalCourses / this.coursesPerPage);
        console.log(`➡️ Botão próximo clicado. Página atual: ${this.currentPage}, Total páginas: ${totalPages}`);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          console.log(`➡️ Nova página: ${this.currentPage}`);
          this.onPageChange();
        }
      });
    }
    
    console.log('✅ Eventos de paginação configurados');
  }

  updatePagination() {
    const totalPages = Math.ceil(this.totalCourses / this.coursesPerPage);
    
    console.log(`📄 Atualizando paginação: Página ${this.currentPage} de ${totalPages}`);
    
    // Atualizar botões anterior/próxima
    if (this.prevPageBtn) {
      this.prevPageBtn.disabled = this.currentPage === 1;
      this.prevPageBtn.classList.toggle('opacity-50', this.currentPage === 1);
    }
    
    if (this.nextPageBtn) {
      this.nextPageBtn.disabled = this.currentPage === totalPages;
      this.nextPageBtn.classList.toggle('opacity-50', this.currentPage === totalPages);
    }
    
    // Atualizar números das páginas
    if (this.pageNumbersContainer) {
      this.pageNumbersContainer.innerHTML = '';
      
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `px-3 py-2 text-sm font-medium rounded-md ${
          i === this.currentPage
            ? 'bg-esp-green text-white'
            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
        }`;
        
        pageBtn.addEventListener('click', () => {
          console.log(`🔢 Clicou na página ${i}`);
          this.currentPage = i;
          this.onPageChange();
        });
        
        this.pageNumbersContainer.appendChild(pageBtn);
      }
    }
    
    console.log(`✅ Paginação atualizada para página ${this.currentPage}`);
  }

  // Callback para mudança de página (será configurado pelo controller)
  bindPageChange(handler) {
    this.onPageChange = handler;
  }

  // Método para resetar para primeira página
  resetToFirstPage() {
    this.currentPage = 1;
  }
}