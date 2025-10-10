import HttpClient from '../lib/HttpClient.js';

export default class BaseController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.client = new HttpClient(''); 
    }

    setDataAndLabels(data, labels) {
        this.model.setData(data);
        this.model.setLabels(labels);
        this.view.render(this.model.getLabels(), this.model.getData());
    }

    fetchData(endpoint, method = 'GET', headers = {}, body = null) {
        this.client.sendRequest(endpoint, method, headers, body)
            .then(response => {
                const data = response.quantidade; 
                const labels = response.label; 
                
                this.setDataAndLabels(data, labels);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}
