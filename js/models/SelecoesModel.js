//models/SelecoesModel.js
export default class SelecoesModel {
    constructor(filterConfigs) {
        this.data = {};
        this.filterConfigs = filterConfigs;
        this.selectElements = {};
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}