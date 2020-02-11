import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { metodologia } from 'src/app/models/metodologiaCal';
import { MetodologiaCalcService } from 'src/app/service/metodologia-calc.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { callbackify } from 'util';
import { FormGroup, FormControl } from '@angular/forms';
import notie from 'notie';


@Component({
  selector: 'app-metodologia-calculo',
  templateUrl: './metodologia-calculo.component.html',
  styleUrls: ['./metodologia-calculo.component.css']
})
export class MetodologiaCalculoComponent implements OnInit {

 
  metodo: metodologia[];
  dataTable: any;
  frmMetodologiaCalc: FormGroup;
  frmEditarMetodologiaCalc: FormGroup;
  frmEliminarMetodologiaCalc : FormGroup;

  metCodigo : metodologia = new metodologia();
  eliMetCodigo : metodologia = new metodologia();

  constructor( private metodologiaENR : MetodologiaCalcService,private chRef: ChangeDetectorRef) {

    this.frmMetodologiaCalc = new FormGroup({
      'codigo' : new FormControl(''),
      'TipoENR': new FormControl(''),
      'tipoEdesal': new FormControl(''),
      });
  
  
      this.frmEditarMetodologiaCalc = new FormGroup({
        'id' : new FormControl(''),
        'codigo' : new FormControl(''),
        'TipoENR': new FormControl(''),
        'tipoEdesal': new FormControl(''),
        });

        this.frmEliminarMetodologiaCalc = new FormGroup({
          'id' : new FormControl(''),
          });

   }


  public editarMetologia(met) {
    this.metCodigo = met;
    this.frmEditarMetodologiaCalc.setValue(met);
  }



  public saveMetodologiaCalc(){
    let metodologiaDTO : metodologia = new metodologia();

    metodologiaDTO = this.frmMetodologiaCalc.value;

    this.metodologiaENR.saveMetodologia(metodologiaDTO).subscribe(
      response => {},
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'success', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: 'Datos guardados con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.getMetodologiaCalc();
        $("#divAgregarMet").toggle(1500);
        this.frmMetodologiaCalc.reset();

      },
    );

  }


  public updateMetodologia(){
    let metodologiaDTO : metodologia = new metodologia();

    metodologiaDTO = this.frmEditarMetodologiaCalc.value;
    
    console.log(metodologiaDTO);
    this.metodologiaENR.updateMetodologia(metodologiaDTO).subscribe(
      response => {},
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'warning', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: 'Modificación realizada con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.getMetodologiaCalc();   
        this.frmEditarMetodologiaCalc.reset();

      },
    );

  }


  public deleteMetodologia(){
    let metodologiaDTO : metodologia = new metodologia();

    metodologiaDTO = this.frmEliminarMetodologiaCalc.value;
    
    console.log(metodologiaDTO);
    this.metodologiaENR.deleteMetodologia(metodologiaDTO).subscribe(
      response => {},
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: 'Eliminado con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.getMetodologiaCalc();   
        this.frmEliminarMetodologiaCalc.reset();

      },
    );

  }

  

  public eliminarMetologia(met) {
    this.eliMetCodigo = met;
    this.frmEliminarMetodologiaCalc.controls['id'].setValue(met.id);
    //console.log(codigo);
  }


  public  mostrarDivAgregarMet() {
    $("#divAgregarMet").show();
  }

  public  ocultarDivAgregarMet() {   
  $("#divAgregarMet").toggle(1500);
  this.frmMetodologiaCalc.reset();
  }


 


  ngOnInit() {
    $("#divAgregarMet").hide();

    this.metodologiaENR.getMetodologiaCalc().subscribe(
      response => {

        this.metodo = response;

        this.chRef.detectChanges();

        const table: any = $('#metodologia_tbl');

        this.dataTable = table.DataTable({
          'columnDefs':[{
            'targets':[0],
            'visible':false,
            'searchable':false,
        }],
        'responsive': true,
          'order' :[[0,'desc']],

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


  public getMetodologiaCalc(){
    this.metodologiaENR.getMetodologiaCalc().subscribe(
      data => {

        this.metodo = data;

        

        const table: any = $('#metodologia_tbl');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
          'columnDefs':[{
            'targets':[0],
            'visible':false,
            'searchable':false,
        }],
        'responsive': true,
          'order' :[[0,'desc']],

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


