export class CourseController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Configura os handlers para os eventos da View
    this.view.bindFilterChange(this.handleFilterChange);
    this.view.bindDetailsClick(this.handleDetailsClick);
    this.view.bindSearchResults(this.handleSearchResults);

    // Exibição inicial dos cursos
    this.displayCourses();
  }

  // Exibe os cursos na View
  displayCourses = () => {
    const allCourses = this.model.getAllCourses();
    this.view.renderCourses(allCourses);
  }

  // Handler para quando os filtros mudam
  handleFilterChange = (searchTerm, category) => {
    const filteredCourses = this.model.filterCourses(searchTerm, category);
    this.view.renderCourses(filteredCourses);
  }

  // Handler para busca em tempo real com resultados
  handleSearchResults = (searchTerm) => {
    // BUSCA NOS CURSOS INDIVIDUAIS DE TODOS OS TIPOS
    const searchResults = this.model.searchIndividualCourses(searchTerm);
    
    // Formatar resultados para o componente de busca
    const formattedResults = searchResults.slice(0, 8).map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      icon: this.getIconForCourse(course),
      type: course.type || course.category,
      duration: course.duration,
      courseType: this.getCourseTypeFromId(course.id) // Adicionar tipo do curso para navegação
    }));

    return formattedResults;
  }

  // Método auxiliar para extrair tipo do curso do ID
  getCourseTypeFromId = (courseId) => {
    // Ex: "basico-1" -> "basico"
    const parts = courseId.split('-');
    return parts[0];
  }

  // Método auxiliar para obter ícone do curso
  getIconForCourse = (course) => {
    const iconMapping = {
      'Básico': '📖',
      'Aperfeiçoamento': '📈', 
      'Atualização': '🔄',
      'Especialização': '🎓',
      'Residência': '💚',
      'Residências Saúde': '�',
      'Técnico': '🔧',
      'Treinamentos': '🏆',
      'Simulação': '🏆',
      // Ícones por categoria
      'Emergência': '🚨',
      'Saúde Pública': '🏥',
      'Gestão': '📊',
      'Prevenção': '🛡️',
      'Assistência': '👩‍⚕️',
      'Vigilância': '👁️',
      'Especializada': '🎯'
    };
    
    return iconMapping[course.type] || iconMapping[course.category] || iconMapping[course.title] || '📚';
  }

  // Handler para o clique no botão "Ver Detalhes"
  handleDetailsClick = (courseId) => {
    console.log('🎯 CLIQUE DETECTADO - Navegando para cursos do tipo:', courseId);
    console.log('🌐 URL atual:', window.location.href);
    
    // Navega para a página de detalhes com o tipo de curso (SEM .html para compatibilidade com npx serve)
    const newUrl = `./courses?type=${courseId}`;
    console.log('🚀 Navegando para:', newUrl);
    
    window.location.href = newUrl;
  }
}