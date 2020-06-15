import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {CodigoENRService} from 'src/app/service/codigo-enr.service';
import { codigos } from 'src/app/models/codigos';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, NavigationEnd } from '@angular/router';
import notie from 'notie';

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
  frm_codigoENR : FormGroup;
  frmEditarCodigoENR : FormGroup;
  frmEliminarCodigoENR : FormGroup;

  constructor( private codigoENR : CodigoENRService,private chRef: ChangeDetectorRef) { 

    

    
    this.frm_codigoENR = new FormGroup({
    'codigoTipo' : new FormControl('',[Validators.required]),
    'tipoENR': new FormControl('',[Validators.required]),
    'tiempoRetroactivo': new FormControl('',[Validators.required]),
    });


    this.frmEditarCodigoENR = new FormGroup({
      'id' : new FormControl(''),
      'codigoTipo' : new FormControl(''),
      'TipoENR': new FormControl(''),
      'tiempoRetroactivo': new FormControl(''),
      });

      this.frmEliminarCodigoENR = new FormGroup({
        'id' : new FormControl(''),
      });
  }



  public editarCodigo(codigo) {
    this.codEdition = codigo;
   this.frmEditarCodigoENR.setValue(codigo);
  }


  public eliminarCodigo(codigo) {
    this.eliCodigo = codigo;
    this.frmEliminarCodigoENR.controls['id'].setValue(codigo.id);
  }

  public  mostrarDivAgregarCode() {
    $("#divAgregarCode").show();
  }

  public  ocultarDivAgregarCode() {
    $("#divAgregarCode").toggle(1500);
    this.frm_codigoENR.reset();
  }

  



  public saveCodigoENR(){
    let codigoDTO : codigos = new codigos();

    codigoDTO = this.frm_codigoENR.value;
    this.codigoENR.saveCodigos(codigoDTO).subscribe(
      response => {},
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'success', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/save.png" width=40 height=40> Guardado con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.getCodigosENR();
        $("#divAgregarCode").toggle(1500);
        this.frm_codigoENR.reset();

      },
    );

  }


  public updateCodigoENR(){
    let codigoDTO : codigos =  new codigos();

    codigoDTO = this.frmEditarCodigoENR.value;
    



    console.log(codigoDTO);
    this.codigoENR.updateCodigos(codigoDTO).subscribe(
      response => {},
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'warning', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/edit.png" width=40 height=40> Editado con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.getCodigosENR();   
        this.frmEditarCodigoENR.reset();

      },
    );

  }


  public deleteCodigoENR(){
    let codigoDTO : codigos =  new codigos();

    codigoDTO = this.frmEliminarCodigoENR.value;
    



    console.log(codigoDTO);
    this.codigoENR.deleteCodigos(codigoDTO).subscribe(
      response => {},
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/eliminate.png" width=40 height=40> Eliminado con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.getCodigosENR();   
        this.frmEliminarCodigoENR.reset();

      },
    );

  }



  ngOnInit() {
    $("#divAgregarCode").hide();

    this.codigoENR.getCodigoENR().subscribe(
      response => {
       
        this.cod = response;
        const table: any = $('#codigos_tbl');   
        this.chRef.detectChanges();
        this.dataTable = table.DataTable({
        'columnDefs':[{
            'targets':[0],
            'visible':false,
            'searchable':false,
        }],
        'iDisplayLength' : 5,
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
      () => {
        
      }
    );
    
  }


  public  getCodigosENR() {
    this.codigoENR.getCodigoENR().subscribe(
      data => {

        this.cod = data;
        const table: any = $('#codigos_tbl');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
          'columnDefs':[{
            'targets':[0],
            'visible':false,
            'searchable':false,
        }],
        'iDisplayLength' : 5,
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
      () => {
        //console.log(this.cod);
      }
    );
  }
}

