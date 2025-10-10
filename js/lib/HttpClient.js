// src/httpClient.js
import HttpRequest from './HttpRequest.js';

export default class HttpClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
    }

    createRequest(endpoint, method = 'GET', headers = {}, body = null) {
        return new HttpRequest(this.baseURL + endpoint, method, headers, body);
    }

    sendRequest(endpoint, method = 'GET', headers = {}, body = null) {
        const request = this.createRequest(endpoint, method, headers, body);
        return request.send()
            .then(response => response)
            .catch(error => {
                console.error('Request failed', error);
                throw error;
            });
    }
}
