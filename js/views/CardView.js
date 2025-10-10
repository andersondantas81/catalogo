export default class CardsView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    renderCards(data) {
        const ids = [
            'vagas_ofertadas',  
            'numero_cursos', 
            'numero_inscritos',
            'concludentes',
            'vagas_percent',
            'cursos_percent',
            'inscritos_percent',
            'concludentes_percent' 
        ];

        ids.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                switch (id) {
                    case 'vagas_ofertadas':
                        element.innerHTML = data[0].quantidade ?? '<i class="fas fa-exclamation-triangle"></i> Erro'; 
                        break;
                    case 'numero_cursos':
                        element.innerHTML = data[1].quantidade ?? '<i class="fas fa-exclamation-triangle"></i> Erro'; 
                        break;
                    case 'numero_inscritos':
                        element.innerHTML = data[2].quantidade ?? '<i class="fas fa-exclamation-triangle"></i> Erro'; 
                        break;
                    case 'concludentes':
                        element.innerHTML = data[3].quantidade ?? '<i class="fas fa-exclamation-triangle"></i> Erro'; 
                        break;
                    case 'vagas_percent':
                        this.updatePercentElement(element, data[0].diferenca_de_percentual);
                        break;
                    case 'cursos_percent':
                        this.updatePercentElement(element, data[1].diferenca_de_percentual);
                        break;
                    case 'inscritos_percent':
                        this.updatePercentElement(element, data[2].diferenca_de_percentual);
                        break;
                    case 'concludentes_percent':
                        this.updatePercentElement(element, data[3].diferenca_de_percentual);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    updatePercentElement(element, percentValue) {
        if (percentValue === null || percentValue === undefined) {
            element.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
            return;
        }

        const numValue = parseFloat(percentValue);
        
        if (isNaN(numValue)) {
            element.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
            return;
        }

        let colorClass, iconClass;
        
        if (numValue > 0) {
            colorClass = 'text-green-500';
            iconClass = 'fas fa-arrow-up';
        } else if (numValue < 0) {
            colorClass = 'text-red-500';
            iconClass = 'fas fa-arrow-down';
        } else {
            colorClass = 'text-gray-500';
            // iconClass = 'fas fa-minus';
        }

        const formattedValue = Math.abs(numValue) + '%';
        
        element.className = colorClass;
        element.innerHTML = `<i class="${iconClass}"></i> ${formattedValue}`;
    }
}