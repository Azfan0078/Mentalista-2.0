const contadorDeChances = document.getElementById('contadorDeChances')
const selecioneMensagem = document.getElementById('selecioneMensagem')
const res = document.getElementById('res')
const taxaDePontos = document.getElementById('taxaDePontos')
var jogadores = []
var tabela = {}

const radio = document.getElementsByName('dificuldade')
const radioDificuldade = document.getElementById('radioDificuldade')
const divSel = document.getElementById('divSel')
const sel = document.getElementById('sel')

var mensagem = document.getElementById('mensagem')

var chances = ''
const botoes = document.getElementById('botoes')

var valorSecreto = ''

var indice = 0

function qualSelecionado(){

    if(radio[0].checked){
        sel.style.display = 'initial'
        return 'facil'
    }else if(radio[1].checked){
        sel.style.display = 'initial'
        return 'normal'
    }else if(radio[2].checked){
        sel.style.display = 'initial'
        return 'dificil'

    }else {
        return 'false'
    }

}

function selecionar(){

    if (qualSelecionado() != 'false'){
        radioDificuldade.style.display='none'
        divSel.innerHTML = ''

        selecioneMensagem.innerHTML = 'Digite o nome do jogador'
        botoes.innerHTML = `<label for="nomeJogador">Nome do jogador: </label>`
        botoes.innerHTML += `<input type="text" name="nomeJogador" id="nomeJogador">`
        botoes.innerHTML += `<input type="button" value="Iniciar jogo" onclick="iniciarJogo()">`
        botoes.innerHTML += `<input type="button" value="Voltar para o menu" onclick="voltarMenu()" id="voltarMenu">`
    }else {
        alert('[ERRO] Selecione uma dificuldade')
    }
}

function voltarMenu(){

    radioDificuldade.style.display ='initial'
    botoes.innerHTML=('')
    selecioneMensagem.innerHTML=('Selecione uma dificuldade')
    divSel.innerHTML = (`<input type="button" value="Selecionar" onclick="selecionar()" class="botoes" id="sel">`)
    desfazerTabela()
}

function desfazerTabela(){

    tabela = {}
    jogadores = []
    indice = 0
    valorSecreto = ''
    var tabelaJogadores = document.getElementById('tabelaJogadores')
    tabelaJogadores.innerHTML = ''
    

}

function jaAdicionado(nome,lista){

     if(lista.indexOf(nome) != -1){
        return true
    }else{
        return false
     }
}

function verificarCaixa(){
    if(nomeJogador.value.length != 0){
        return true
    }else{
        return false
    }
}

function iniciarJogo(){
    chances = 3
    const nomeJogador = document.getElementById('nomeJogador')

    function quemTaJogando(){

         for(let i = 0 ; i < jogadores.length ; i++){
            if(nomeJogador.value == tabela[i].nome){
                return tabela[i].indentificador
            }else {}
        }
     }

    if(verificarCaixa() == true ){

        if(jaAdicionado(nomeJogador.value,jogadores)){

            valorSecreto = parseInt(gerarNumero())

            mostrarPlacar(tabela,quemTaJogando())

            /*switch (qualSelecionado()){
                case 'facil' :
                    chances = 3
                break                       Este campo é util para módificar o numero de chances. OBS: deve configurar o campo de pontos também
        
                case 'normal' : 
                    chances = 3
                break
            }  */

            switch (qualSelecionado()){

                case 'facil' :
                    mensagem.innerHTML = 'Digite um número de 0 à 10'
                    aparecerCaixas()
                    contadorDeChances.innerHTML = `SUAS CHANCES<br> ${chances}`
                    selecioneMensagem.innerHTML = ''
                break

                case 'normal' :
                    mensagem.innerHTML = 'Digite um número de 0 à 20'
                    aparecerCaixas()
                    contadorDeChances.innerHTML = `SUAS CHANCES<br> ${chances}`
                    selecioneMensagem.innerHTML = ''
                break

                case 'dificil':
                    mensagem.innerHTML = 'Digite um número de 0 à 50'
                    aparecerCaixas()
                    contadorDeChances.innerHTML = `SUAS CHANCES<br> ${chances}`
                    selecioneMensagem.innerHTML = ''
            }
        }else{
            valorSecreto = parseInt(gerarNumero())

            jogadores.push(nomeJogador.value)
            adicionarNaTabela()

            mostrarPlacar(tabela,quemTaJogando())
            
            /*switch (qualSelecionado()){
                case 'facil' :
                    chances = 3
                break                   
                                        Este campo é util para módificar o numero de chances. OBS: deve configurar o campo de pontos também
                case 'normal' : 
                    chances = 3
                break
            }*/
            
            switch (qualSelecionado()){

                case 'facil' :
                    mensagem.innerHTML = 'Digite um número de 0 à 10'
                    aparecerCaixas()
                    contadorDeChances.innerHTML = `SUAS CHANCES<br> ${chances}`
                    selecioneMensagem.innerHTML = ''
                break

                case 'normal' :
                    mensagem.innerHTML = 'Digite um número de 0 à 20'
                    aparecerCaixas()
                    contadorDeChances.innerHTML = `SUAS CHANCES<br> ${chances}`
                    selecioneMensagem.innerHTML = ''
                break

                case 'dificil':
                    mensagem.innerHTML = 'Digite um número de 0 à 50'
                    aparecerCaixas()
                    contadorDeChances.innerHTML = `SUAS CHANCES<br> ${chances}`
                    selecioneMensagem.innerHTML = ''
            }       
        } 
    }else {alert('Digite o nome do jogador! ')}
}

