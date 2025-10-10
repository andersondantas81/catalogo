import { CourseModel } from './js/models/CourseModel.js';
import { CourseView } from './js/views/CourseView.js';
import { CourseController } from './js/controllers/CourseController.js';
import { SearchComponent } from './Componentes/search.js';

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const app = new CourseController(new CourseModel(), new CourseView());
});