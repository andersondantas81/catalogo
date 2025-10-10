export class CourseDetailController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Configura os event handlers
    this.view.bindFilterChange(this.handleFilterChange);
    this.view.bindBackButton(this.handleBackButton);

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
      
      // Renderiza os cursos
      this.view.renderCourses(courses);
      
      console.log(`✅ Página carregada: ${courses.length} cursos do tipo ${type}`);
    }, 300);
  }

  // Handler para mudanças nos filtros
  handleFilterChange = (filters) => {
    console.log('Filtros alterados:', filters);
    
    const filteredCourses = this.model.filterCourses(filters);
    this.view.renderCourses(filteredCourses);
    
    console.log(`Exibindo ${filteredCourses.length} cursos após filtros`);
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