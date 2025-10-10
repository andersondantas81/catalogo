# Catálogo de Cursos ESP/CE

## Funcionalidades Implementadas

### Página Principal (index.html)
- ✅ Layout com header verde ESP/CE
- ✅ Barra de busca centralizada
- ✅ 8 cards de tipos de curso em grid 4x2
- ✅ Botões "Ver Cursos" funcionais
- ✅ Design responsivo

### Página de Detalhes (courses.html)
- ✅ Header dinâmico baseado no tipo de curso
- ✅ Botão "Voltar ao catálogo" 
- ✅ Barra de busca (igual à página principal)
- ✅ Filtros: Ano, Área, Setor
- ✅ Grid de cursos específicos em 3 colunas
- ✅ Cards detalhados com tags coloridas
- ✅ Informações completas: duração, participantes, local, etc.

### Navegação
- ✅ Clique em "Ver Cursos" → redireciona para courses.html?type=[tipo]
- ✅ URL com parâmetros para identificar o tipo
- ✅ Botão voltar funcional

### Funcionalidades
- ✅ Busca por texto (título, descrição, categoria)
- ✅ Filtros funcionais por área e setor
- ✅ Loading states
- ✅ Mensagem quando não há cursos
- ✅ Design responsivo

## Como Testar

1. **Página Principal**: http://localhost:3000
   - Clique nos botões "Ver Cursos" de qualquer card
   
2. **Página de Aperfeiçoamento**: http://localhost:3000/courses.html?type=aperfeicoamento
   - Teste os filtros de busca
   - Teste o botão voltar
   
3. **Outras páginas**:
   - Básico: http://localhost:3000/courses.html?type=basico
   - Especialização: http://localhost:3000/courses.html?type=especializacao
   - Residência: http://localhost:3000/courses.html?type=residencia
   - E assim por diante...

## Estrutura de Arquivos

```
/
├── index.html              # Página principal
├── courses.html            # Página de detalhes
├── app.js                  # Inicialização página principal
├── course-detail-app.js    # Inicialização página detalhes
├── js/
│   ├── controllers/
│   │   ├── CourseController.js       # Controller principal
│   │   └── CourseDetailController.js # Controller detalhes
│   ├── models/
│   │   ├── CourseModel.js            # Model principal
│   │   └── CourseDetailModel.js      # Model detalhes
│   ├── views/
│   │   ├── CourseView.js             # View principal
│   │   └── CourseDetailView.js       # View detalhes
│   └── data/
│       ├── allCourses.js             # Dados dos tipos de curso
│       └── courseDetails.js          # Dados dos cursos específicos
```

## Dados

### Tipos de Curso (8 categorias)
- Básico (15 cursos)
- Aperfeiçoamento (12 cursos)  
- Atualização (8 cursos)
- Especialização (6 cursos)
- Residências Saúde (4 cursos)
- Técnico (10 cursos)
- Treinamentos de Habilidades (20 cursos)
- Centro de Simulação em Saúde (14 cursos)

### Cada curso específico tem
- Título e descrição detalhada
- Duração e modalidade
- Categoria com tag colorida
- Número de participantes
- Data de início
- Local (CISEC - Fortaleza, Online, etc.)
- Área e setor para filtros