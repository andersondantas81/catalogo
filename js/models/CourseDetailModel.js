import { courseDetails } from '../data/courseDetails.js';

export class CourseDetailModel {
  constructor() {
    this.courses = courseDetails;
    this.currentType = null;
    this.currentCourses = [];
  }

  // Define o tipo de curso atual
  setCourseType(type) {
    this.currentType = type;
    this.currentCourses = this.courses[type] || [];
    return this.currentCourses;
  }

  // Retorna todos os cursos do tipo atual
  getCurrentCourses() {
    return this.currentCourses;
  }

  // Retorna todos os cursos de todos os tipos (para filtro "Todos")
  getAllCoursesFromAllTypes() {
    let allCourses = [];
    
    // Percorre todos os tipos e coleta todos os cursos
    Object.keys(this.courses).forEach(type => {
      const coursesOfType = this.courses[type] || [];
      console.log(`📚 Tipo ${type}: ${coursesOfType.length} cursos`);
      // Adiciona o tipo como propriedade para cada curso
      const coursesWithType = coursesOfType.map(course => ({
        ...course,
        courseType: type
      }));
      allCourses = allCourses.concat(coursesWithType);
    });
    
    console.log(`📊 Total de cursos de todos os tipos: ${allCourses.length}`);
    return allCourses;
  }

  // Filtra os cursos baseado nos critérios
  filterCourses(filters) {
    console.log('🔍 Aplicando filtros:', filters);
    
    // Se o filtro de ano for "all", buscar em todos os tipos de cursos
    let coursesToFilter = filters.year === 'all' 
      ? this.getAllCoursesFromAllTypes()
      : [...this.currentCourses];

    console.log(`📋 Cursos antes dos filtros: ${coursesToFilter.length}`);

    // Filtro por texto de busca
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      coursesToFilter = coursesToFilter.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower)
      );
      console.log(`📋 Após filtro de busca: ${coursesToFilter.length}`);
    }

    // Filtro por área
    if (filters.area && filters.area !== 'all') {
      coursesToFilter = coursesToFilter.filter(course => course.area === filters.area);
      console.log(`📋 Após filtro de área: ${coursesToFilter.length}`);
    }

    // Filtro por setor
    if (filters.sector && filters.sector !== 'all') {
      coursesToFilter = coursesToFilter.filter(course => course.sector === filters.sector);
      console.log(`📋 Após filtro de setor: ${coursesToFilter.length}`);
    }

    // Filtro por ano específico (quando não for "all")
    if (filters.year && filters.year !== 'all' && filters.year !== '2025') {
      // Aqui você pode implementar filtro por ano específico se os dados tiverem essa informação
      // Por ora, se não for "all" nem "2025", não mostra nenhum curso
      coursesToFilter = coursesToFilter.filter(course => course.year === filters.year);
      console.log(`📋 Após filtro de ano específico: ${coursesToFilter.length}`);
    }

    console.log(`✅ Total de cursos após filtros: ${coursesToFilter.length}`);
    return coursesToFilter;
  }

  // Busca um curso específico pelo ID
  getCourseById(id) {
    return this.currentCourses.find(course => course.id === id);
  }

  // Retorna informações sobre o tipo de curso atual
  getCurrentTypeInfo() {
    const typeMapping = {
      'basico': {
        title: 'Básico',
        description: 'Cursos introdutórios para desenvolvimento de competências fundamentais em saúde'
      },
      'aperfeicoamento': {
        title: 'Aperfeiçoamento',
        description: 'Cursos para aprimoramento de conhecimentos e habilidades específicas'
      },
      'atualizacao': {
        title: 'Atualização',
        description: 'Cursos para atualização em novas tecnologias e práticas em saúde'
      },
      'especializacao': {
        title: 'Especialização',
        description: 'Cursos de pós-graduação lato sensu para aprofundamento em áreas específicas'
      },
      'residencia': {
        title: 'Residências Saúde',
        description: 'Programas de residência multiprofissional e médica em saúde'
      },
      'tecnico': {
        title: 'Técnico',
        description: 'Cursos técnicos para formação de profissionais de nível médio'
      },
      'treinamento': {
        title: 'Treinamentos de Habilidades',
        description: 'Treinamentos práticos para desenvolvimento de habilidades específicas'
      },
      'simulacao': {
        title: 'Centro de Simulação em Saúde',
        description: 'Cursos práticos com simulação realística para profissionais de saúde'
      }
    };

    return typeMapping[this.currentType] || {
      title: 'Cursos',
      description: 'Cursos disponíveis'
    };
  }

  // Retorna estatísticas dos cursos atuais
  getCourseStats() {
    const courses = this.currentCourses;
    return {
      total: courses.length,
      presencial: courses.filter(c => c.modality === 'Presencial').length,
      ead: courses.filter(c => c.modality === 'EaD').length,
      hibrido: courses.filter(c => c.modality === 'Híbrido').length,
      totalParticipants: courses.reduce((sum, c) => sum + c.participants, 0)
    };
  }
}