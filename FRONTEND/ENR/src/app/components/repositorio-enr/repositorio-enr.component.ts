import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RepositorioEnrService } from 'src/app/service/repositorio-enr.service';
import { Repositorio } from 'src/app/models/repositorio';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { DatosENR } from 'src/app/models/datos-enr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GlobalService } from 'src/app/service/global.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import notie from 'notie';
import { DatosENRService } from 'src/app/service/datos-enr.service';
import { CodigoENRService } from 'src/app/service/codigo-enr.service';
import { MetodologiaCalcService } from 'src/app/service/metodologia-calc.service';
import { codigos } from 'src/app/models/codigos';
import { metodologia } from 'src/app/models/metodologiaCal';
import { isNull } from 'util';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-repositorio-enr',
  templateUrl: './repositorio-enr.component.html',
  styleUrls: ['./repositorio-enr.component.css']
})
export class RepositorioENRComponent implements OnInit {
  repositorioIng : Repositorio[];
  frm_ArchivoEliminar : FormGroup;
  frm_NuevoScan: FormGroup;
  frm_ArchivoEliminarOT : FormGroup;
  frm_Archivo: FormGroup;
  frmDatosENR : FormGroup;
  docForm: FormGroup;
  repositorioCalc : Repositorio[];
  repositorioNoti : Repositorio[];
  dataTable: any;
  adjuntosFile : Repositorio[];
  adjuntosFileOrdenes: DatosENR[];
  ordenNumero : Repositorio = new Repositorio();
  ordenNumeroAd : Repositorio = new Repositorio();
  ordenNumeroG : Repositorio = new Repositorio();
  ordenNumeroGN : Repositorio = new Repositorio();
  ordenNumeroCalculo :  Repositorio[] = new Array();
  datosGenerales : Repositorio = new Repositorio();
  datosGeneralesLecturas : Repositorio = new Repositorio();
  adjuntoVer : SafeResourceUrl;
  extension : Repositorio[];
  archivoEliminar : Repositorio = new Repositorio();
  datosPadre : Repositorio = new Repositorio();
  archivoEliminarOT : Repositorio = new Repositorio();
  frm_DatosNIS : FormGroup;
  datos: DatosENR[] = new Array();
  datosENRLista: Repositorio[] = new Array();
  datosENRListaScan: Repositorio[] = new Array();
  ordenes : DatosENR[];
  dias: DatosENR[] = new Array();
  codigosENR : codigos[];
  codigosMetENR : metodologia[];
  rutaFile : string;
  frm_ArchivoOT: FormGroup;
  previewUrl:any = null;
  previewUrl1:any = null;
  previewUrl2:any = null;
  adjuntoOrdenesForm: FormGroup;
  fileData: File = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  frm_Caso1 : FormGroup;
  frm_Caso2 : FormGroup;
  lecturasArray : Repositorio[];
  consumoDiario = 0;
  frm_LecturasEvaluar: FormGroup;
  frm_LecturasEvaluarTotales : FormGroup;
  indexLecturas : number;
  totalSeleccion = 0;

