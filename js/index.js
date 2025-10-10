import CardsModel from './models/CardsModel.js';
import CardsView from './views/CardView.js';
import CardsController from './controllers/CardsController.js';
import EvolucaoTemporalModel from './models/EvolucaoTemporalModel.js';
import EvolucaoTemporalView from './views/EvolucaoTemporalView.js';
import EvolucaoTemporalController from './controllers/EvolucaoTemporalController.js';

import SelecoesModel from './models/SelecoesModel.js';
import SelecoesView from './views/SelecoesView.js';
import SelecoesController from './controllers/SelecoesController.js';

import CursosGraficoModel from './models/CursosGraficoModel.js';
import CursosGraficoView from './views/CursosGraficoView.js';
import CursosGraficoController from './controllers/CursosGraficoController.js';

import ProgramasGraficoModel from './models/ProgramasGraficoModel.js';
import ProgramasGraficoView from './views/ProgramasGraficoView.js';
import ProgramasGraficoController from './controllers/ProgramasGraficoController.js';

import MapaModel from './models/MapaModel.js';
import MapaView from './views/MapaView.js';
import MapaController from './controllers/MapaController.js';

import CursoModel from './models/CursoModel.js';
import CursoView from './views/CursoView.js';
import CursoController from './controllers/CursoController.js';


const filterConfigs = [
  { id: 'filter1', valores: [], titulo: 'ANO', multi_select: false, placeholder: '2024' },
  { id: 'filter2', valores: [], titulo: 'GERÊNCIAS', multi_select: true, placeholder: 'Todos' },
  { id: 'filter3', valores: [], titulo: 'PROJETOS', multi_select: true, placeholder: '' },
  { id: 'filter4', valores: [], titulo: 'TIPOS DE CURSOS', multi_select: true, placeholder: '' },
  { id: 'filter5', valores: [], titulo: 'MODALIDADES', multi_select: true, placeholder: '' },
  { id: 'filter6', valores: [], titulo: 'CURSOS', multi_select: true, placeholder: '' },
];

var payload = {
  ano: 2024, gerencias: ['all'], projetos: ['all'], tipos_curso: ['all'], modalidades: ['all'], cursos: ['all'],
};

const selecoesModel = new SelecoesModel(filterConfigs);
const selecoesView = new SelecoesView(selecoesModel);
const selecoesController = new SelecoesController(selecoesModel, selecoesView);

const cardModel = new CardsModel();
const cardView = new CardsView('cards-container');
const cardController = new CardsController(cardModel, cardView);

const mapaModel = new MapaModel();
const mapaView = new MapaView('espaco_mapa');
const mapaController = new MapaController(mapaModel, mapaView);

window.mapaController = mapaController;
window.payload = payload;

function getMapEndpoint(baseEndpoint, tipoMapa) {
  const endpointMap = {
    'vagas': baseEndpoint + '/mapa_cidade_por_quantidade_de_vagas',
    'cursos': baseEndpoint + '/mapa_cidade_por_quantidade_de_cursos',
    'inscritos': baseEndpoint + '/mapa_cidade_por_quantidade_de_inscritos',
    'concludentes': baseEndpoint + '/mapa_cidade_por_quantidade_de_concludentes'
  };
  
  return endpointMap[tipoMapa] || endpointMap['cursos'];
}

let currentMapType = 'vagas';

const evolucaoTemporalModel = new EvolucaoTemporalModel();
const evolucaoTemporalView = new EvolucaoTemporalView('grafico-temporal');
const evolucaoTemporalController = new EvolucaoTemporalController(evolucaoTemporalModel, evolucaoTemporalView);

evolucaoTemporalController.setSelectedYear(payload.ano);

const programasGraficoModel = new ProgramasGraficoModel();
const programasGraficoView = new ProgramasGraficoView('grafico-barra-cursos');
const programasGraficoController = new ProgramasGraficoController(programasGraficoModel, programasGraficoView);

const cursosGraficoModel = new CursosGraficoModel();
const cursosGraficoView = new CursosGraficoView('grafico-barra-projetos');
const cursosGraficoController = new CursosGraficoController(cursosGraficoModel, cursosGraficoView);


const cursoModel = new CursoModel();
const cursoView = new CursoView('lista-cursos');
const cursoController = new CursoController(cursoModel, cursoView);

window.cursoController = cursoController;
window.cursoView = cursoView;

window.debugCursos = function() {
  if (window.cursoView) {
    window.cursoView.debugScrollInfo();
  } 
};

