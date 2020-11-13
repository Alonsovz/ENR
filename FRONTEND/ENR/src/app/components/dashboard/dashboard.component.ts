import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { GlobalService } from 'src/app/service/global.service';
import { Repositorio } from 'src/app/models/repositorio';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  pagosENRLista : any;
  casosRedENRLista : any;
  cobro: any;
  cobroTotal: any;
  ing: any;
  calc: any;
  noti: any;
  el: any;
  constructor(
    private pagosENR: GlobalService
  ) { }

  ngOnInit() { 

    this.pagosENR.getPagosENR().subscribe(
      response => {

        this.pagosENRLista = response;
        let periodos = [];
        let pagos = [];

       

        this.pagosENRLista.forEach(element => {
          periodos.push(element["periodo"]);
          pagos.push(element["pagos"]);
         
        });

        //console.log(pagos);
        this.canvas = document.getElementById('pagosENR');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'line',
          data: {
              labels: periodos,
              fontColor: 'white',
              datasets: [{
                  label: 'Cobro $',
                  data: pagos,
                  backgroundColor: [ 
                    "rgba(189,236,182,0.2)"],
                    borderColor: "#DD04FB",

              }]
          },
          options: {
           
            responsive: false,
            title: {
              display: true,
              text: 'Cobros ENR por periodo',
              fontColor: "#FBF404",
              fontSize: 16,
              fontStyle: "normal", 
            },
            legend: { display: false, },
            scales: {
              xAxes: [{
                  barPercentage: 0.3,
                  ticks: {
                    fontColor: "white",
                  }
              }],
              yAxes: [{
                ticks: {
                  fontColor: "white",
                }
            }]
          }
          }
        });

      }
    );

   

    this.pagosENR.getCasosRed().subscribe(
      response => {

        this.casosRedENRLista = response;
        let red = [];
        let casos = [];

       

        this.casosRedENRLista.forEach(element => {
          red.push(element["red_electrica"]);
          casos.push(element["casos"]);
         
        });

        //console.log(pagos);
        this.canvas = document.getElementById('casosRed');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'doughnut',
          data: {
              labels: red,
              datasets: [{
                  label: 'Casos',
                  data: casos,
                  backgroundColor: [
                  "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",
                  "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
                  "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
                  "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC",
                  "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
                  "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
                  "#CAFADB","#F8BAA1","#A1F8DB","#D2A1F8","#F8A1B5",
                  "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC"],
              }]
          },
          options: {
           
            responsive: false,
            title: {
              display: true,
              text: 'Casos ENR por red eléctrica',
              fontColor: "#32FC05",
              fontSize: 16,
              fontStyle: "normal",
            },
            legend: { display: false }
          }
        });

      }
    );
    


    this.pagosENR.getCuadroAcumulado().subscribe(
      response => {
        this.cobro = response;


        let periodos = [];
        let cobro = [];
        let acumulado = [];

       

        this.cobro.forEach(element => {
          periodos.push(element["periodo"]);
          cobro.push(element["cobroPeriodo"]);
         acumulado.push(element["cobroAcumulado"]);
        });

        //console.log(pagos);
        this.canvas = document.getElementById('cobroAcumuladoENR');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'bar',
          data: {
              labels: periodos,
              datasets: [{
                  label: 'Cobro $',
                  data: cobro,
                  backgroundColor: [
                    "#CAFADB","#F8BAA1","#A1F8DB","#D2A1F8","#F8A1B5",
                    "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
                    "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC",
                    "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
                 
                  "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
                  "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
                  "#CAFADB","#F8BAA1","#A1F8DB","#D2A1F8","#F8A1B5",
                  "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC"],
              },
              {
                label: "Acumulado $",
                type: "line",
                borderColor: "#3e95cd",
                data: acumulado,
                backgroundColor : "rgba(202,196,176,0.2)",
              }
            ]
          },
          options: {
            
            responsive: false,
            title: {
              display: true,
              text: 'Cuadro ENR acumulado',
              fontColor: "#05E9FC",
              fontSize: 16,
              fontStyle: "normal",
            },
            legend: { display: false },
            scales: {
              xAxes: [{
                  barPercentage: 0.3,
                  ticks: {
                    fontColor: "white",
                  }
              }],
              yAxes: [{
                ticks: {
                  fontColor: "white",
                }
            }]
          }
          }
        });

      }
    );

    this.pagosENR.getTotalCuadroAcumulado().subscribe(
      response => {
        this.cobroTotal = response;
      }
    );

    this.pagosENR.getCasosIng().subscribe(
      response => {
        this.ing = response;
      }
    );

    this.pagosENR.getCasosCalc().subscribe(
      response => {
        this.calc = response;
      }
    );

    this.pagosENR.getCasosNoti().subscribe(
      response => {
        this.noti = response;
      }
    );

    this.pagosENR.getCasosEl().subscribe(
      response => {
        this.el = response;
      }
    );

  }



}

