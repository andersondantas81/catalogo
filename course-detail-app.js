import { CourseDetailModel } from './js/models/CourseDetailModel.js';
import { CourseDetailView } from './js/views/CourseDetailView.js';
import { CourseDetailController } from './js/controllers/CourseDetailController.js';

// Inicializa a aplicação de detalhes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inicializando página de detalhes de cursos...');
  
  const model = new CourseDetailModel();
  const view = new CourseDetailView();
  const controller = new CourseDetailController(model, view);
  
  // Torna o controller globalmente acessível para debug
  window.courseDetailApp = controller;
  
  console.log('Página de detalhes inicializada com sucesso!');
});