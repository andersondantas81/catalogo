import SelectController from "../controllers/SelectController.js";
export default class SelecoesView {
    constructor(selecoesModel) {
        this.selecoesModel = selecoesModel;
        this.selectElements = {};
        this.selecoesModel.filterConfigs.forEach(select => {
            this.selectElements[select['id']] = new SelectController(select['id'], select.valores, select.placeholder, select.multi_select, select.titulo);
        });
        this.selecoesModel.selectElements = this.selectElements;
    }

    update() {
        var valores = Object.values(this.selecoesModel.getData())
        this.selecoesModel.filterConfigs.forEach((select, index) => {
            this.selectElements[select['id']].updateOptionsWithValidation(valores[index]);
        });

    }
}