  constructor(private repositorioENR : RepositorioEnrService,private chRef: ChangeDetectorRef,
    private http: HttpClient, private url: GlobalService,
    private datosENR : DatosENRService,
    public sanitizer: DomSanitizer,
    private codigoENR: CodigoENRService, private codigoMetENR: MetodologiaCalcService,
    private fb1: FormBuilder, private fb: FormBuilder,private fb2: FormBuilder,) { 
      this.frm_LecturasEvaluarTotales = new FormGroup({
        'totalDias' : new FormControl(''),
        'totalConsumo' : new FormControl(''),
        'totalConsumoNF' : new FormControl(''),
        'totalDifConsumo' : new FormControl(''),
        'consumoENRFacturar': new FormControl(''),
        'consumoDiarioENR': new FormControl(''),
      });

      this.frm_ArchivoEliminar = new FormGroup({
        'idEliminar' : new FormControl(''),
        'rutaEliminar' : new FormControl(''),
      });

      this.frm_NuevoScan = new FormGroup({
        'nuevoScanENR' : new FormControl(''),
        'idCambio' : new FormControl(''),
        'rutaVieja' : new FormControl(''),
      });

      this.frm_ArchivoEliminarOT = new FormGroup({
        'idEliminar' : new FormControl(''),
        'rutaEliminar' : new FormControl(''),
        
        
      });


      this.frm_Archivo = new FormGroup({
      
        'tituloDocProbatorio' : new FormControl('',[Validators.required]),
        'tipoPruebaProbatorio' : new FormControl(1,[Validators.required]),
        'fileProbatorio' : new FormControl('',[Validators.required]),
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
  
      });

      this.frmDatosENR = new FormGroup({
        'nNotificacion' : new FormControl(''),
        'caso' : new FormControl(''),
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

      this.frm_ArchivoOT = new FormGroup({
      
        'tituloDocProbatorioOT' : new FormControl('',[Validators.required]),
        'tipoPruebaProbatorioOT' : new FormControl(1,[Validators.required]),
        'fileProbatorioOT' : new FormControl('',[Validators.required]),
      });

     
      this.frm_Caso1 = new FormGroup({
      
        'amperaje1' : new FormControl('',[Validators.required]),
        'voltaje1' : new FormControl('',[Validators.required]),
        'amperaje2' : new FormControl('',[Validators.required]),
        'voltaje2' : new FormControl('',[Validators.required]),
        'voltajeSuministro' : new FormControl('',[Validators.required]),
        'horasEstimadas' : new FormControl('',[Validators.required]),
        'consumo1' : new FormControl('',[Validators.required]),
        'consumo2' : new FormControl('',[Validators.required]),
        'consumoTotal' : new FormControl('',[Validators.required]),
        'diasCobroCaso1' : new FormControl('',[Validators.required]),
        
      });


      this.frm_Caso2 = new FormGroup({
      
        'censoCarga' : new FormControl('',[Validators.required]),
        'consumoEstimado' : new FormControl('',[Validators.required]),
        'voltajeSuministro' : new FormControl('',[Validators.required]),
        'diasCobroCaso2' : new FormControl('',[Validators.required]),
      });


     
    }

  ngOnInit() {
    this.frm_LecturasEvaluar = this.fb2.group({lecturas: this.fb2.array([]),});
    this.docForm = this.fb.group({documentacion: this.fb.array([]),});
    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
    this.rutaFile = this.url.getUrlBackEnd()+'descargarArchivo?ruta=';
    
    this.codigoENR.getCodigoENR().subscribe(data => {this.codigosENR = data;});
    this.codigoMetENR.getMetodologiaCalc().subscribe(data => {this.codigosMetENR = data;});

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

//inicialización de datos en el formulario de adjuntar archivos a las ordenes técnicas
  public modalAdjuntar(orden, ordenNumeroG){
    this.ordenNumeroAd = orden;
    //console.log(ordenNumeroG);
    this.ordenNumeroGN = ordenNumeroG;
    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
    this.previewUrl1 = '';
    this.frm_ArchivoOT.controls["tipoPruebaProbatorioOT"].setValue(1);
    this.frm_ArchivoOT.controls["tituloDocProbatorioOT"].setValue('');
    this.frm_ArchivoOT.controls["fileProbatorioOT"].setValue('');
  }

  //declaracion de formulario de todos los adjuntos de las ordenes a subir de tipo ARRRAY
  get adjuntos(){
    return this.adjuntoOrdenesForm.get('documentacionOrden') as FormArray;
  }

//declaracion de formulario de todos los adjuntos de las ordenes a subir de tipo ARRRAY
  get documentos() {
    return this.docForm.get('documentacion') as FormArray;
  }

//declaracion de formulario de todos las lecturas de tipo ARRRAY
  get lecturas(){
    return this.frm_LecturasEvaluar.get('lecturas') as FormArray;
  }

//validacion del archivo seleccionado
  fileProgress2(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
   this.preview2();
  }
  
  //control para el preview de la imagen en vista previa
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
  
  //subir el archivo a la carpeta
  onSubmit2(numero) {
    const formData = new FormData();
    formData.append('file', this.fileData);
     
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
          file:str.substring(12) }),    
          );
  
          notie.alert({
            type: 'info',
            text: '<img class="img-profile alertImg" src="../../../assets/imagenes/synchronization.png" width=40 height=40> Archivo cargado con éxito!',
            stay: false, 
            time: 2, 
            position: 'top',
          });
  
          this.frm_ArchivoOT.controls["tituloDocProbatorioOT"].setValue('');
          this.frm_ArchivoOT.controls["tipoPruebaProbatorioOT"].setValue(1);
          this.frm_ArchivoOT.controls["fileProbatorioOT"].setValue('');
          this.previewUrl1 = '';
  
      }
  
      
         
    });
    
    
  }


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
onSubmit(caso) {
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
     this.fb.group({caso:caso,nombreDoc:this.frm_Archivo.controls["tituloDocProbatorio"].value,
     tipoPrueba:this.frm_Archivo.controls["tipoPruebaProbatorio"].value,
     archivo:str.substring(12) }),    
     );

     notie.alert({
       type: 'info',
       text: '<img class="img-profile alertImg" src="../../../assets/imagenes/synchronization.png" width=40 height=40> Archivo cargado con éxito!',
       stay: false, 
       time: 2, 
       position: 'top',
     });

     this.frm_Archivo.controls["tituloDocProbatorio"].setValue('');
     this.frm_Archivo.controls["tipoPruebaProbatorio"].setValue(1);
     this.frm_Archivo.controls["fileProbatorio"].setValue('');
     this.previewUrl = '';
 }

 
    
});


}


  //método para pasar parametros a otro modal
  public datosOrdenAdjuntos(datos){
   //console.log(datos);
    this.ordenNumeroGN = datos;
  }

