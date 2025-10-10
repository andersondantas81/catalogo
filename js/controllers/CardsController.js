import BaseController from './BaseController.js';

export default class CardsController extends BaseController {
    constructor(model, view) {
        super(model, view);
    }

    updateView() {
        const data = this.model.getData();
        this.view.renderCards(data);
    }

    fetchData(endpoint, method = 'GET', headers = {}, body = null) {
        this.client.sendRequest(endpoint, method, headers, body)
            .then(response => {
                const data = [             
                    response.n_vagas,
                    response.n_cursos,
                    response.n_matriculados,
                    response.n_aprovados,
                ];
                this.model.setData(data);
                this.updateView();
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}
