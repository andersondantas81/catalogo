export default class CardsModel {
    constructor() {
        this.data = [];
        this.labels = [];
    }

    setData(data) {
        this.data = data;
    }

    setLabels(labels) {
        this.labels = labels;
    }

    getData() {
        return this.data;
    }

    getLabels() {
        return this.labels;
    }
}