function adicionarNaTabela(){       
        
     tabela[indice] = {nome:jogadores[indice],vitorias : 0 , derrotas : 0 ,pontosDeChances : 0, pontos : 0, indentificador : indice} 
        indice++     //Tive que usar esta variavel no lugar de um looping, para não alterar todos os valores da tabela, a cada chamada.

}

function calcularPontos(i){
        let pontos = (tabela[i].vitorias *5) - (tabela[i].derrotas *5) + (tabela[i].pontosDeChances)
        return pontos
}
    
function mostrarPlacar(tabela,jogadorAtual){
    let elemento = ''
        
        for(let i = 0; i < jogadores.length ; i++){

            tabela[jogadorAtual].pontos = calcularPontos(jogadorAtual)
            elemento +=  `<tr>`
            elemento +=  `<td>${tabela[i].nome}</td>`
            elemento +=  `<td>${tabela[i].vitorias}</td>`
            elemento +=  `<td>${tabela[i].derrotas}</td>`
            elemento +=  `<td>${tabela[i].pontosDeChances}</td>`
            elemento +=  `<td>${tabela[i].pontos}<td>`
            elemento +=  "</tr>"
        }

    var tabelaJogadores = document.getElementById('tabelaJogadores')
    tabelaJogadores.innerHTML = elemento
    valor = jogadorAtual
}

function aparecerCaixas(){

    botoes.innerHTML = `<input type="number" name="numero" id="numero" class="objeto"> <br>`
    botoes.innerHTML += `<input type="submit" value="Chutar" id=Chutar onclick="Chutar()" class="objeto"><br>`
    botoes.innerHTML += `<input type="submit" value="Voltar" id="voltar" onclick="voltar()" class="objeto"<br>`

}

function gerarNumero(){

    if(qualSelecionado() == 'facil'){
        return Math.random() * 11

    }else if(qualSelecionado() == 'normal'){

         return Math.random() * 21

    }else if(qualSelecionado() == 'dificil'){
        return Math.random() * 51

    }

    
}

function verificarNumero(numero){
    
    if(qualSelecionado() == 'facil'){
        if(numero <0 || numero > 10 || numero.length ==0){
            return true
        }else {
            return false
        }
    }else if(qualSelecionado() == 'normal'){
        if(numero <0 || numero > 20 || numero.length ==0){
            return true
        }else {
            return false
        }
    }else if (qualSelecionado() == 'dificil'){

        if(numero <0 || numero > 50 || numero.length ==0){
            return true
        }else {
            return false
        }
    }
}   

function quantasChances(){
    if(chances == 2){
        return 20
    }else if(chances == 1){
        return 15
    }else if (chances == 0) {
        return 10
    }
}

function Chutar(){      
    
    chances--
    
    const valorDigitado = document.getElementById('numero')
    const chutar = document.getElementById('Chutar')

    if(verificarNumero(valorDigitado.value) == true ){
        alert('{ERRO] Digite um numero de 0 à 10')

    }else if(valorDigitado.value == valorSecreto){

        tabela[valor].pontosDeChances += (quantasChances())
        tabela[valor].vitorias ++
        
        res.innerHTML = `Parabens você acertou e recebeu ${quantasChances() + 5 } pontos<br>Aperte 'voltar' para jogar novamente`
        
        valorDigitado.remove()
        chutar.remove()

        mostrarPlacar(tabela,valor)

    }else if(chances <= 0){

        tabela[valor].derrotas += 1

        res.innerHTML = `Você perdeu, e sua derrota lhe custou 5 pontos!<br> O valor secreto era ${valorSecreto}<br>Aperte 'voltar' para jogar novamente`

        contadorDeChances.innerHTML=''
        valorDigitado.remove()
        mensagem.innerHTML = ''
        chutar.remove()

        mostrarPlacar(tabela,valor)

    }else if(valorSecreto < valorDigitado.value){

        contadorDeChances.innerHTML = `SUAS CHANCES <br> ${chances}`
        res.innerHTML = `Que pena, você errou.<br> O valor é menor do que ${valorDigitado.value}.`
                
     }else{

        contadorDeChances.innerHTML = `SUAS CHANCES <br> ${chances}`
         res.innerHTML = `Que pena, você errou.<br> O valor é maior do que ${valorDigitado.value}.`
    }
                   
      
}

function voltar(){

    valor = ''
    selecionar()
    contadorDeChances.innerHTML = ''
    mensagem.innerHTML = ''
    res.innerHTML = ''
    
}