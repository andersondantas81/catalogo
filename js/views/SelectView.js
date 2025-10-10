export default class SelectView {
    constructor(root, placeholder='', multi = false, titulo = 'Selecione…') {
        this.root = root;
        this.placeholder = placeholder;
        this.titulo = titulo;
        this.multi = multi;
        this.isOpen = false;
        this.selectedValues = [];
        this._initDOM();
        this._setupEventListeners();
    }

    _initDOM() {
        this.root.innerHTML = '';
        this.root.className = 'relative';
        const titleEl = document.createElement('span');
        titleEl.className = 'block text-sm font-medium text-gray-700';
        titleEl.textContent = this.titulo;
        this.root.append(titleEl);

        this.trigger = document.createElement('div');
        this.trigger.className =
            'flex items-center justify-between border border-gray-300 bg-white rounded-lg px-4 py-3 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 hover:border-gray-400';
        this.textEl = document.createElement('span');
        this.textEl.className = 'text-gray-900 truncate flex-1 pr-3 text-sm leading-5';
        this.textEl.style.minWidth = '0';
        this.trigger.appendChild(this.textEl);
        
        const arrow = document.createElement('svg');
        arrow.setAttribute('viewBox', '0 0 20 20');
        arrow.className = 'w-5 h-5 text-gray-400 transition-all duration-200 flex-shrink-0';
        arrow.innerHTML = '<path fill="currentColor" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z"/>';
        this.arrow = arrow;
        this.trigger.appendChild(arrow);

        this.dropdown = document.createElement('div');
        this.dropdown.className =
            'absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg hidden max-w-none';
        this.dropdown.style.minWidth = '100%';
        const wrap = document.createElement('div');
        wrap.className = 'py-2';

        if (this.multi) {
            this.searchInput = document.createElement('input');
            this.searchInput.type = 'text';
            this.searchInput.placeholder = 'Pesquisar opções…';
            this.searchInput.className =
                'w-full mx-3 mb-2 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500';
            this.searchInput.style.width = 'calc(100% - 1.5rem)';
            wrap.appendChild(this.searchInput);
        }

        this.optionsContainer = document.createElement('div');
        this.optionsContainer.className =
            'max-h-60 overflow-auto';
        wrap.appendChild(this.optionsContainer);

        this.dropdown.appendChild(wrap);
        this.root.append(this.trigger, this.dropdown);
    }

    _setupEventListeners() {
        this.dropdown.addEventListener('click', e => e.stopPropagation());
        this._handleDocumentClick = (e) => {
            if (!this.root.contains(e.target) && this.isOpen) {
                this.close();
            }
        };
    }

    bindToggle(cb) {
        if (this._toggleHandler) {
            this.trigger.removeEventListener('click', this._toggleHandler);
        }
        
        this._toggleHandler = (e) => {
            e.stopPropagation();
            e.preventDefault();
            cb();
        };
        this.trigger.addEventListener('click', this._toggleHandler);
        document.addEventListener('click', this._handleDocumentClick);
    }

    bindSearch(cb) {
        if (this.multi && this.searchInput) {
            if (this._searchHandler) {
                this.searchInput.removeEventListener('input', this._searchHandler);
            }
            this._searchHandler = (e) => cb(e.target.value);
            this.searchInput.addEventListener('input', this._searchHandler);
        }
    }

    updateOptions(newOptions, currentSelected = []) {
        if (currentSelected.length === 0) {
            currentSelected = this.selectedValues;
        }
        const validSelectedValues = currentSelected.filter(value => 
            newOptions.includes(value)
        );

        this.selectedValues = validSelectedValues;
        this.renderOptions(newOptions, validSelectedValues);
        this.renderTrigger(validSelectedValues);

        return validSelectedValues;
    }

    getSelectedValues() {
        return [...this.selectedValues];
    }

    setSelectedValues(values) {
        this.selectedValues = Array.isArray(values) ? values : [values];
        this.renderTrigger(this.selectedValues);
    }

    renderOptions(opts, sel) {
        this.optionsContainer.innerHTML = '';
        
        if (this.multi && opts.length > 0) {
            const selectAllLabel = document.createElement('label');
            selectAllLabel.className = 'flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-200 bg-gray-50';
            
            const selectAllSpan = document.createElement('span');
            selectAllSpan.className = 'text-gray-900 flex-1 pr-3 text-sm leading-5 font-medium';
            selectAllSpan.textContent = 'Selecionar todos';
            
            const selectAllInput = document.createElement('input');
            selectAllInput.type = 'checkbox';
            selectAllInput.value = '__SELECT_ALL__';
            selectAllInput.className = 'h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 flex-shrink-0';
            
            const allSelected = opts.length > 0 && opts.every(opt => sel.includes(opt));
            selectAllInput.checked = allSelected;
            selectAllInput.indeterminate = !allSelected && sel.length > 0;
            
            selectAllLabel.append(selectAllSpan, selectAllInput);
            this.optionsContainer.append(selectAllLabel);
        }
        
        opts.forEach(opt => {
            const id = `opt-${Math.random().toString(36).substr(2, 9)}-${opt.replace(/\s+/g, '')}`;
            const label = document.createElement('label');
            label.className = 'flex items-center px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors duration-150';
            label.title = opt;

            const span = document.createElement('span');
            span.className = 'text-gray-900 flex-1 pr-3 text-sm leading-5 break-words';
            span.textContent = opt;
            span.style.minWidth = '0';
            span.style.wordBreak = 'break-word';
            span.style.overflowWrap = 'break-word';

            const inp = document.createElement('input');
            inp.type = this.multi ? 'checkbox' : 'radio';
            inp.name = this.multi ? `multi-${Math.random()}` : `single-${Math.random()}`;
            inp.value = opt;
            inp.id = id;
            inp.checked = sel.includes(opt);
            inp.className = 'h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 flex-shrink-0';

            label.append(span, inp);
            this.optionsContainer.append(label);
        });
        
        this.selectedValues = sel;
    }

    bindOption(cb) {
        if (this._optionHandler) {
            this.optionsContainer.removeEventListener('change', this._optionHandler);
        }
        
        this._optionHandler = (e) => {
            if (e.target.matches('input')) {
                const value = e.target.value;
                const isChecked = e.target.checked;
                
                if (value === '__SELECT_ALL__' && this.multi) {
                    const allOptions = Array.from(this.optionsContainer.querySelectorAll('input[type="checkbox"]:not([value="__SELECT_ALL__"])'))
                        .map(input => input.value);
                    
                    if (isChecked) {
                        allOptions.forEach(option => {
                            if (!this.selectedValues.includes(option)) {
                                this.selectedValues.push(option);
                                cb(option, true, this.selectedValues);
                            }
                        });
                    } else {
                        allOptions.forEach(option => {
                            const index = this.selectedValues.indexOf(option);
                            if (index > -1) {
                                this.selectedValues.splice(index, 1);
                                cb(option, false, this.selectedValues);
                            }
                        });
                    }
                    
                    this.optionsContainer.querySelectorAll('input[type="checkbox"]:not([value="__SELECT_ALL__"])')
                        .forEach(input => {
                            input.checked = isChecked;
                        });
                    this.renderTrigger(this.selectedValues);
                    
                    return;
                }
                
                if (this.multi) {
                    if (isChecked) {
                        if (!this.selectedValues.includes(value)) {
                            this.selectedValues.push(value);
                        }
                    } else {
                        this.selectedValues = this.selectedValues.filter(v => v !== value);
                    }
                    
                    const selectAllCheckbox = this.optionsContainer.querySelector('input[value="__SELECT_ALL__"]');
                    if (selectAllCheckbox) {
                        const allOptions = Array.from(this.optionsContainer.querySelectorAll('input[type="checkbox"]:not([value="__SELECT_ALL__"])'))
                            .map(input => input.value);
                        const allSelected = allOptions.length > 0 && allOptions.every(opt => this.selectedValues.includes(opt));
                        const someSelected = this.selectedValues.length > 0;
                        
                        selectAllCheckbox.checked = allSelected;
                        selectAllCheckbox.indeterminate = !allSelected && someSelected;
                    }
                } else {
                    this.selectedValues = isChecked ? [value] : [];
                }
                
                this.renderTrigger(this.selectedValues);
                cb(value, isChecked, this.selectedValues);
            }
        };
        
        this.optionsContainer.addEventListener('change', this._optionHandler);
    }


    renderTrigger(sel) {
        const count = sel.length;
        if (count === 0) {
            this.textEl.textContent = this.placeholder || "Todos";
            this.textEl.className = 'text-gray-500 truncate flex-1 pr-3 text-sm leading-5';
            //this.textEl.className = this.multi ? 'text-gray-900 truncate flex-1 pr-3 text-sm leading-5 font-medium' : 'text-gray-500 truncate flex-1 pr-3 text-sm leading-5';
            this.textEl.title = '';
        } else if (this.multi) {
            const firstItem = sel[0];
            const countText = count > 1 ? ` (+${count - 1})` : '';
            const fullText = `${firstItem}${countText}`;
            
            if (firstItem.length > 30) {
                this.textEl.textContent = `${count} ite${count > 1 ? 'ns' : 'm'} selecionado${count > 1 ? 's' : ''}`;
            } else {
                this.textEl.textContent = fullText;
            }
            
            this.textEl.className = 'text-gray-900 truncate flex-1 pr-3 text-sm leading-5 font-medium';
            const tooltip = sel.length > 3 
                ? `${sel.slice(0, 3).join(', ')} e mais ${sel.length - 3} item${sel.length - 3 > 1 ? 'ns' : ''}...`
                : sel.join(', ');
            this.textEl.title = tooltip;
        } else {
            this.textEl.textContent = sel[0];
            this.textEl.className = 'text-gray-900 truncate flex-1 pr-3 text-sm leading-5';
            this.textEl.title = sel[0];
        }
    }

    toggle(show = !this.isOpen) {
        this.isOpen = show;
        
        if (show) {
            this.dropdown.classList.remove('hidden');
            this.arrow.style.transform = 'rotate(180deg)';
            this.arrow.classList.add('text-green-500');
            this.trigger.classList.add('ring-2', 'ring-green-500', 'border-green-500');
            if (this.multi && this.searchInput) {
                setTimeout(() => this.searchInput.focus(), 100);
            }
        } else {
            this.dropdown.classList.add('hidden');
            this.arrow.style.transform = 'rotate(0deg)';
            this.arrow.classList.remove('text-green-500');
            this.trigger.classList.remove('ring-2', 'ring-green-500', 'border-green-500');
        }
    }

    open() {
        this.toggle(true);
    }

    close() {
        this.toggle(false);
    }

    destroy() {
        if (this._toggleHandler) {
            this.trigger.removeEventListener('click', this._toggleHandler);
        }
        if (this._searchHandler && this.searchInput) {
            this.searchInput.removeEventListener('input', this._searchHandler);
        }
        if (this._optionHandler) {
            this.optionsContainer.removeEventListener('change', this._optionHandler);
        }
        document.removeEventListener('click', this._handleDocumentClick);
    }
}