//método para guardar los adjuntos de la orden tecnica
  public guardarAdjuntosOT(ordenes){
    let datosENRdtoDoc : DatosENR = new DatosENR();
  
    datosENRdtoDoc = this.adjuntoOrdenesForm.value;
    //console.log(ordenes);
    
    this.datosENR.saveDocOT(datosENRdtoDoc).subscribe(
      response => {
        
      },
      err => {
        console.log("no");
      },
      () => { 
        
        notie.alert({
          type: 'success',
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Adjuntos guardados con éxito!',
          stay: false, 
          time: 2, 
          position: 'top' 
        });
  
        this.datosEditar(ordenes);
      },
    );
    
  
    
   }
 

//método para obtener los adjuntos de las ordenes
  public adjuntosOrdenes(orden, ordenNumeroG1){
    this.ordenNumero = orden;
    this.ordenNumeroG = ordenNumeroG1;
    let datosENRdto : DatosENR = new DatosENR();
  
      datosENRdto = orden;
  
  
    this.datosENR.getAdjuntosOrdenes(datosENRdto).subscribe(
      response => {
  
        this.adjuntosFileOrdenes = response;
        const table: any = $('#adjuntos_TblOrdenes');
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

//método que obtiene la URL del archivo a ver y valida el tipo de extension
  public adjuntosOrdenesVer(adjunto, ext){
    //console.log(adjunto);
    var url = this.url.getUrlBackEnd()+'files/'+adjunto;
  
    this.adjuntoVer =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  
    this.extension = ext;
  }

//método que obtiene los parametros del archivo a eliminar del caso ENR
  public datosEliminarArch(ruta, id, datos){
    this.archivoEliminar = datos;
  
    this.frm_ArchivoEliminar.controls["idEliminar"].setValue(id);
    this.frm_ArchivoEliminar.controls["rutaEliminar"].setValue(ruta);
  }
  

  //método que obtiene los parametros del archivo a eliminar de la orden tecnica
  public datosEliminarArchOT(ruta, id, datos, datosGenerales){
    this.archivoEliminarOT = datos;
    this.datosPadre = datosGenerales;
  
    this.frm_ArchivoEliminarOT.controls["idEliminar"].setValue(id);
    this.frm_ArchivoEliminarOT.controls["rutaEliminar"].setValue(ruta);
  }
  

  //método para eliminar adjuntos del caso ENR
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
        this.datosEditar(orden);
        this.getRepositorioIng();
        this.getRepositorioCalc();
        this.getRepositorioNoti();
        notie.alert({
          type: 'info',
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/eliminate.png" width=40 height=40> Archivo eliminado con éxito!',
          stay: false, 
          time: 3, 
          position: 'top' 
        });
       
      },
    );
  }


//método para eliminar adjuntos de las ordenes tecnicas
  public eliminarArchivoOT(orden,datosPapa){
    let datosENRdto : DatosENR = new DatosENR();
  
    datosENRdto = this.frm_ArchivoEliminarOT.value;
  
    
    this.repositorioENR.eliminarArchivoOT(datosENRdto).subscribe(
      response => {
        
      },
      err => {
        console.log("no");
      },
      () => {
        
        this.datosEditar(datosPapa);
        this.adjuntosOrdenes(orden, datosPapa);

        notie.alert({
          type: 'info',
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/eliminate.png" width=40 height=40> Archivo eliminado con éxito!',
          stay: false, 
          time: 3, 
          position: 'top' 
        });
      },
    );
  }


