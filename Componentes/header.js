const headElement  = document.getElementsByTagName('head')[0];

const link  = document.createElement('link');

link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = '../css/output.css';

headElement.appendChild(link);

const nav = document.querySelector('header-component');
const value = nav.getAttribute('data-text');
const value2 = nav.getAttribute('data-text2');

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Navigation Bar -->
            <nav class="flex items-center justify-center gradient-navbar h-16">
                <div class="flex items-center justify-center w-full max-w-5xl px-4">
                    <a href="https://cisec.esp.ce.gov.br/"
                    class="absolute left-0 inline-flex items-center px-3 py-1.5 rounded-md text-white hover:bg-bg-voltar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="h-6 w-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                        </path>
                    </svg>
                    <span class="ml-1 font-bold text-lg">VOLTAR</span>
                    </a>
                    <h1 class="inline-flex px-5 py-1.5 text-3xl text-white md:hidden font-semibold">${value2}</h1>
                    <h1 class="inline-flex items-center text-2xl text-white hidden md:!block font-semibold">${value}</h1>
                </div>
            </nav>
        `;
    }
}

customElements.define('header-component', Header);