window.testScrollCursos = function() {
  if (window.cursoView && window.cursoView.testScroll) {
    window.cursoView.testScroll();
  }
};

window.forceLoadCursos = function() {
  if (window.cursoView && window.cursoView.forceLoad) {
    window.cursoView.forceLoad();
  }
};

window.resetCursos = function() {
  if (window.cursoView && window.cursoView.reset) {
    window.cursoView.reset();
  }
};

window.cursoController = cursoController;
window.cursoView = cursoView;

const ENDPOINT = '/DIEPS/esp/cursos_livres'

function showInitialMessages() {
  const graficoTemporal = document.getElementById('grafico-temporal');
  if (graficoTemporal) {
    const container = graficoTemporal.parentElement;
    container.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-gray-300 rounded-lg"><i class="fas fa-exclamation-triangle text-4xl mb-2"></i><span class="text-lg font-semibold">Dados indisponíveis !</span></div>';
  }

  const graficoProjectos = document.getElementById('grafico-projetos');
  if (graficoProjectos) {
    graficoProjectos.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-gray-300 rounded-lg"><i class="fas fa-exclamation-triangle text-3xl mb-2"></i><span class="font-semibold">Dados indisponíveis !</span></div>';
  }

  const graficoCursos = document.getElementById('grafico-cursos');
  if (graficoCursos) {
    graficoCursos.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-gray-300 rounded-lg"><i class="fas fa-exclamation-triangle text-3xl mb-2"></i><span class="font-semibold">Dados indisponíveis !</span></div>';
  }

  const espacoMapa = document.getElementById('espaco_mapa');
  if (espacoMapa) {
    espacoMapa.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-gray-300 rounded-lg"><i class="fas fa-exclamation-triangle text-4xl mb-2"></i><span class="text-lg font-semibold">Dados indisponíveis !</span></div>';
  }

  const cards = ['vagas_ofertadas', 'numero_cursos', 'numero_inscritos', 'concludentes'];
  cards.forEach(cardId => {
    const element = document.getElementById(cardId);
    if (element) {
      element.innerHTML = '<i class="fas fa-exclamation-triangle"></i> N/D';
      element.className = 'text-lg font-bold text-gray-300';
    }
  });

  const percentCards = ['vagas_percent', 'cursos_percent', 'inscritos_percent', 'concludentes_percent'];
  percentCards.forEach(cardId => {
    const element = document.getElementById(cardId);
    if (element) {
      element.innerHTML = '<i class="fas fa-exclamation-triangle"></i> N/D';
      element.className = 'text-gray-300';
    }
  });
}

if (typeof ENDPOINT === 'undefined') {
  console.warn('ENDPOINT não está definido. Mostrando mensagens iniciais.');
  document.addEventListener('DOMContentLoaded', () => {
    showInitialMessages();
  });
} else {
selecoesController.fetchData(ENDPOINT + '/filtros',
  'POST', { 'Content-Type': 'application/json' }, payload);

cardController.fetchData(ENDPOINT + '/cards',
  'POST', { 'Content-Type': 'application/json' }, payload);

evolucaoTemporalController.fetchData(ENDPOINT + '/grafico_temporal',
  'POST', { 'Content-Type': 'application/json' }, payload);

programasGraficoController.fetchData(ENDPOINT + '/quantidade_de_curso_tipo',
  'POST', { 'Content-Type': 'application/json' }, payload);

cursosGraficoController.fetchData(ENDPOINT + '/quantidade_de_curso_modalidade',
  'POST', { 'Content-Type': 'application/json' }, payload);

mapaController.fetchData(getMapEndpoint(ENDPOINT, currentMapType),
  'POST', { 'Content-Type': 'application/json' }, payload);

const tipoInicial = 'preenchidas';
const endpointInicial = ENDPOINT + (tipoInicial === 'evasao' ? '/evasao_de_cursos' : '/preenchimento_de_vagas');
cursoController.fetchData(endpointInicial, 'POST', { 'Content-Type': 'application/json' }, payload);

}

// Função para atualizar cursos baseado na seleção do dropdown
window.atualizarCursosPorTipo = function() {
  const tipoAtual = getTipoCursoSelecionado();
  const endpointAtual = ENDPOINT + (tipoAtual === 'evasao' ? '/evasao_de_cursos' : '/preenchimento_de_vagas');

  if (window.cursoView && window.cursoView.reset) {
    window.cursoView.reset();
  }
  
  window.cursoController.fetchData(endpointAtual, 'POST', { 'Content-Type': 'application/json' }, window.payload);
};