//método para llenar tabla de repositorio ingresados
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


//método para llenar tabla de repositorio calculados
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


//método para llenar tabla de repositorio notificados
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

  //método para obtener dias segun el codigo tipo enr
  public asigDias(){
    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = this.frmDatosENR.value;


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

  //Método para carga de datos en tablas y formularios en la vista para editar
  public datosEditar(caso){
    //console.log(caso);

    this.docForm = this.fb.group({documentacion: this.fb.array([]),});

    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
    this.ordenNumeroG = caso;
  

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
          type: 'error',
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> No se encontró ningún resultado',
          stay: false, 
          time: 2, 
          position: 'top' 
        });
      }
      },
    );

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


    this.repositorioENR.getDatosENR(datosENRdto).subscribe(
      response => {
      
        this.datosENRLista = response;
       // $("#dataNis").show();
      },
      err => {
        console.log("no");
      },
      () => {
     
      },
    );

    this.repositorioENR.getAdjuntosOrdenesENR(datosENRdto).subscribe(
      response => {
  
        this.adjuntosFile = response;
        const table: any = $('#adjuntos_Tbl');
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


  //Método para cambiar el scan de la primera notificacion en CASO ENR

  public nuevoScan(data){
    this.previewUrl2 = '';
    this.frm_NuevoScan.reset();
    let datosENRdto : DatosENR = new DatosENR();
    this.frm_NuevoScan.controls["nuevoScanENR"].setValue('');
    datosENRdto = data;

    this.repositorioENR.getScan(datosENRdto).subscribe(
      response => {
      
        this.datosENRListaScan = response;
       // $("#dataNis").show();
      },
      err => {
        console.log("no");
      },
      () => {
        
      },
    );
  }


  //validacion del archivo seleccionado
  fileProgress3(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
   this.preview3();
  }
  
  //control para el preview de la imagen en vista previa
  preview3() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
     
     
     var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl2 = ''; 
    }
    return;
    }
  
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl2 = reader.result; 
    }
  }
  
  //subir el archivo a la carpeta
  onSubmit3(datosCaso) {
    const formData = new FormData();
    formData.append('file', this.fileData);
     
    //console.log(datosCaso);

    let datos : DatosENR = new DatosENR();

    datos = this.frm_NuevoScan.value;
  
   // console.log(datos);
   

     
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
   
        this.repositorioENR.cambiarScan(datos).subscribe(
          response => {
            
          },
          err => {
            console.log("no");
          },
          () => {
            notie.alert({
              type: 'info',
              text: '<img class="img-profile alertImg" src="../../../assets/imagenes/synchronization.png" width=40 height=40> Archivo cargado con éxito!',
              stay: false, 
              time: 2, 
              position: 'top',
            });
            this.previewUrl2 = '';
            this.frm_NuevoScan.reset();
            this.datosEditar(datosCaso);
          },
        );

      
         
   
       }
   
       
          
     });
 
    
    
  }



