import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatosENRService } from 'src/app/service/datos-enr.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { DatosENR } from 'src/app/models/datos-enr';
import notie from 'notie';
import { CodigoENRService } from 'src/app/service/codigo-enr.service';
import { codigos } from 'src/app/models/codigos';
import { metodologia } from 'src/app/models/metodologiaCal';
import { MetodologiaCalcService } from 'src/app/service/metodologia-calc.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { GlobalService } from 'src/app/service/global.service';
import { Observable } from 'rxjs';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario';
import { isNull } from 'util';

@Component({
  selector: 'app-datos-enr',
  templateUrl: './datos-enr.component.html',
  styleUrls: ['./datos-enr.component.css']
})
export class DatosENRComponent implements OnInit {
  user: Usuario = new Usuario();
  frm_NIS : FormGroup;
  frm_ArchivoEliminar : FormGroup;
  frm_DatosNIS : FormGroup;
  datos: DatosENR[] = new Array();
  dias: DatosENR[] = new Array();
  addForm: FormGroup;
  frm_ArchivoOT: FormGroup;
  frm_Archivo: FormGroup;
  codigosENR : codigos[];
  codigosMetENR : metodologia[];
  docForm: FormGroup;
  adjuntoOrdenesForm: FormGroup;
  dataTable: any;
  ordenes : DatosENR[];
  lecturas : DatosENR[];
  ordenesRegulares : DatosENR[];
  adjuntosFile : DatosENR[];
  extension : string;
  archivoEliminar : DatosENR = new DatosENR();
  ordenNumero : DatosENR = new DatosENR();
  adjuntoVer : SafeResourceUrl;
  urlArc : SafeResourceUrl;
  rutaFile : string;
  fileData: File = null;
  previewUrl:any = null;
  previewUrl1:any = null;

  archivo:any = null;

  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
 


  constructor( private datosENR : DatosENRService, private chRef: ChangeDetectorRef,
    private fb: FormBuilder,private fb1: FormBuilder, 
    private codigoENR: CodigoENRService, private codigoMetENR: MetodologiaCalcService,
    private http: HttpClient, private url: GlobalService,
    public sanitizer: DomSanitizer) {
    

    this.frm_NIS = new FormGroup({
      'nis' : new FormControl('',[Validators.required]),
    });

    this.frm_ArchivoEliminar = new FormGroup({
      'idEliminar' : new FormControl(''),
      'rutaEliminar' : new FormControl(''),
    });

    this.frm_Archivo = new FormGroup({
      
      'tituloDocProbatorio' : new FormControl('',[Validators.required]),
      'tipoPruebaProbatorio' : new FormControl(1,[Validators.required]),
      'fileProbatorio' : new FormControl('',[Validators.required]),
    });


    this.frm_ArchivoOT = new FormGroup({
      
      'tituloDocProbatorioOT' : new FormControl('',[Validators.required]),
      'tipoPruebaProbatorioOT' : new FormControl(1,[Validators.required]),
      'fileProbatorioOT' : new FormControl('',[Validators.required]),
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
      'datosAdicionales' : new FormControl(''),
      'datosIrregularidades': new FormControl(''),
      'idUsuario' : new FormControl(''),
    });




  

   }

   ngOnInit() {
     this.codigoENR.getCodigoENR().subscribe(data => {this.codigosENR = data;});
     this.codigoMetENR.getMetodologiaCalc().subscribe(data => {this.codigosMetENR = data;});
     this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});

     this.adjuntoVer= this.sanitizer.bypassSecurityTrustResourceUrl('');
     this.urlArc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url.getUrlBackEnd());
     this.rutaFile = this.url.getUrlBackEnd()+'descargarArchivo?ruta=';
    this.user = JSON.parse(localStorage.getItem('usuario'));
  
   }

   
//inicialización de datos en el formulario de adjuntar archivos al caso ENR
    get documentos() {
      return this.docForm.get('documentacion') as FormArray;
    }

//inicialización de datos en el formulario de adjuntar archivos a las ordenes técnicas
    get adjuntos(){
      return this.adjuntoOrdenesForm.get('documentacionOrden') as FormArray;
    }

