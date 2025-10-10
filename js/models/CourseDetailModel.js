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

  // Filtra os cursos baseado nos critérios
  filterCourses(filters) {
    let filtered = [...this.currentCourses];

    // Filtro por texto de busca
    if (filters.search && filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por área
    if (filters.area && filters.area !== 'all') {
      filtered = filtered.filter(course => course.area === filters.area);
    }

    // Filtro por setor
    if (filters.sector && filters.sector !== 'all') {
      filtered = filtered.filter(course => course.sector === filters.sector);
    }

    // Filtro por ano (assumindo que todos os cursos são de 2024/2025)
    if (filters.year && filters.year !== '2025') {
      // Poderia filtrar por ano se os dados tivessem essa informação
      // Por ora, mantemos todos os cursos
    }

    return filtered;
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