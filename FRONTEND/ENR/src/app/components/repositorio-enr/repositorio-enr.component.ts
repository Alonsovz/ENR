import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RepositorioEnrService } from 'src/app/service/repositorio-enr.service';
import { Repositorio } from 'src/app/models/repositorio';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { DatosENR } from 'src/app/models/datos-enr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/service/global.service';
import { FormGroup, FormControl } from '@angular/forms';
import notie from 'notie';
import { DatosENRService } from 'src/app/service/datos-enr.service';

@Component({
  selector: 'app-repositorio-enr',
  templateUrl: './repositorio-enr.component.html',
  styleUrls: ['./repositorio-enr.component.css']
})
export class RepositorioENRComponent implements OnInit {
  repositorioIng : Repositorio[];
  frm_ArchivoEliminar : FormGroup;
  repositorioCalc : Repositorio[];
  repositorioNoti : Repositorio[];
  dataTable: any;
  adjuntosFile : Repositorio[];
  ordenNumero : Repositorio = new Repositorio();
  adjuntoVer : SafeResourceUrl;
  extension : Repositorio[];
  archivoEliminar : Repositorio = new Repositorio();
  frm_DatosNIS : FormGroup;
  datos: DatosENR[] = new Array();
  ordenes : DatosENR[];

  constructor(private repositorioENR : RepositorioEnrService,private chRef: ChangeDetectorRef,
    private http: HttpClient, private url: GlobalService,
    private datosENR : DatosENRService,
    public sanitizer: DomSanitizer) { 
      this.frm_ArchivoEliminar = new FormGroup({
        'idEliminar' : new FormControl(''),
        'rutaEliminar' : new FormControl(''),
      });

      this.frm_DatosNIS = new FormGroup({
        'usuario' : new FormControl(''),
        'num_suministro' : new FormControl(''),
        'direccion' : new FormControl(''),
        'municipio' : new FormControl(''),
        'colonia' : new FormControl(''),
        'trafo' : new FormControl(''),
        'red_electrica' : new FormControl(''),
        'medidor' : new FormControl(''),
        'nNotificacion' : new FormControl(''),
        'adScanNoti' : new FormControl(''),
        'fechaPrimeraNoti' : new FormControl(''),
        'fechaRegular' : new FormControl(''),
        'codTipoENR' : new FormControl(0),
        'codTipoMetENR' : new FormControl(0),
        'diasCobro' : new FormControl(''),
        'fechaInicioENR' : new FormControl(''),
        'fechaFinENR' : new FormControl(''),
        'diasRetroactivos' : new FormControl(''),
  
      });
    }

  ngOnInit() {

    this.repositorioENR.getRepositorioIngresados().subscribe(
      response => {

        this.repositorioIng = response;

        this.chRef.detectChanges();

        const table: any = $('#tbl_Ingresados');

        this.dataTable = table.DataTable({
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
      () => {}
    );


    this.repositorioENR.getRepositorioCalculados().subscribe(
      response => {

        this.repositorioCalc = response;

        this.chRef.detectChanges();

        const table: any = $('#tbl_Calculados');

        this.dataTable = table.DataTable({
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
      () => {}
    );



    this.repositorioENR.getRepositorioNotificados().subscribe(
      response => {

        this.repositorioNoti = response;

        this.chRef.detectChanges();

        const table: any = $('#tbl_Notificados');

        this.dataTable = table.DataTable({
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
      () => {}
    );

  }




  public adjuntosOrdenes(orden){
    this.ordenNumero = orden;
  
    let datosENRdto : DatosENR = new DatosENR();
  
      datosENRdto = orden;
  
  
    this.repositorioENR.getAdjuntosOrdenes(datosENRdto).subscribe(
      response => {
  
        this.adjuntosFile = response;
        const table: any = $('#adjuntos_Tbl');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
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


  public adjuntosOrdenesVer(adjunto, ext){
    console.log(adjunto);
    var url = this.url.getUrlBackEnd()+'files/'+adjunto;
  
    this.adjuntoVer =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  
    this.extension = ext;
  }


  public datosEliminarArch(ruta, id, datos){
    this.archivoEliminar = datos;
  
    this.frm_ArchivoEliminar.controls["idEliminar"].setValue(id);
    this.frm_ArchivoEliminar.controls["rutaEliminar"].setValue(ruta);
  }
  
  
  public eliminarArchivo(orden){
    let datosENRdto : DatosENR = new DatosENR();
  
    datosENRdto = this.frm_ArchivoEliminar.value;
  
    
    this.repositorioENR.eliminarArchivo(datosENRdto).subscribe(
      response => {
        
      },
      err => {
        console.log("no");
      },
      () => {
        notie.alert({
          type: 'info', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/eliminate.png" width=40 height=40> Archivo eliminado con éxito!',
          stay: false, // optional, default = false
          time: 3, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
        this.adjuntosOrdenes(orden);
        this.getRepositorioIng();
        this.getRepositorioCalc();
        this.getRepositorioNoti();
      },
    );
  }



  public getRepositorioIng(){
    this.repositorioENR.getRepositorioIngresados().subscribe(
      response => {

        this.repositorioIng = response;

        

        const table: any = $('#tbl_Ingresados');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        this.dataTable = table.DataTable({
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
      () => {}
    );
  }



  public getRepositorioCalc(){
    this.repositorioENR.getRepositorioCalculados().subscribe(
      response => {

        this.repositorioCalc = response;

        

        const table: any = $('#tbl_Calculados');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();

        this.dataTable = table.DataTable({
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
      () => {}
    );
  }



  public getRepositorioNoti(){
    this.repositorioENR.getRepositorioNotificados().subscribe(
      response => {

        this.repositorioNoti = response;

      

        const table: any = $('#tbl_Notificados');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        this.dataTable = table.DataTable({
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
      () => {}
    );
  }


  public datosEditar(caso){
    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = caso;
    
    this.datosENR.getDatosbyNIS(datosENRdto).subscribe(
      response => {
      
        this.datos = response;
       // $("#dataNis").show();
      },
      err => {
        console.log("no");
      },
      () => {
      if(this.datos.length < 1){
        notie.alert({
          type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> No se encontró ningún resultado',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
      }
      },
    );

    this.datosENR.getOrdenesbyNIS(datosENRdto).subscribe(
      response => {

        this.ordenes = response;
        const table: any = $('#ordenesTbl');
     
    
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
        'iDisplayLength' : 3,
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
