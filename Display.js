//Programa general

let Memoria = {
    operacion: [],
    resultado: 0
};

let memJSON = {};

class Display{
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.operacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: 'x',
            dividir: '/',
        }
    }

    borrar(){
        this.valorActual = this.valorActual.toString().slice(0, -1);
        this.mostrarValor();
    }

    borrarTodo(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.operacion = undefined;
        Memoria.operacion = [];
        Memoria.resultado = 0;
        this.mostrarValor();
    }

    computar(op) {
        Memoria.operacion.push(this.valorActual);
        Memoria.operacion.push(op)
        if(this.operacion !== 'igual'){
            this.calc()
        }
        
        Memoria.resultado = this.valorActual
        memJSON = JSON.stringify(Memoria);
        localStorage.setItem("Memoria", memJSON);
        
        this.operacion = op;
        if(this.valorActual.toString){
           this.valorAnterior = this.valorActual;
        }
        this.valorActual = '';
        this.mostrarValor();
    }

    agregarNumero(numero) {
        
        if(numero === '.' && this.valorActual.includes('.')){
            return
        }else{
            this.valorActual = this.valorActual.toString() + numero.toString();
            this.mostrarValor();
        }
        
    }

    mostrarValor(){
        this.displayValorActual.innerHTML = this.valorActual;
        this.displayValorAnterior.innerHTML = this.valorAnterior;
    }

    calc(){
        let valorAnterior = parseFloat(this.valorAnterior);
        let valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior)){
            return
        }else{
            this.valorActual = this.calculador[this.operacion](valorAnterior, valorActual);
        } 
    }
}