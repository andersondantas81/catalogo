class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <img src="../img/LinhaRodape.png" alt="Linha Rodapé" class="w-full h-auto"></img>
            <footer class="bg-gray-100 py-4">
                <div class="container mx-auto">
                    <div class="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
                        <div>
                             <!-- Este conteúdo será exibido em telas menores-->
                            <img src="../img/Coloridas.png" alt="Logos" class="block sm:hidden w-[380px] h-auto mx-auto">
                            <!-- Este conteúdo só será exibido em telas maiores que 640px (classe "sm") -->
                            <img src="../img/Coloridas.png" alt="Logos" class="hidden sm:block w-[400px] h-auto">
                        </div>
                    
                        <!-- Texto do footer -->
                        <div class="text-left text-sm text-gray-700">
                            <p>Av. Antônio Justa, 3161, Meireles - Fortaleza, CE</p>
                            <p>E-mail: <a href="mailto:centrodeinteligencia@esp.ce.gov.br" class="text-green-600 hover:underline">centrodeinteligencia@esp.ce.gov.br</a></p>
                            <p>Fonte: Diretoria de Educação Permanente e Profissional em Saúde (DIEPS)</p>
                            <!-- <div class="hidden sm:flex items-center text-sm text-gray-500 italic mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Atualizado em: <span id="data-atualizacao" class="ml-1">--/--/----</span>
                            </div> -->
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

if (!customElements.get('footer-component')) {
    customElements.define('footer-component', Footer);
}


