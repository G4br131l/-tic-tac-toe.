window.addEventListener('load', inicialização)

class Jogador{
    constructor(nome, marcador, vitorias, jogadas, posição, superName){
        this.nome = nome
        this.identificação = superName
        this.marcador = marcador
        this.vitorias = vitorias
        this.jogadas = jogadas
        this.posição = posição
    }
}
let continuar = true

function inicialização() {
    let [nameID1, nameID2] = ['jogador1'/*document.querySelector('#nameID1')*/, 'jogador2'/*document.querySelector('#nameID2')*/]
    let [j1, j2] = [document.querySelector('.j1'), document.querySelector('.j2')]
    let [vitorias1, vitorias2] = [0, 0] 
    let marcador1, marcador2
    let jogadas1,jogadas2
    if (Math.random() <= 0.5){
        [marcador1, marcador2] = ['X','O']
    }else{
        [marcador1,marcador2] = ['O','X']
    }
    
    if (Math.random() <= 0.5) {
        jogadas1 = 1
        jogadas2 = 0
    }else{
        [jogadas1,jogadas2] = [0, 0]
    }
    let [posi1,posi2] = [[], []]
    jogador1 = new Jogador(nameID1, marcador1, vitorias1, jogadas1, posi1, j1)
    jogador2 = new Jogador(nameID2, marcador2, vitorias2, jogadas2, posi2, j2)
    console.log(jogador1,jogador2)
    placar(jogador1,jogador2)

}
let jogador1 
let jogador2




function jogada(posicao,posLinha,posColuna) {
    const criarPos = a => document.querySelector(`.p${a}`)
    let pos = criarPos(posicao)
    if (jogador1.jogadas === jogador2.jogadas && pos.innerHTML == '' && continuar){
        pos.innerHTML = jogador1.marcador
        let [linhaX,colunaX] = [posLinha,posColuna]
        jogador1.posição.push([linhaX,colunaX])
        jogador1.jogadas++
        placar()
        inspetor(jogador1.posição, jogador1)
    }else if (pos.innerHTML == '' && continuar){
        pos.innerHTML=jogador2.marcador
        let [linhaO,colunaO] = [posLinha,posColuna]
        jogador2.posição.push([linhaO,colunaO])
        jogador2.jogadas++
        placar()
        inspetor(jogador2.posição, jogador2)
    }
    
}

function inspetor(locais, inspecionado){
    let ninguemVenceu = true
    // rows and columns
    
    if (locais.length>=3) {
        // 3 in the same rows
        
        // organized by rows
        locais.sort()
        // comparing each element
        for (let i = 0; i <= locais.length-3; i++){
            let n = Number(i)
            if (locais[n][0] == locais[n+1][0] && locais[n+1][0] == locais[n+2][0]){
                inspecionado.vitorias++
                ninguemVenceu = false
                vitoria(inspecionado)
            }
        }
        // 3 in the same columns
        
        // organized by columns
        locais.sort((a,b) => a[1]-b[1])
        // comparing each element
        for (let i = 0; i<= locais.length-3; i++){
            let n = Number(i)
            if (locais[n][1] == locais[n+1][1] && locais[n+1][1] == locais[n+2][1]){
                inspecionado.vitorias++
                ninguemVenceu = false
                vitoria(inspecionado)
            }
        }
    }

    // diagonals
    
    // r1c3 r2c2 r3c1
    let segDiagonal1,segDiagonal2,segDiangonal3
    for (let i in locais){
        if(locais[i][0] == 1 && locais[i][1] == 3){
            segDiagonal1 = true
        }else if ( locais[i][0] == 2 && locais[i][1] == 2){
            segDiagonal2 = true
        }else if (locais[i][0] == 3 && locais[i][1] == 1){
            segDiangonal3 = true
        }
    }
    if( segDiagonal1 && segDiagonal2 && segDiangonal3){
        inspecionado.vitorias++
        ninguemVenceu = false
        vitoria(inspecionado)
    }
    
    // 3 rows == columns
    locais.sort((a, b) => {
        if (a[0]==a[1]){
            return -1
        }else{
            return a[1]-b[1]
        }
    })
    for (let i = 0;i <= locais.length-3;i++){
        if((locais[i][0] == locais[i][1]) && (locais[i+1][0]==locais[i+1][1]) && (locais[i+2][0]== locais[i+2][1])){
            inspecionado.vitorias++
            ninguemVenceu = false
            vitoria(inspecionado)
        }
    }

    // tied
    if (jogador1.posição.length + jogador2.posição.length == 9 && ninguemVenceu){
        vitoria()
    }
}


function placar( placar1=jogador1,placar2=jogador2){
    if (placar1.jogadas == placar2.jogadas) {
        placar2.identificação.style.background = 'white'
        placar1.identificação.style.background = 'red'
    }else{
        placar1.identificação.style.background = 'white'
        placar2.identificação.style.background = 'cyan'
    }
    let [pontos1, marcador1] = [document.querySelector('#pontos1'), document.querySelector('#simbolo1')]
    let [pontos2, marcador2] = [document.querySelector('#pontos2'), document.querySelector('#simbolo2')]
    marcador1.innerHTML = placar1.marcador
    marcador2.innerHTML = placar2.marcador
    pontos1.innerHTML = placar1.vitorias
    pontos2.innerHTML = placar2.vitorias 
}

let rodaPe = document.querySelector('#rodape')

function vitoria(info){
    placar()
    if (info != undefined){
        info.identificação.style.background = 'green'
        if (info.nome !== 'jogador1'){
            jogador1.identificação.style.background = 'grey'
        }else{
            jogador2.identificação.style.background = 'grey'
        }
    }
    let resetar = document.createElement('input')
    resetar.type  = 'button'
    resetar.value = 'resetar tabuleiro'
    rodaPe.appendChild(resetar)
    resetar.addEventListener('click', () => {reset(info)})
    continuar = false
       
}

function reset(){
    for (let i = 0; i < 9; i++){
        let posi = document.querySelectorAll('.posicao')[i]
        posi.innerHTML = ''
    }
    jogador1.posição = []
    jogador2.posição = []
    rodaPe.innerHTML = ''
    continuar = true
    placar()
}
