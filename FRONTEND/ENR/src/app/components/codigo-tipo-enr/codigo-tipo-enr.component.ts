import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {CodigoENRService} from 'src/app/service/codigo-enr.service';
import { codigos } from 'src/app/models/codigos';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-codigo-tipo-enr',
  templateUrl: './codigo-tipo-enr.component.html',
  styleUrls: ['./codigo-tipo-enr.component.css']
})
export class CodigoTipoENRComponent implements OnInit {

  
  cod: codigos[];
  dataTable: any;
  codEdition : codigos = new codigos();
  eliCodigo : codigos = new codigos();


  constructor( private codigoENR : CodigoENRService,private chRef: ChangeDetectorRef) { }



  public editarCodigo(codigo) {
    this.codEdition = codigo;

    //console.log(codigo);
  }


  public eliminarCodigo(codigo) {
    this.eliCodigo = codigo;

    //console.log(codigo);
  }

  public  mostrarDivAgregarCode() {
    $("#divAgregarCode").show();
  }

  public  ocultarDivAgregarCode() {
    $("#divAgregarCode").toggle(1500);
    $("#codeTipo").val('');
    $("#codeTipoENR").val('');
    $("#tiempoRetroactivo").val('');
  }



  ngOnInit() {
    $("#divAgregarCode").hide();
    this.codigoENR.getCodigoENR().subscribe(
      response => {

        this.cod = response;

        this.chRef.detectChanges();

        const table: any = $('#codigos_tbl');

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

