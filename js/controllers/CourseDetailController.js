export class CourseDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    // Configuração de filtros atual
    this.currentFilters = {
      search: '',
      year: 'all',
      area: 'all',
      sector: 'all'
    };

    // Configura os event handlers
    this.view.bindFilterChange(this.handleFilterChange);
    this.view.bindBackButton(this.handleBackButton);
    this.view.bindPageChange(this.handlePageChange);

    // Inicializa a página
    this.init();
  }

  // Inicializa a página baseada nos parâmetros da URL
  init = () => {
    console.log('🔍 Inicializando página de detalhes...');
    console.log('🌐 URL atual:', window.location.href);
    console.log('🔗 Search params:', window.location.search);
    console.log('🗂️ URLSearchParams objeto:', new URLSearchParams(window.location.search));
    console.log('📊 Todos os parâmetros:', Object.fromEntries(new URLSearchParams(window.location.search).entries()));
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseType = urlParams.get('type') || this.getCourseTypeFromHash();
    
    console.log('📋 Tipo de curso detectado:', courseType);
    console.log('🔍 urlParams.get("type"):', urlParams.get('type'));
    console.log('🔗 Hash fallback:', this.getCourseTypeFromHash());
    
    if (courseType) {
      console.log('✅ Carregando cursos do tipo:', courseType);
      this.loadCourseType(courseType);
    } else {
      console.warn('⚠️ Nenhum tipo de curso especificado na URL');
      console.log('🔄 Redirecionando para página principal...');
      // Se não há tipo especificado, redireciona para a página principal
      window.location.href = './';
    }
  }

  // Extrai o tipo de curso da URL hash (fallback)
  getCourseTypeFromHash() {
    const hash = window.location.hash.replace('#', '');
    return hash || null;
  }

  // Carrega os cursos de um tipo específico
  loadCourseType = (type) => {
    console.log('📚 Carregando cursos do tipo:', type);
    
    this.view.showLoading();
    
    // Simula um pequeno delay para mostrar o loading
    setTimeout(() => {
      const courses = this.model.setCourseType(type);
      const typeInfo = this.model.getCurrentTypeInfo();
      
      console.log('📊 Dados do tipo:', typeInfo);
      console.log('📋 Cursos encontrados:', courses.length);
      
      // Atualiza o título da página
      this.view.updatePageTitle(type, typeInfo);
      
      // Aplicar filtros iniciais (verificar se year filter está em "all")
      const initialFilters = this.getCurrentFilters();
      console.log('🔍 Filtros iniciais:', initialFilters);
      
      let coursesToRender = courses;
      if (initialFilters.year === 'all') {
        coursesToRender = this.model.filterCourses(initialFilters);
        console.log('📊 Cursos após filtro "Todos":', coursesToRender.length);
      }
      
      // Renderiza os cursos
      this.view.renderCourses(coursesToRender);
      
      console.log(`✅ Página carregada: ${coursesToRender.length} cursos do tipo ${type}`);
    }, 300);
  }

  // Obtém os filtros atuais da interface
  getCurrentFilters() {
    return {
      search: this.view.searchInput?.value || '',
      year: this.view.yearFilter?.value || 'all',
      area: this.view.areaFilter?.value || 'all',
      sector: this.view.sectorFilter?.value || 'all'
    };
  }

  // Handler para mudanças nos filtros
  handleFilterChange = (filters) => {
    console.log('Filtros alterados:', filters);
    
    // Atualizar filtros atuais
    this.currentFilters = { ...filters };
    
    // Resetar para primeira página quando filtros mudarem
    this.view.resetToFirstPage();
    
    const filteredCourses = this.model.filterCourses(filters);
    this.view.renderCourses(filteredCourses);
    
    console.log(`Exibindo ${filteredCourses.length} cursos após filtros`);
  }

  // Handler para mudança de página
  handlePageChange = () => {
    console.log('🔄 Handler de mudança de página chamado');
    console.log('📄 Nova página:', this.view.currentPage);
    console.log('🔍 Filtros atuais:', this.currentFilters);
    
    // Re-aplicar filtros atuais para a nova página
    const filteredCourses = this.model.filterCourses(this.currentFilters);
    console.log(`📊 Total de cursos filtrados: ${filteredCourses.length}`);
    
    this.view.renderCourses(filteredCourses);
    
    console.log('✅ Renderização concluída para página', this.view.currentPage);
  }

  // Handler para o botão voltar
  handleBackButton = () => {
    console.log('🔙 BOTÃO VOLTAR CLICADO - Redirecionando para index');
    console.log('🕐 Timestamp:', new Date().toISOString());
    console.log('📍 Stack trace:', new Error().stack);
    window.location.href = './';
  }

  // Método público para navegar para um tipo específico
  navigateToType(type) {
    const url = new URL(window.location);
    url.searchParams.set('type', type);
    window.history.pushState({}, '', url);
    this.loadCourseType(type);
  }

  // Retorna estatísticas dos cursos atuais
  getCurrentStats() {
    return this.model.getCourseStats();
  }
}