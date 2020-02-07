import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { metodologia } from 'src/app/models/metodologiaCal';
import { MetodologiaCalcService } from 'src/app/service/metodologia-calc.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { callbackify } from 'util';

@Component({
  selector: 'app-metodologia-calculo',
  templateUrl: './metodologia-calculo.component.html',
  styleUrls: ['./metodologia-calculo.component.css']
})
export class MetodologiaCalculoComponent implements OnInit {

 
  metodo: metodologia[];
  dataTable: any;

  metCodigo : metodologia = new metodologia();
  eliMetCodigo : metodologia = new metodologia();

  constructor( private metodologiaENR : MetodologiaCalcService,private chRef: ChangeDetectorRef) { }


  public editarMetologia(met) {
    this.metCodigo = met;

    //console.log(codigo);
  }

  

  public eliminarMetologia(met) {
    this.eliMetCodigo = met;

    //console.log(codigo);
  }


  public  mostrarDivAgregarMet() {
    $("#divAgregarMet").show();
  }

  public  ocultarDivAgregarMet() {   
  $("#divAgregarMet").toggle(1500);
  $("#metTipo").val('');
  $("#metTipoENR").val('');
  $("#tipoEdesal").val('');
  }


 


  ngOnInit() {
    $("#divAgregarMet").hide();

    this.metodologiaENR.getMetodologiaCalc().subscribe(
      response => {

        this.metodo = response;

        this.chRef.detectChanges();

        const table: any = $('#metodologia_tbl');

        this.dataTable = table.DataTable({
        'responsive': true,

        'language' : {
          'sProcessing':     'Procesando...',
          'sLengthMenu':     'Mostrar _MENU_ registros',
          'sZeroRecords':    'No se encontraron resultados',
          'sEmptyTable':     'Ningún dato disponible en esta tabla',
          'sInfo':           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
          'sInfoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
          'sInfoFiltered':   '(filtrado de un total de _MAX_ registros)',
          'sInfoPostFix':    '',
          'sSearch':         'Buscar:',
          'sUrl':            '',
          'sInfoThousands':  ',',
          'sLoadingRecords': 'Cargando...',
          'oPaginate': {
              'sFirst':    'Primero',
              'sLast':     'Último',
              'sNext':     'Siguiente',
              'sPrevious': 'Anterior'
          },
          'oAria': {
              'sSortAscending':  ': Activar para ordenar la columna de manera ascendente',
              'sSortDescending': ': Activar para ordenar la columna de manera descendente'
          }
        }
        });
      },
      err => {},
      () => {}
    );
  }

}


