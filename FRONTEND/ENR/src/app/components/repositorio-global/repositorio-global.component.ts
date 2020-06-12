import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Repositorio } from 'src/app/models/repositorio';
import { RepositorioEnrService } from 'src/app/service/repositorio-enr.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-repositorio-global',
  templateUrl: './repositorio-global.component.html',
  styleUrls: ['./repositorio-global.component.css']
})
export class RepositorioGlobalComponent implements OnInit {

  frmRangoFechas: FormGroup;
  datos: Repositorio[];
  dataTable: any;

  constructor(private repositorioENR : RepositorioEnrService,private chRef: ChangeDetectorRef) { 

    this.frmRangoFechas = new FormGroup({
      'fechaInicio': new FormControl('',[Validators.required]),
      'fechaFin': new FormControl('',[Validators.required]),
    });

  }

  ngOnInit() {
 
  }

  procesarTabla(){
    $("#loading").show();
    let datosENRdto : Repositorio = new Repositorio();
  
    datosENRdto = this.frmRangoFechas.value;

    this.repositorioENR.repositorioGlobal(datosENRdto).subscribe(
      response => {
  
        this.datos = response;
        const table: any = $('#datos_Tbl');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
        'responsive': true,
          'order' :[[0,'asc']],
  
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
      () => {
        $("#loading").hide();
        $("#data").show();
      }
    );
    
  }
}
