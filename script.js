const MILESEGUNDO = 1000;
const CINCO_MINUTOS = 300;
const QUINZE_MINUTOS = 900;
const VINTE_CINCO_MINUTOS = 1500;

const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');

const imgIconeBt = document.querySelector('.app__card-primary-butto-icon');

const titulo = document.querySelector('.app__title');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');

const somBeep = new Audio('/sons/beep.mp3');
somBeep.volume = 0.05;


let intervaloId = null;
let tempoDecorridoEmSegundos = VINTE_CINCO_MINUTOS;


const musicaFocoInput = document.querySelector('#alternar-musica');
musicaFocoInput.addEventListener('change', () => musica.paused ? musica.play() : musica.pause());


const focoBt = document.querySelector('.app__card-button--foco');
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = VINTE_CINCO_MINUTOS;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

const curtoBt = document.querySelector('.app__card-button--curto');
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = CINCO_MINUTOS;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

const longoBt = document.querySelector('.app__card-button--longo');
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = QUINZE_MINUTOS;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

const startPauseBt = document.querySelector('#start-pause');
startPauseBt.addEventListener('click', iniciarOuPausar);


function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(element => element.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar
            à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;

        default:
            break;
    }
}

function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        somBeep.play();        
        alert('Tempo finalizado...');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();    
}

function iniciarOuPausar() {
    if (intervaloId) {        
        zerar();
        return;
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);    
    iniciarOuPausarBt.textContent = 'Pausar';
    imgIconeBt.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    somPause.play();
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    imgIconeBt.setAttribute('src', '/imagens/play_arrow.png');
}

function mostrarTempo(){    
    const tempo = new Date(tempoDecorridoEmSegundos * MILESEGUNDO);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();