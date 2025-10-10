import SelectModel from '../models/SelectModel.js';
import SelectView from '../views/SelectView.js';

export default class SelectController {
    static all = [];
    constructor(id, opts, placeholder, multi = false, titulo = 'Selecione…') {
        this.model = new SelectModel(opts, multi);
        this.view = new SelectView(document.getElementById(id), placeholder, multi, titulo);
        this.multi = multi;
        this.open = false;
        SelectController.all.push(this);
        this._init();
    }

    _init() {
        this.view.bindToggle(() => this.toggle());
        this.view.bindSearch(t => this.update(t));
        this.view.bindOption(v => this.select(v));
        this.render();
    }

    toggle() {
        SelectController.all.forEach(c => {
            if (c !== this) {
                c.open = false;
                c.view.toggle(false);
            }
        });
        this.open = !this.open;
        this.view.toggle(this.open);
    }

    update(term) {
        this.view.renderOptions(this.model.filter(term), this.model.getSelected());
    }

    select(v, isChecked = null, allSelectedValues = null) {
        if (allSelectedValues && this.multi) {
            this.model.selected.clear();
            allSelectedValues.forEach(value => {
                if (this.model.options.includes(value)) {
                    this.model.selected.add(value);
                }
            });
        } else {
            this.model.toggle(v);
        }
        
        this.render();
        if (!this.multi) {
            this.open = false;
            this.view.toggle(false);
        }
    }

    updateOptionsWithValidation(newOptions) {
        this.model.updateOptions(newOptions);
        this.render();
    }

    getSelectedValues() {
        return this.model.getSelected();
    }

    selectAll() {
        if (this.multi) {
            this.model.selectAll();
            this.render();
        }
    }

    deselectAll() {
        this.model.deselectAll();
        this.render();
    }

    isAllSelected() {
        return this.model.isAllSelected();
    }

    render() {
        this.view.renderTrigger(this.model.getSelected());
        this.view.renderOptions(this.model.options, this.model.getSelected());
    }
}