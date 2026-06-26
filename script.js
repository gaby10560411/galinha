// Seleciona o botão e o conteúdo de texto
const btnOuvir = document.getElementById('btn-ouvir');
const conteudo = document.getElementById('conteudo-principal');

let tocando = false;
let sintese = window.speechSynthesis;
let escopoLeitura;

btnOuvir.addEventListener('click', () => {
    // Se já estiver tocando, ele para a leitura
    if (tocando) {
        sintese.cancel();
        alterarBotao(false);
        return;
    }

    // Pega todo o texto visível de dentro do conteúdo principal
    const textoParaLer = conteudo.innerText;

    if (textoParaLer.trim() !== "") {
        escopoLeitura = new SpeechSynthesisUtterance(textoParaLer);
        
        // Define o idioma para Português do Brasil
        escopoLeitura.lang = 'pt-BR';

        // Quando o áudio terminar naturalmente
        escopoLeitura.onend = () => {
            alterarBotao(false);
        };

        // Quando houver algum erro
        escopoLeitura.onerror = () => {
            alterarBotao(false);
        };

        // Inicia a leitura
        sintese.speak(escopoLeitura);
        alterarBotao(true);
    }
});

// Função para mudar o estado visual do botão
function alterarBotao(estaTocando) {
    tocando = estaTocando;
    if (estaTocando) {
        btnOuvir.innerText = "🛑 Parar Leitura";
        btnOuvir.classList.add('tocando');
    } else {
        btnOuvir.innerText = "🔊 Ouvir Página";
        btnOuvir.classList.remove('tocando');
    }
}

// Garante que se o usuário fechar ou recarregar a página, o áudio pare imediatamente
window.addEventListener('beforeunload', () => {
    sintese.cancel();
});