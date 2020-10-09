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
          type: 'bar',
          data: {
              labels: periodos,
              datasets: [{
                  label: 'Pago $',
                  data: pagos,
                  backgroundColor: [ "#7406CF","#9366B8","#D6A7FC","#806695",
                  "#573375","#18FE11","#0A9F05","#91BF90","#045D02",
                  "#E80D1A","#AB010C","#620E13","#764447","#D68287",
                  "#BD5B0F","#8B4208","#CF9A70","#684931","#E5A26F",
                  "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
                  "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
                  "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
                  "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
                  "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"],
              }]
          },
          options: {
            textColor: "#FFFFFF",
            responsive: false,
            title: {
              display: true,
              text: 'Pagos ENR por periodo'
            },
            legend: { display: false },
            scales: {
              xAxes: [{
                  barPercentage: 0.5
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
                  backgroundColor: [ "#7406CF","#9366B8","#D6A7FC","#806695",
                  "#573375","#18FE11","#0A9F05","#91BF90","#045D02",
                  "#E80D1A","#AB010C","#620E13","#764447","#D68287",
                  "#BD5B0F","#8B4208","#CF9A70","#684931","#E5A26F",
                  "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
                  "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
                  "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
                  "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
                  "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"],
              }]
          },
          options: {
            textColor: "#FFFFFF",
            responsive: false,
            title: {
              display: true,
              text: 'Casos ENR por red eléctrica'
            },
            legend: { display: false }
          }
        });

      }
    );
    
  }


   getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

}