// Função para buscar e atualizar a data de última atualização
async function updateLastUpdateDate() {
  if (typeof ENDPOINT === 'undefined') {
    console.warn('ENDPOINT não definido. Não é possível buscar a data de última atualização.');
    return;
  }
  
  try {
    const response = await fetch(ENDPOINT + '/last_update');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data && data.length > 0 && data[0].last_update) {
      const lastUpdateDate = data[0].last_update;
      // Buscar o elemento específico pelo ID
      const dateElement = document.getElementById('data-atualizacao');
      if (dateElement) {
        dateElement.textContent = lastUpdateDate;
      } else {
        console.warn('Elemento com ID "data-atualizacao" não encontrado');
      }
    } else if (data && data.last_update) {
      // Formato alternativo da resposta
      const dateElement = document.getElementById('data-atualizacao');
      if (dateElement) {
        dateElement.textContent = data.last_update;
      }
    } else {
      console.warn('Formato de resposta da API não reconhecido:', data);
    }
  } catch (error) {
    console.error('Erro ao buscar data de última atualização:', error);
    // Fallback: mantém a data padrão se a API falhar
    const dateElement = document.getElementById('data-atualizacao');
    if (dateElement) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('pt-BR');
      dateElement.textContent = formattedDate;
    }
  }
}






document.addEventListener('DOMContentLoaded', () => {
  // Atualizar data de última atualização
  updateLastUpdateDate();

  // Centraliza eventos de seleção para ativar outros componentes
  document.getElementById('filters-container').addEventListener('change', e => {
    const keysPayload = Object.keys(payload);
    Object.keys(selecoesModel.selectElements).forEach((key, index) => {
      const selectElement = selecoesModel.selectElements[key];

      if (selectElement.getSelectedValues().length > 0) {
        payload[keysPayload[index]] = selectElement.getSelectedValues();
      } else {
        payload[keysPayload[index]] = ['all'];
      }    });    payload.ano = selecoesModel.selectElements.filter1.getSelectedValues()[0] || '2024';

    evolucaoTemporalController.setSelectedYear(payload.ano);
    window.payload = payload;
    
    cardController.fetchData(ENDPOINT + '/cards',
      'POST', { 'Content-Type': 'application/json' }, payload);

    evolucaoTemporalController.fetchData(ENDPOINT + '/grafico_temporal',
      'POST', { 'Content-Type': 'application/json' }, payload);

    programasGraficoController.fetchData(ENDPOINT + '/quantidade_de_curso_tipo',
      'POST', { 'Content-Type': 'application/json' }, payload);

    cursosGraficoController.fetchData(ENDPOINT + '/quantidade_de_curso_modalidade',
      'POST', { 'Content-Type': 'application/json' }, payload);

    mapaController.fetchData(getMapEndpoint(ENDPOINT, currentMapType),
      'POST', { 'Content-Type': 'application/json' }, payload);    selecoesController.fetchData(ENDPOINT + '/filtros',
      'POST', { 'Content-Type': 'application/json' }, payload);

    const tipoAtual = getTipoCursoSelecionado();
    const endpointAtual = ENDPOINT + (tipoAtual === 'evasao' ? '/evasao_de_cursos' : '/preenchimento_de_vagas');
    cursoController.fetchData(endpointAtual, 'POST', { 'Content-Type': 'application/json' }, payload);
  });
});

window.atualizarMapaPorTipo = function(tipoMapa) {
  currentMapType = tipoMapa;
  window.mapaController.setCurrentMapType(tipoMapa);
  const endpoint = getMapEndpoint(ENDPOINT, tipoMapa);  
  window.mapaController.fetchData(endpoint, 'POST', { 'Content-Type': 'application/json' }, window.payload);
};

// Função para obter o tipo de curso selecionado no dropdown
function getTipoCursoSelecionado() {
  const selectedCursos = document.getElementById('selected-cursos');
  if (selectedCursos) {
    const textoSelecionado = selectedCursos.textContent.toLowerCase();
    return textoSelecionado.includes('evasão') ? 'evasao' : 'preenchidas';
  }
  return 'preenchidas'; // valor padrão
}

window.addEventListener('resize', () => {
  setTimeout(() => {
    if (programasGraficoView && programasGraficoView.resize) {
      programasGraficoView.resize();
    }
    if (cursosGraficoView && cursosGraficoView.resize) {
      cursosGraficoView.resize();
    }
    if (evolucaoTemporalView && evolucaoTemporalView.resize) {
      evolucaoTemporalView.resize();
    }
    if (mapaView && mapaView.resize) {
      mapaView.resize();
    }
  }, 100);
});