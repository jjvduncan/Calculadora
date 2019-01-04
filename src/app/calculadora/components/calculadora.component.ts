import { Component, OnInit } from '@angular/core';

import {  CalculadoraService} from '../service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string
  private numero2: string
  private resultado: number
  private operacao: string

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.limpar()
  }

  /**
   * Inicializa todos os operadores para os valores padrões
   * 
   */
  limpar(): void{
    this.numero1 = '0'
    this.numero2 = null
    this.resultado = null
    this.operacao = null
  }

  /**
   * Adiciona o número selecionado para o cálculo posteriomente.
   * 
   * @param string numero
   * @returns void
   */
  adicionarNumero(numero: string): void{
    if(this.operacao === null){
      this.numero1 = this.concatenarNumero(this.numero1, numero)
    }else{
        this.numero2 = this.concatenarNumero(this.numero2, numero)
      }
    }

/**
 * Retorna o valor concatenado e trata o valor decimal.
 * 
 * @param string numAtual
 * @param string numConcat
 * @returns string
 */

 concatenarNumero(numAtual: string, numConcat: string): string{
   // Caso contenha apenas '0' ou null, reinicia o valor
   if(numAtual === '0' || numAtual === null){
    numAtual = '';
   }
   // Se o primeiro digito for '.', concatena o '0' antes do ponto.
   if(numConcat === '.' && numAtual === ''){
    return '0.';
   }
   // Caso já exista um '.' e seja digitado outro, apenas retorna o conteúdo.
   if (numConcat === '.' && numAtual.indexOf('.') > -1){
    return numAtual;
   }
   return numAtual + numConcat
 }


 /**
  * Execulta a lógica quando um operador for selecionado.
  * Caso já possua uma operação selecionada, execulta a operação anterior, e define a nova operação.
  * 
  * @param string operacao
  * @returns void
  */

  definirOperacao(operacao: string){
    // Apenas define a operação caso não exista uma
    if(this.operacao === null){
      this.operacao = operacao;
      return;
    }
    
    // Caso a operação definida e o segundo número selecionado, efetua o calculo da operação.
    if(this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao
      this.numero1 = this.resultado.toString()
      this.numero2 = null
      this.resultado = null  
    }
  }

  /**
   * Efetua o cálculo de uma operação.
   * 
   * @return void
   */

  calcular(): void{
    if (this.numero2 === null){
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   * 
   * @return string
   */

   get display(): string{
     if(this.resultado !== null){
      return this.resultado.toString();
     }
     if(this.numero2 !== null){
      return this.numero2;
     }
     return this.numero1;
   }
  }