// src/httpRequest.js
export default class HttpRequest {
    constructor(url, method = 'GET', headers = {}, body = null) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
    }

    send() {
        const options = {
            method: this.method,
            headers: this.headers,
            body: this.body ? JSON.stringify(this.body) : null
        };

        return fetch(this.url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }
}