//editar datos ENR
  public guardarDatos(datos){
    let datosENRdto : DatosENR = new DatosENR();
  
    datosENRdto = this.frmDatosENR.value;
  
  
    this.datosENR.updateDatosNISGenerales(datosENRdto).subscribe(
      response => {
        
      },
      err => {
        console.log("no");
      },
      () => {
        let datosENRdtoDoc : DatosENR = new DatosENR();
  
        datosENRdtoDoc = this.docForm.value;
        this.datosENR.updateDocProbatoria(datosENRdtoDoc).subscribe(
          response => {
            
          },
          err => {
            console.log("no");
          },
          () => { 
            
  
          },
        );
  
        notie.alert({
          type: 'success',
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Caso editado con éxito!',
          stay: false, 
          time: 2, 
          position: 'top' 
        });
  
        this.docForm.reset();
        this.datosEditar(datos);
        this.getRepositorioCalc();
        this.getRepositorioIng();
        this.getRepositorioNoti();
        this.ordenNumeroG = datosENRdto;
      },
    );
  
  
    
  
   }



   //metodo para mostrar ventana de cálculo del caso ENR

   public calcularCaso(caso){
    $("#titleCalculo").show();
    $("#myTabContent").hide();
    $("#myTab").hide();
    $("#titleGlobal").hide();

    this.datosGenerales = caso;

    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = caso;

    console.log(caso);

    this.repositorioENR.getDatosENR(datosENRdto).subscribe(
      response => {
      
        this.ordenNumeroCalculo = response;
       // $("#dataNis").show();
      },
      err => {
        console.log("no");
      },
      () => {
        
      },
    );

    this.repositorioENR.getLecturasbyNIS(datosENRdto).subscribe(
      response => {
  
        this.lecturasArray = response;
        const table: any = $('#lecturas_Tbl');
        this.dataTable = table.DataTable();
        this.dataTable.destroy();
    
        this.chRef.detectChanges();
        
        this.dataTable = table.DataTable({
          "columnDefs": [
            { "visible": false, "targets": 0 }
          ],
          'iDisplayLength' : 5,
        'responsive': true,
          order: [[ 0, 'desc' ]], 
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


   public cerrarCalculo(caso){
    $("#titleCalculo").hide();
    $("#myTabContent").show();
    $("#myTab").show();
    $("#titleGlobal").show();
    $("#resultCaso1").hide();
    this.frm_Caso1.reset();
    this.frm_Caso2.reset();
    $("#sHorasValidator").hide();
    $("#censoCargaValidator").hide();
   }


   public calcularENRCaso1(){
    $("#resultCaso1").hide();

     var diasCobro = this.frm_Caso1.controls["diasCobroCaso1"].value;
     
     var amperaje1 = this.frm_Caso1.controls["amperaje1"].value;
     var voltaje1 = this.frm_Caso1.controls["voltaje1"].value;
     var amperaje2 = this.frm_Caso1.controls["amperaje2"].value;
     var voltaje2 = this.frm_Caso1.controls["voltaje2"].value;
     var horas = this.frm_Caso1.controls["horasEstimadas"].value;

     var totalConsumoL1 = (amperaje1 * voltaje1 * horas) / 1000;
     var totalConsumoL2 = (amperaje2 * voltaje2 * horas) / 1000;

     this.frm_Caso1.controls["consumo1"].setValue(totalConsumoL1);
     this.frm_Caso1.controls["consumo2"].setValue(totalConsumoL2);

     var consumoENR = (totalConsumoL1 + totalConsumoL2) * diasCobro;

     
     if(amperaje1 == '' && voltaje1 == '' && amperaje2 == '' && voltaje2 == ''){
      notie.alert({
        type: 'error',
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> Dígite al menos un amperaje y un voltaje para evaluar',
        stay: false, 
        time: 4, 
        position: 'top' 
      });
     }
     else if(amperaje1 != '' && voltaje1 == ''){
      notie.alert({
        type: 'error',
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> Si digitó el amperaje en línea 1, dígite también el voltaje en línea 1',
        stay: false, 
        time: 4, 
        position: 'top' 
      });
     }

     else if(amperaje1 == '' && voltaje1 != ''){
      notie.alert({
        type: 'error',
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> Si digitó el voltaje en línea 1, dígite también el amperaje en línea 1',
        stay: false, 
        time: 4, 
        position: 'top' 
      });
     }
     else if(amperaje2 != '' && voltaje2 == ''){
      notie.alert({
        type: 'error',
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> Si digitó el amperaje en línea 2, dígite también el voltaje en línea 2',
        stay: false, 
        time: 4, 
        position: 'top' 
      });
     }

     else if(amperaje2 == '' && voltaje2 != ''){
      notie.alert({
        type: 'error',
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> Si digitó el voltaje en línea 2, dígite también el amperaje en línea 2',
        stay: false, 
        time: 4, 
        position: 'top' 
      });
     }else if(horas == ''){
      $("#sHorasValidator").show();
      }
     else{
     
      this.frm_Caso1.controls["consumoTotal"].setValue(consumoENR.toFixed(2));
      $("#resultCaso1").show();
     }
      
     
     
   }


  esconderSpan(){
    $("#sHorasValidator").hide();
  }


  public calcularConDiarioENR1(){
    var censo = this.frm_Caso2.controls["censoCarga"].value;

    var total = censo / 30;
    this.frm_Caso2.controls["consumoEstimado"].setValue(total.toFixed(2));
  }


  public totalizarDatos(){
    const dias = [];
    const consumo = [];
    const consumoNoFacturado = [];
    const difConsumo = [];

    //Calcular dias totales
    $.each($('input[name=\'diasFacturados\']'), function(){
      dias.push($(this).val());
    });


    var sumatoriaDias = dias.reduce(function(acumulador, siguienteValor){
      return parseFloat(acumulador) + parseFloat(siguienteValor);
    }, 0);


    //calcular consumo total
    $.each($('input[name=\'consumo\']'), function(){
      consumo.push($(this).val());
    });


    var sumatoriaConsumo = consumo.reduce(function(acumulador, siguienteValor){
      return parseFloat(acumulador) + parseFloat(siguienteValor);
    }, 0);



    //calcular consumo real no facturado total
    $.each($('input[name=\'consumoNoFac\']'), function(){
      consumoNoFacturado.push($(this).val());
    });


    var sumatoriaConsumoNF = consumoNoFacturado.reduce(function(acumulador, siguienteValor){
      return parseFloat(acumulador) + parseFloat(siguienteValor);
    }, 0);



    //calcular diferencia de consumo total
    $.each($('input[name=\'difConsumo\']'), function(){
      difConsumo.push($(this).val());
    });


    var sumatoriaDifConsumo= difConsumo.reduce(function(acumulador, siguienteValor){
      return parseFloat(acumulador) + parseFloat(siguienteValor);
    }, 0);
    


    this.frm_LecturasEvaluarTotales.controls["totalDias"].setValue(sumatoriaDias);
    this.frm_LecturasEvaluarTotales.controls["totalConsumo"].setValue(sumatoriaConsumo.toFixed(2));
    this.frm_LecturasEvaluarTotales.controls["totalConsumoNF"].setValue(sumatoriaConsumoNF.toFixed(2));
    this.frm_LecturasEvaluarTotales.controls["totalDifConsumo"].setValue(sumatoriaDifConsumo.toFixed(2));


    var consumoENRDiario = (sumatoriaDifConsumo / sumatoriaDias).toFixed(2);

    this.frm_LecturasEvaluarTotales.controls["consumoDiarioENR"].setValue(consumoENRDiario);

    var consumoENRFacturar = ((sumatoriaDifConsumo / sumatoriaDias) *
    this.frm_Caso2.controls["diasCobroCaso2"].value).toFixed(2);

    this.frm_LecturasEvaluarTotales.controls["consumoENRFacturar"].setValue(consumoENRFacturar);


    this.totalSeleccion = dias.length;
  }




  //metodo para cargar lecturas del NIS 
  public mostrarLecturas(datos){

    

    this.datosGeneralesLecturas =datos;

    this.consumoDiario = this.frm_Caso2.controls["consumoEstimado"].value;

    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = datos;

    var consumo =  this.frm_Caso2.controls["consumoEstimado"].value;

    if(consumo == ''){
      notie.alert({
        type: 'error',
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/nofound.png" width=40 height=40> Debe calcular el Consumo Diario Estimado',
        stay: false, 
        time: 4, 
        position: 'top' 
      });
    }else{
      $("#mostrarLecturas").show();
    }

    

  }

  public hideModalLecturas(){
    $("#mostrarLecturas").hide();
    $("#frmLec").show();
    $("#frmLecTotales").show();

    this.totalizarDatos();

  }
 

  public agregarLectura(periodo,fechaLecturaAnt,fechaLectura,diasFacturados,consumoN,i){
    $("#add"+periodo).hide();
    $("#tr"+periodo).addClass("adjuntos");
    $("#remove"+periodo).show();
    
    this.lecturas.push(
      this.fb2.group({
        periodo:periodo,
        fechaLecturaAnt:fechaLecturaAnt,
        fechaLectura:fechaLectura,
        diasFacturados:diasFacturados,
        consumo:consumoN,
        consumoNoFac: (diasFacturados * this.consumoDiario).toFixed(2),
        difConsumo : ((diasFacturados * this.consumoDiario)  - consumoN).toFixed(2)
       }),  
  );


  this.totalizarDatos();

  
}

public eliminarLecturaTbl(periodo){
  $("#btnEl"+periodo).click();
}

public eliminarLectura(i, periodo){
  this.lecturas.removeAt(i);
  
    $("#add"+periodo).show();
    $("#tr"+periodo).removeClass("adjuntos");
    $("#remove"+periodo).hide();
}






}
