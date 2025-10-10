// Importe os dados dos cursos. Converta o arquivo .ts para .js
import { allCourses } from '../data/allCourses.js';
import { courseDetails } from '../data/courseDetails.js';

export class CourseModel {
  constructor() {
    this.courses = allCourses; // A lista completa de tipos de cursos
    this.courseDetails = courseDetails; // Todos os cursos individuais
  }

  // Retorna todos os tipos de cursos
  getAllCourses() {
    return this.courses;
  }

  // Retorna TODOS os cursos individuais de TODOS os tipos
  getAllIndividualCourses() {
    let allIndividualCourses = [];
    
    // Percorre todos os tipos e coleta todos os cursos
    Object.keys(this.courseDetails).forEach(type => {
      const coursesOfType = this.courseDetails[type];
      allIndividualCourses = allIndividualCourses.concat(coursesOfType);
    });
    
    return allIndividualCourses;
  }

  // Filtra os cursos com base em texto e categoria  
  filterCourses(searchTerm, category) {
    let filtered = this.courses;

    if (searchTerm && searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(lowerCaseSearch) ||
        course.description.toLowerCase().includes(lowerCaseSearch) ||
        course.summary?.toLowerCase().includes(lowerCaseSearch) ||
        course.type?.toLowerCase().includes(lowerCaseSearch) ||
        course.category?.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(course => course.category === category);
    }

    return filtered;
  }

  // Busca avançada com pontuação por relevância
  searchCourses(searchTerm) {
    if (!searchTerm || !searchTerm.trim()) {
      return this.courses;
    }

    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const words = lowerCaseSearch.split(' ').filter(word => word.length > 1);
    
    return this.courses.map(course => {
      let score = 0;
      const title = course.title.toLowerCase();
      const description = course.description.toLowerCase();
      const summary = course.summary?.toLowerCase() || '';
      const type = course.type?.toLowerCase() || '';
      
      // Pontuação por correspondência exata no título (peso maior)
      if (title.includes(lowerCaseSearch)) score += 100;
      
      // Pontuação por correspondência exata na descrição
      if (description.includes(lowerCaseSearch)) score += 80;
      
      // Pontuação por correspondência exata no resumo
      if (summary.includes(lowerCaseSearch)) score += 60;
      
      // Pontuação por correspondência exata no tipo
      if (type.includes(lowerCaseSearch)) score += 40;
      
      // Pontuação por palavras individuais
      words.forEach(word => {
        if (title.includes(word)) score += 30;
        if (description.includes(word)) score += 20;
        if (summary.includes(word)) score += 15;
        if (type.includes(word)) score += 10;
      });
      
      return { ...course, searchScore: score };
    })
    .filter(course => course.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
  }

  // NOVA BUSCA: Busca nos cursos individuais de TODOS os tipos
  searchIndividualCourses(searchTerm) {
    if (!searchTerm || !searchTerm.trim()) {
      return [];
    }

    const allIndividualCourses = this.getAllIndividualCourses();
    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const words = lowerCaseSearch.split(' ').filter(word => word.length > 1);
    
    return allIndividualCourses.map(course => {
      let score = 0;
      const title = course.title.toLowerCase();
      const description = course.description.toLowerCase();
      const category = course.category?.toLowerCase() || '';
      const type = course.type?.toLowerCase() || '';
      
      // Pontuação por correspondência exata no título (peso maior)
      if (title.includes(lowerCaseSearch)) score += 100;
      
      // Pontuação por correspondência exata na descrição
      if (description.includes(lowerCaseSearch)) score += 80;
      
      // Pontuação por correspondência exata na categoria
      if (category.includes(lowerCaseSearch)) score += 60;
      
      // Pontuação por correspondência exata no tipo
      if (type.includes(lowerCaseSearch)) score += 40;
      
      // Pontuação por palavras individuais
      words.forEach(word => {
        if (title.includes(word)) score += 30;
        if (description.includes(word)) score += 20;
        if (category.includes(word)) score += 15;
        if (type.includes(word)) score += 10;
      });
      
      return { ...course, searchScore: score };
    })
    .filter(course => course.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
  }

  // Busca um curso pelo ID
  getCourseById(id) {
    return this.courses.find(course => course.id === id);
  }
}