//extraccion de datos por NIS
  public obtenerDatos(){
    this.docForm = this.fb.group({documentacion: this.fb.array([]),});

    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
  
    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = this.frm_NIS.value;

    $("#numSuministro").text(this.frm_NIS.controls["nis"].value);

    this.datosENR.getLecturasbyNISum(datosENRdto).subscribe(
      response => {

        this.lecturas = response;
        const table: any = $('#lecturasTbl');
     
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
        'iDisplayLength' : 5,
        'responsive': true,
          'order' :[[5,'desc']],

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



    this.datosENR.getOtbyNis(datosENRdto).subscribe(
      response => {

        this.ordenesRegulares = response;
        const table: any = $('#ordenesRegularesTbl');
     
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
        'iDisplayLength' : 5,
        'responsive': true,
          'order' :[[3,'desc']],

          'columnDefs': [
            {
                "targets": [ 3 ],
                "visible": false,
                "searchable": false
            }
        ],

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
    
    this.datosENR.getDatosbyNIS(datosENRdto).subscribe(
      response => {
      
        this.datos = response;
        $("#dataNis").show();
      },
      err => {
        console.log("no");
      },
      () => {
      if(this.datos.length < 1){
        notie.alert({
          type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/nofound.png" width=40 height=40> No se encontró ningún resultado',
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

//asignacion de fecha fin mediante la fecha de regularización
  public asigFechaFin(){
    var fecha = this.frm_DatosNIS.controls["fechaRegular"].value;

    this.frm_DatosNIS.controls["fechaFinENR"].setValue(fecha);
  }

//validación de fecha inicio y fin 
  public validarFechas(){
    var fechaMax = this.frm_DatosNIS.controls["fechaRegular"].value;

    var fechaFin = this.frm_DatosNIS.controls["fechaFinENR"].value;
    var fechaInicio = this.frm_DatosNIS.controls["fechaInicioENR"].value;

   /* if(fechaFin > fechaMax){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha de regularización!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });
      this.frm_DatosNIS.controls["fechaFinENR"].setValue(fechaMax);
      this.calcularDias();
    }

    else if(fechaInicio > fechaFin){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/problem.png" width=40 height=40> No debe ser menor a la fecha de inicio!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });
      this.frm_DatosNIS.controls["fechaFinENR"].setValue(fechaMax);
      this.calcularDias();
    }

    else{
      this.calcularDias();
    }*/

    this.calcularDias();
  }

  //validación de fecha inicio para que no sea mayor que la final ni la de regularización
  
  public validarFechaInicio(){
    var fechaMax = this.frm_DatosNIS.controls["fechaRegular"].value;
    var fechaInicio = this.frm_DatosNIS.controls["fechaInicioENR"].value;
    var fechaFin = this.frm_DatosNIS.controls["fechaFinENR"].value;
   /* if(fechaInicio > fechaMax){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha de regularización!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.frm_DatosNIS.controls["fechaInicioENR"].setValue('');
      this.frm_DatosNIS.controls["diasCobro"].setValue('')
    }
    else if(fechaFin < fechaInicio){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha fin!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.frm_DatosNIS.controls["fechaInicioENR"].setValue('');
      this.frm_DatosNIS.controls["diasCobro"].setValue('')
    }
    else{
      $("#fechaf").prop("disabled",false);
     this.calcularDias();
    }*/


    $("#fechaf").prop("disabled",false);
    this.calcularDias();
  }

    //método para obtener dias segun el codigo tipo enr
  public asigDias(){
    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = this.frm_DatosNIS.value;


  this.datosENR.getDiasRetroactivos(datosENRdto).subscribe(
      response => {
        this.dias =response;
      },
      err => {
        console.log("no");
      },
      () => {
    
      },
    );
  }

  //método para obtener dias de cobro segun el codigo tipo enr y mensaje de alerta
  //si sobrepasa el límite
  public calcularDias(){
    var fechaFin1 = new Date(this.frm_DatosNIS.controls["fechaFinENR"].value).getTime() ;
    var fechaInicio1 = new Date( this.frm_DatosNIS.controls["fechaInicioENR"].value).getTime();

    var diferencia = fechaFin1 - fechaInicio1;

    var total = diferencia / (1000 * 60 * 60 * 24);

    var diasRetroactivos = this.frm_DatosNIS.controls["diasRetroactivos"].value;

    
    var codigo = this.frm_DatosNIS.controls["codTipoENR"].value;
   
   /* if(codigo != '6'){
      if(total > diasRetroactivos){
        notie.alert({
          type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/problem.png" width=40 height=40> El cálculo de días es mayor al permitido por el código Tipo ENR '+diasRetroactivos+'!',
          stay: false, // optional, default = false
          time: 5, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
      }
      this.frm_DatosNIS.controls["diasCobro"].setValue(total);
    }else{
     
        
        this.frm_DatosNIS.controls["diasCobro"].setValue(total);
      
    }*/
     
    this.frm_DatosNIS.controls["diasCobro"].setValue(total);
    
  

  }

//inicialización de datos en el formulario de adjuntar archivos a las ordenes técnicas
  public modalAdjuntar(orden){
    this.ordenNumero = orden;
    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
  }

  //reseteo de formulario si se cancela el guardado
 public cancelarGuardado(){

  
  this.docForm = this.fb.group({documentacion: this.fb.array([]),});

  this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});

  this.frm_DatosNIS.reset();
  this.frm_NIS.reset();
  this.docForm.reset();
  this.adjuntoOrdenesForm.reset();

  this.frm_DatosNIS.controls["codTipoENR"].setValue(0);
  this.frm_DatosNIS.controls["codTipoMetENR"].setValue(0);

  $("#data").hide();
 }

//inserción de datos a guarddar
 public guardarDatos(){
  var diasENR = this.frm_DatosNIS.controls["diasRetroactivos"].value;
  var diasCobro = this.frm_DatosNIS.controls["diasCobro"].value;


  if(diasCobro > diasENR){
    notie.alert({
      type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: '<img class="img-profile alertImg" src="./assets/imagenes/problem.png" width=40 height=40> El cálculo de días es mayor al permitido por el código Tipo ENR!',
      stay: false, // optional, default = false
      time: 5, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
  }else{
  
  let datosENRdto : DatosENR = new DatosENR();

  datosENRdto = this.frm_DatosNIS.value;


  this.datosENR.saveDatosNISGenerales(datosENRdto).subscribe(
    response => {
      
    },
    err => {
      console.log("no");
    },
    () => {
      let datosENRdtoDoc : DatosENR = new DatosENR();

      datosENRdtoDoc = this.docForm.value;
      this.datosENR.saveDocProbatoria(datosENRdtoDoc).subscribe(
        response => {
          
        },
        err => {
          console.log("no");
        },
        () => { 
          

        },
      );

      notie.alert({
        type: 'success', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/save.png" width=40 height=40> Caso guardado con éxito!',
        stay: false, // optional, default = false
        time: 2, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.cancelarGuardado();
    },
  );


  }

 }

//método para guardar los adjuntos de la orden tecnica
 public guardarAdjuntosOT(){
  let datosENRdtoDoc : DatosENR = new DatosENR();

  datosENRdtoDoc = this.adjuntoOrdenesForm.value;

  this.datosENR.saveDocOT(datosENRdtoDoc).subscribe(
    response => {
      
    },
    err => {
      console.log("no");
    },
    () => { 
      
      notie.alert({
        type: 'success', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/save.png" width=40 height=40> Adjuntos guardados con éxito!',
        stay: false, // optional, default = false
        time: 2, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.getOrdenNIS();
    },
  );


  
  
  
 }


 //método para obetener las ordenes tecnicas asociadas al NIS
 public getOrdenNIS(){
  let datosENRdto : DatosENR = new DatosENR();

  datosENRdto = this.frm_NIS.value;

  this.datosENR.getOrdenesbyNIS(datosENRdto).subscribe(
    response => {

      this.ordenes = response;
      const table: any = $('#ordenesTbl');
      this.dataTable = table.DataTable();
      this.dataTable.destroy();
  
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
 

//validacion del archivo seleccionado
 fileProgress1(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  this.onSubmit1();
}


onSubmit1() {
  const formData = new FormData();
  formData.append('file', this.fileData);
   
  this.fileUploadProgress = '0%';

 
  this.http.post(this.url.getUrlBackEnd() +'moveDoc', formData, {
    reportProgress: true,
    observe: 'events'   
  })
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.fileUploadProgress);
    } else if(events.type === HttpEventType.Response) {
      this.fileUploadProgress = '';
    }

    
       
  });
  
  
}
  
//validacion del archivo seleccionado  en la orden tecnica
fileProgress2(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
 this.preview2();
}

//control para el preview de la imagen en vista previa en la orden tecnica
preview2() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
   
   
   var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl1 = ''; 
  }
  return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl1 = reader.result; 
  }
}
//subir el archivo a la carpeta en la orden tecnica
onSubmit2(numero) {
  
  const formData = new FormData();
  formData.append('file', this.fileData);
   
  this.user = JSON.parse(localStorage.getItem('usuario'));

  //this.fileUploadProgress = '0%';

 
  this.http.post(this.url.getUrlBackEnd() +'moveDoc', formData, {
   // reportProgress: true,
    observe: 'events'   
  })
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      //this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.fileUploadProgress);
    } else if(events.type === HttpEventType.Response) {
     // this.fileUploadProgress = '';

      var str = this.frm_ArchivoOT.controls["fileProbatorioOT"].value;
      this.adjuntos.push(
        this.fb1.group({ordenN:numero,nombreDocOrden:this.frm_ArchivoOT.controls["tituloDocProbatorioOT"].value,
        tipoAdjuntoOrden:this.frm_ArchivoOT.controls["tipoPruebaProbatorioOT"].value,
        file:str.substring(12),
        idUsuario: this.user.id, }),    
        
        );

        notie.alert({
          type: 'info', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/synchronization.png" width=40 height=40> Archivo cargado con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top',
        });

        this.frm_ArchivoOT.controls["tituloDocProbatorioOT"].setValue('');
        this.frm_ArchivoOT.controls["tipoPruebaProbatorioOT"].setValue(1);
        this.frm_ArchivoOT.controls["fileProbatorioOT"].setValue('');
        this.previewUrl1 = '';

    }

    
       
  });
  
  
}


//validacion del archivo seleccionado  en el caso ENR
 fileProgress(fileInput: any) {
       this.fileData = <File>fileInput.target.files[0];
       this.preview();
 }

//control para el preview de la imagen en vista previa en la carga de archivo al caso ENR
 preview() {
     // Show preview 
     var mimeType = this.fileData.type;
     if (mimeType.match(/image\/*/) == null) {
      
      
      var reader = new FileReader();      
     reader.readAsDataURL(this.fileData); 
     reader.onload = (_event) => { 
       this.previewUrl = ''; 
     }
     return;
     }
  
     var reader = new FileReader();      
     reader.readAsDataURL(this.fileData); 
     reader.onload = (_event) => { 
       this.previewUrl = reader.result; 
     }
 }
  

//subir el archivo a la carpeta en el caso ENR
 onSubmit() {
  const formData = new FormData();
  formData.append('file', this.fileData);
   
  this.fileUploadProgress = '0%';

 
  this.http.post(this.url.getUrlBackEnd() +'moveDoc', formData, {
    reportProgress: true,
    observe: 'events'   
  })
  .subscribe(events => {
    if(events.type === HttpEventType.UploadProgress) {
      this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      console.log(this.fileUploadProgress);
    } else if(events.type === HttpEventType.Response) {
      this.fileUploadProgress = '';
      var str = this.frm_Archivo.controls["fileProbatorio"].value;
      this.documentos.push(
        this.fb.group({nombreDoc:this.frm_Archivo.controls["tituloDocProbatorio"].value,
        tipoPrueba:this.frm_Archivo.controls["tipoPruebaProbatorio"].value,
        archivo:str.substring(12) }),    
        );

        notie.alert({
          type: 'info', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="./assets/imagenes/synchronization.png" width=40 height=40> Archivo cargado con éxito!',
          stay: false, // optional, default = false
          time: 2, // optional, default = 3, minimum = 1,
          position: 'top',
        });

        this.frm_Archivo.controls["tituloDocProbatorio"].setValue('');
        this.frm_Archivo.controls["tipoPruebaProbatorio"].setValue(1);
        this.frm_Archivo.controls["fileProbatorio"].setValue('');
        this.previewUrl = '';
    }

    
       
  });
  
  
}

//método que obtiene la URL del archivo a ver y valida el tipo de extension
public adjuntosOrdenesVer(adjunto, ext){
  console.log(adjunto);
  var url = this.url.getUrlBackEnd()+'files/'+adjunto;

  this.adjuntoVer =  this.sanitizer.bypassSecurityTrustResourceUrl(url);

  this.extension = ext;
}

//método para obtener los adjuntos de las ordenes
public adjuntosOrdenes(orden){
  this.ordenNumero = orden;

  let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = orden;


  this.datosENR.getAdjuntosOrdenes(datosENRdto).subscribe(
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

//método que obtiene los parametros del archivo a eliminar de la orden tecnica
public datosEliminarArch(ruta, id, datos){
  this.archivoEliminar = datos;

  this.frm_ArchivoEliminar.controls["idEliminar"].setValue(id);
  this.frm_ArchivoEliminar.controls["rutaEliminar"].setValue(ruta);
}

//método para eliminar adjuntos de las ordenes tecnicas
public eliminarArchivo(orden){
  let datosENRdto : DatosENR = new DatosENR();

  datosENRdto = this.frm_ArchivoEliminar.value;

  
  this.datosENR.eliminarArchivo(datosENRdto).subscribe(
    response => {
      
    },
    err => {
      console.log("no");
    },
    () => {
      notie.alert({
        type: 'info', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="./assets/imagenes/eliminate.png" width=40 height=40> Archivo eliminado con éxito!',
        stay: false, // optional, default = false
        time: 3, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });
      this.adjuntosOrdenes(orden);
      this.getOrdenNIS();
    },
  );
}

 
}
