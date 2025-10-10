export default class SelectModel {
    constructor(options = [], multi = false) {
        this.options = options;
        this.multi = multi;
        this.selected = new Set();
        
        // // Pré-selecionar todos os itens se for multi-select
        // if (this.multi && this.options.length > 0) {
        //     this.options.forEach(option => this.selected.add(option));
        // }
    }
    toggle(item) {
        if (!this.options.includes(item)) return;
        if (this.multi) {
            this.selected.has(item)
                ? this.selected.delete(item)
                : this.selected.add(item);
        } else {
            this.selected.clear();
            this.selected.add(item);
        }
    }
    filter(term) {
        return this.options.filter(o =>
            o.toLowerCase().includes(term.toLowerCase())
        );
    }
    updateOptions(newOptions) {
        const validOptions = newOptions
            .map(opt => (typeof opt === 'number' && Number.isInteger(opt) ? String(opt) : opt))
            .filter(opt => typeof opt === 'string' && opt.trim() !== '');
        this.options = validOptions;
        
        // if (this.multi) {
        //     // Para multi-select, pré-selecionar todas as novas opções
        //     this.selected = new Set(validOptions);
        // } else {
            // Para single-select, manter apenas seleções válidas
            this.selected = new Set(
                Array.from(this.selected).filter(item => validOptions.includes(item))
            );
        // }
    }
    getSelected() {
        return Array.from(this.selected);
    }

    selectAll() {
        if (this.multi) {
            this.options.forEach(option => this.selected.add(option));
        }
    }

    deselectAll() {
        this.selected.clear();
    }

    isAllSelected() {
        return this.multi && this.options.length > 0 && this.options.every(opt => this.selected.has(opt));
    }
}
