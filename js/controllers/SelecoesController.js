import BaseController from './BaseController.js';

export default class SelecoesController extends BaseController {
    
    constructor(model, view) {
        super(model, view);
        this.model = model;
        this.view = view;
    }

    updateView() {
        this.view.update(this.model.getData());
    }


    fetchData(endpoint, method = 'GET', headers = {}, body = null) {
        this.client.sendRequest(endpoint, method, headers, body)
            .then(response => {
                this.model.setData(response);
                this.updateView();
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}