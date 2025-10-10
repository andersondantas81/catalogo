export default class ChartBase {
  constructor(canvasId, title = '', type = 'bar') {
      this.canvas = document.getElementById(canvasId).getContext('2d');
      this.chart = null;
      this.title = title;
      this.type = type;

      this.defaultColors = [
        '#2FAC66',
        '#F49D04',
        '#E94E1B',
        '#2CC3E5',
        '#E10B17',
        '#3498DB',
        '#9B59B6',
        '#1ABC9C',
        '#8E44AD',
      ];

      this.colorCinza = '#C0C0C0';
  }

  toTitleCase(str) {
      return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      );
  }

  hexToRgba(hex, alpha = 1) {
      hex = hex.replace('#', '');
      
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  render(labels, datasets) {
      const canvasId = this.canvas.canvas.id;
      const canvasElement = document.getElementById(canvasId);
      if (!canvasElement) {
          console.error('Canvas não encontrado:', canvasId);
          return;
      }
      this.canvas = canvasElement.getContext('2d');
      if (this.chart) {
          this.chart.destroy();
      }
      
      const container = canvasElement.parentElement;
      if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          
          canvasElement.style.maxWidth = '100%';
          canvasElement.style.maxHeight = '100%';
          canvasElement.style.width = 'auto';
          canvasElement.style.height = 'auto';
      }

      labels = labels.map((label) => {
          const normalized = (label || '').toString().toLowerCase().trim();
          return this.toTitleCase(normalized);
      });

      let chartDatasets;
      if (Array.isArray(datasets) && datasets.length > 0 && typeof datasets[0] === 'object' && datasets[0].data) {
        const colorMap = {
          'Número de Cursos': this.defaultColors[0],
          'Vagas Ofertadas': this.defaultColors[1],
          'Alunos Matriculados': this.defaultColors[2],
          'Concludentes': this.defaultColors[3],
        };        
        chartDatasets = datasets.map((dataset, idx) => {
          const originalColor = colorMap[dataset.label] || this.defaultColors[idx % this.defaultColors.length];
          const backgroundColor = labels.map((label, i) => {
            const normalized = (label || '').toString().toLowerCase().trim();
            if (["não informado", "nao informado", "undefined"].includes(normalized)) {
              return this.colorCinza;
            }
            return originalColor;
          });
          
          return {
            label: dataset.label,
            data: dataset.data,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 2
          };
        });
      } else {
        const backgroundColors = labels.map((label, i) => {
          const normalized = (label || '').toString().toLowerCase().trim();
          if (["não informado", "nao informado", "undefined"].includes(normalized)) {
            return this.colorCinza;
          }
          return this.defaultColors[i % this.defaultColors.length];
        });
        chartDatasets = [{
          label: this.title || 'Quantidade',
          data: datasets,
          backgroundColor: backgroundColors,
          borderColor: "#fff",
          hoverOffset: 2,
          borderWidth: 1
        }];
      }

      this.chart = new Chart(this.canvas, {
          type: this.type,
          data: {
              labels: labels,
              datasets: chartDatasets
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              aspectRatio: this.type === 'pie' ? 1 : 2,
              layout: {
                  padding: { 
                      top: 5, 
                      bottom: 5, 
                      left: 5, 
                      right: 5 
                  },
              },              
              plugins: {                  legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                          boxWidth: 8,
                          color: '#333',
                          font: { size: 9 },
                          usePointStyle: true,
                          pointStyle: 'rectRounded',
                          padding: 8
                      }
                  },
                  tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      bodyFont: { size: 12 },
                      callbacks: {
                          label: function (context) {
                              if (context.chart.config.type === 'pie') {
                                  const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                                  const percentage = ((context.raw / total) * 100).toFixed(1);
                                  return `${context.label}: ${context.raw} (${percentage}%)`;
                              }
                              return `${context.dataset.label}: ${context.raw}`;
                          }
                      }
                  },
                  title: {
                      display: false
                  },
                  ...(this.type === 'bar' && {
                      datalabels: {
                          anchor: 'end',
                          align: 'end',
                          clip: false,
                          color: '#000',
                          font: {
                              weight: 'bold',
                              size: 12
                          },
                          formatter: function (value) {
                              return value;
                          },
                          offset: 0
                      }
                  })
              },
              ...(this.type === 'bar' && {
                  scales: {
                      x: {
                          grid: {
                              display: false
                          },
                          ticks: {
                              color: '#333'
                          }
                      },
                      y: {
                          grid: {
                              color: 'rgba(200, 200, 200, 0.2)',
                              borderDash: [5, 5]
                          },
                          ticks: {
                              color: '#333',
                              beginAtZero: true,
                          },
                          suggestedMax: Math.max(...chartDatasets.flatMap(dataset => dataset.data)) * 1.15

                      }
                  },        
                //   elements: {
                //       bar: {
                //           hoverBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                //           hoverBorderColor: 'rgba(0, 0, 0, 0.9)',
                //           hoverBorderWidth: 2,
                //       }
                //   }
              })
          },
          plugins: this.type === 'bar' ? [ChartDataLabels] : []
      });
      
      setTimeout(() => {
          if (this.chart) {
              this.chart.resize();
          }
      }, 100);
  }
  
  resize() {
      if (this.chart) {
          this.chart.resize();
      }
  }
}