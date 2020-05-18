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
  fechaInicioTarifa :  Repositorio[] = new Array();
  fechaFinTarifa :  Repositorio[] = new Array();
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
  consumo: DatosENR[] = new Array();
  codigosENR : codigos[];
  codigosMetENR : metodologia[];
  rutaFile : string;
  rutaFilePDF : string;
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
  tarifasFechas : Repositorio[];
  consumoEstimado : Repositorio[];
  consumoRegistrado : Repositorio[];
  consumoENR : Repositorio[];
  tarifasFechasTotal : Repositorio[];
  consumoEstimadoTotal : Repositorio[];
  consumoRegistradoTotal : Repositorio[];
  consumoENRTotal : Repositorio[];

  consumoENR1erBloque : Repositorio[];
  consumoENR2doBloque : Repositorio[];
  consumoENR3erBloque : Repositorio[];

  consumoENR1erBloqueTotal : Repositorio[];
  consumoENR2doBloqueTotal : Repositorio[];
  consumoENR3erBloqueTotal : Repositorio[];
  consumoENRTotalGlobal : Repositorio[];
  consumoENRTotalGlobalFechas : Repositorio[];



  consumoENR1erBloqueEnergia : Repositorio[];
  consumoENR2doBloqueEnergia : Repositorio[];
  consumoENR3erBloqueEnergia : Repositorio[];

  consumoENR1erBloqueTotalEnergia : Repositorio[];
  consumoENR2doBloqueTotalEnergia : Repositorio[];
  consumoENR3erBloqueTotalEnergia : Repositorio[];
  consumoENRTotalGlobalEnergia : Repositorio[];
  consumoENRTotalGlobalFechasEnergia : Repositorio[];

  consumoENR1erBloqueDistribucion : Repositorio[];
  consumoENR2doBloqueDistribucion : Repositorio[];
  consumoENR3erBloqueDistribucion : Repositorio[];

  consumoENR1erBloqueTotalDistribucion : Repositorio[];
  consumoENR2doBloqueTotalDistribucion : Repositorio[];
  consumoENR3erBloqueTotalDistribucion : Repositorio[];
  consumoENRTotalGlobalDistribucion : Repositorio[];
  consumoENRTotalGlobalFechasDistribucion : Repositorio[];

  consumoDiario = 0;
  frm_LecturasEvaluar: FormGroup;
  frm_LecturasEvaluarTotales : FormGroup;
  indexLecturas : number;
  totalSeleccion = 0;
  frm_Caso3 : FormGroup;
  frm_ConsumosReales3 : FormGroup;
  frm_ConsumosReales3Totales : FormGroup;
  casoEvaluado = '';
  frm_tarifas : FormGroup;
  frm_Caso4 : FormGroup;

  frm_Caso5 : FormGroup;
  cobroMedidor : FormGroup;
  tarifaE : '';
  datoImprimir : Repositorio = new Repositorio();
  datoImprimirObj : Repositorio[];
  frm_PdfEvaluar: FormGroup;
  verPDF : SafeResourceUrl;
  

  constructor(private repositorioENR : RepositorioEnrService,private chRef: ChangeDetectorRef,
    private http: HttpClient, private url: GlobalService,
    private datosENR : DatosENRService,
    public sanitizer: DomSanitizer,
    private codigoENR: CodigoENRService, private codigoMetENR: MetodologiaCalcService,
    private fb1: FormBuilder, private fb: FormBuilder,private fb2: FormBuilder,
    private fbpdf: FormBuilder,) { 

      this.frm_LecturasEvaluarTotales = new FormGroup({
        'idCaso': new FormControl(''),
        'numeroCaso': new FormControl(''),
        'totalDias' : new FormControl(''),
        'totalConsumo' : new FormControl(''),
        'totalConsumoNF' : new FormControl(''),
        'totalDifConsumo' : new FormControl(''),
        'consumoENRFacturar': new FormControl(''),
        'consumoDiarioENR': new FormControl(''),
        'consumoHistorioPromedio' : new FormControl(''),
        'consumoENREstimado' : new FormControl(''),
        'consumoENRRegistrado' : new FormControl(''),
        'consumoDebioFacturar' : new FormControl(''),
        'consumoFuera': new FormControl(''),
        'consumo1': new FormControl(''),
        'consumo2': new FormControl(''),
      });

      this.frm_ConsumosReales3Totales = new FormGroup({
        'totalDiasCT3' : new FormControl(''),
        'totalConsumoCT3' : new FormControl(''),
        'totalConsumoEstimadoCT3': new FormControl(''),
        'promedioDiasCT3': new FormControl(''),
        'idCaso' : new FormControl(''),
        'consumoENRRegistrado': new FormControl(''),
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

      this.frm_tarifas = new FormGroup({
        'fechaInicio' : new FormControl(''),
        'fechaFin' : new FormControl(''),
        'fechasTarifa' : new FormControl(''),
        'diasTarifa' : new FormControl(''),
        'numeroCaso' : new FormControl(''),
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
        'datosAdicionales' : new FormControl(''),
      });

      this.frm_ArchivoOT = new FormGroup({
      
        'tituloDocProbatorioOT' : new FormControl('',[Validators.required]),
        'tipoPruebaProbatorioOT' : new FormControl(1,[Validators.required]),
        'fileProbatorioOT' : new FormControl('',[Validators.required]),
      });

     
      this.frm_Caso1 = new FormGroup({
        'idCaso' : new FormControl('',[Validators.required]),
        'amperaje1' : new FormControl('',[Validators.required]),
        'voltaje1' : new FormControl('',[Validators.required]),
        'amperaje2' : new FormControl('',[Validators.required]),
        'voltaje2' : new FormControl('',[Validators.required]),
        'voltajeSuministro' : new FormControl('',[Validators.required]),
        'horasEstimadas' : new FormControl('',[Validators.required]),
        'consumo1' : new FormControl('',[Validators.required]),
        'consumo2' : new FormControl('',[Validators.required]),
        'consumoENRFacturar' : new FormControl('',[Validators.required]),
        'diasCobroCaso1' : new FormControl('',[Validators.required]),
        'consumoENRRegistrado': new FormControl('',[Validators.required]),
        
      });


      this.frm_Caso2 = new FormGroup({
        'idCaso' : new FormControl('',[Validators.required]),
        'censoCarga' : new FormControl('',[Validators.required]),
        'consumoEstimado' : new FormControl('',[Validators.required]),
        'voltajeSuministro' : new FormControl('',[Validators.required]),
        'diasCobroCaso2' : new FormControl('',[Validators.required]),
        'consumoENRRegistrado': new FormControl('',[Validators.required]),
      });



      this.frm_Caso3 = new FormGroup({
        'idCaso' : new FormControl('',[Validators.required]),
        'diasCobroCaso3':new FormControl('',[Validators.required]),
       
       });

       this.frm_Caso4 = new FormGroup({
        'idCaso' : new FormControl('',[Validators.required]),
        'diasCobroCaso4':new FormControl('',[Validators.required]),
         });
     
         this.frm_Caso5 = new FormGroup({
          'idCaso' : new FormControl('',[Validators.required]),
          'diasCobroCaso5':new FormControl('',[Validators.required]),
          'porcentajeExactitudOT':new FormControl('',[Validators.required]),
          'porcentajeExactitudBase':new FormControl('100',[Validators.required]),
          'diferenciaExactitud':new FormControl('',[Validators.required]),
          'consumoENRRegistrado': new FormControl('',[Validators.required]),
          });
    

          
      this.cobroMedidor = new FormGroup({
        'idCaso' : new FormControl(''),
        'cantidadCobrar' : new FormControl(''),
      });
    }

  ngOnInit() {
    this.frm_PdfEvaluar = this.fbpdf.group({pdfs: this.fbpdf.array([]),});
    this.frm_LecturasEvaluar = this.fb2.group({lecturas: this.fb2.array([]),});
    this.docForm = this.fb.group({documentacion: this.fb.array([]),});
    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
    this.rutaFile = this.url.getUrlBackEnd()+'descargarArchivo?ruta=';

    this.rutaFilePDF = this.url.getUrlBackEnd()+"public_path('files/reporteCaso";
    
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
    ////console.log(ordenNumeroG);
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


  get pdfs(){
    return this.frm_PdfEvaluar.get('pdfs') as FormArray;
  }


  get consumosReales3(){
    return this.frm_ConsumosReales3.get('consumosReales3') as FormArray;
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
        ////console.log(this.fileUploadProgress);
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
   ////console.log(this.fileUploadProgress);
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
   ////console.log(datos);
    this.ordenNumeroGN = datos;
  }

//método para guardar los adjuntos de la orden tecnica
  public guardarAdjuntosOT(ordenes){
    let datosENRdtoDoc : DatosENR = new DatosENR();
  
    datosENRdtoDoc = this.adjuntoOrdenesForm.value;
    ////console.log(ordenes);
    
    this.datosENR.saveDocOT(datosENRdtoDoc).subscribe(
      response => {
        
      },
      err => {
       // //console.log("no");
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
        ////console.log(this.cod);
      }
    );
  }

//método que obtiene la URL del archivo a ver y valida el tipo de extension
  public adjuntosOrdenesVer(adjunto, ext){
    ////console.log(adjunto);
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
        ////console.log("no");
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
        ////console.log("no");
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
       // //console.log("no");
      },
      () => {
    
      },
    );
  }

  //Método para carga de datos en tablas y formularios en la vista para editar
  public datosEditar(caso){
    ////console.log(caso);

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
        ////console.log("no");
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
      // // //console.log("no");
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
        //console.log("no");
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
        ////console.log(this.cod);
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
        ////console.log(this.cod);
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
        //console.log("no");
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
     
    ////console.log(datosCaso);

    let datos : DatosENR = new DatosENR();

    datos = this.frm_NuevoScan.value;
  
   // //console.log(datos);
   

     
    this.http.post(this.url.getUrlBackEnd() +'moveDoc', formData, {
      // reportProgress: true,
       observe: 'events'   
     })
     .subscribe(events => {
       if(events.type === HttpEventType.UploadProgress) {
         //this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
         //console.log(this.fileUploadProgress);
       } else if(events.type === HttpEventType.Response) {
        // this.fileUploadProgress = '';
   
        this.repositorioENR.cambiarScan(datos).subscribe(
          response => {
            
          },
          err => {
            //console.log("no");
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
        //console.log("no");
      },
      () => {
        let datosENRdtoDoc : DatosENR = new DatosENR();
  
        datosENRdtoDoc = this.docForm.value;
        this.datosENR.updateDocProbatoria(datosENRdtoDoc).subscribe(
          response => {
            
          },
          err => {
            //console.log("no");
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


   public validarFechaInicio(){
    var fechaMax = this.frmDatosENR.controls["fechaRegular"].value;
    var fechaInicio = this.frmDatosENR.controls["fechaInicioENR"].value;
    var fechaFin = this.frmDatosENR.controls["fechaFinENR"].value;
    if(fechaInicio > fechaMax){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha de regularización!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.frmDatosENR.controls["fechaInicioENR"].setValue('');
      this.frmDatosENR.controls["diasCobro"].setValue('')
    }
    else if(fechaFin < fechaInicio){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha fin!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.frmDatosENR.controls["fechaInicioENR"].setValue('');
      this.frmDatosENR.controls["diasCobro"].setValue('')
    }
    else{
      $("#fechaf").prop("disabled",false);
     this.calcularDias();
    }
  }

    //método para obtener dias de cobro segun el codigo tipo enr y mensaje de alerta
  //si sobrepasa el límite
  public calcularDias(){
    var fechaFin1 = new Date(this.frmDatosENR.controls["fechaFinENR"].value).getTime() ;
    var fechaInicio1 = new Date( this.frmDatosENR.controls["fechaInicioENR"].value).getTime();

    var diferencia = fechaFin1 - fechaInicio1;

    var total = diferencia / (1000 * 60 * 60 * 24);

    var diasRetroactivos = this.frmDatosENR.controls["diasRetroactivos"].value;

    
    var codigo = this.frmDatosENR.controls["codTipoENR"].value;
   
    if(codigo != '6'){
      if(total > diasRetroactivos){
        notie.alert({
          type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
          text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> El cálculo de días es mayor al permitido por el código Tipo ENR '+diasRetroactivos+'!',
          stay: false, // optional, default = false
          time: 5, // optional, default = 3, minimum = 1,
          position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
        });
      }
      this.frmDatosENR.controls["diasCobro"].setValue(total);
    }else{
     
        
        this.frmDatosENR.controls["diasCobro"].setValue(total);
      
    }
     
      
    
  

  }


  
//validación de fecha inicio y fin 
public validarFechas(){
  var fechaMax = this.frmDatosENR.controls["fechaRegular"].value;

  var fechaFin = this.frmDatosENR.controls["fechaFinENR"].value;
  var fechaInicio = this.frmDatosENR.controls["fechaInicioENR"].value;

  if(fechaFin > fechaMax){
    notie.alert({
      type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha de regularización!',
      stay: false, // optional, default = false
      time: 4, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
    this.frmDatosENR.controls["fechaFinENR"].setValue(fechaMax);
    this.calcularDias();
  }

  else if(fechaInicio > fechaFin){
    notie.alert({
      type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
      text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser menor a la fecha de inicio!',
      stay: false, // optional, default = false
      time: 4, // optional, default = 3, minimum = 1,
      position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
    });
    this.frmDatosENR.controls["fechaFinENR"].setValue(fechaMax);
    this.calcularDias();
  }

  else{
    this.calcularDias();
  }


}

   //metodo para mostrar ventana de cálculo del caso ENR

   public calcularCaso(caso, numero){
    this.frm_LecturasEvaluar = this.fb2.group({lecturas: this.fb2.array([]),});
    this.frm_ConsumosReales3 = this.fb2.group({consumosReales3: this.fb2.array([]),})
    this.frm_ConsumosReales3Totales.reset();
    this.frm_LecturasEvaluarTotales.reset();
    this.cobroMedidor.reset();

    this.frm_LecturasEvaluarTotales.controls["numeroCaso"].setValue(numero);
    this.consumosReales3.push(
      this.fb2.group({
        idCaso : numero,
        periodo:'',
        consumoRegistradoCT3:0,
        diasCT3:0,
       }),  
    );

    $("#myTabContent").hide();
    $("#myTab").hide();
    $("#titleGlobal").hide();
    $("#totalesConsumoCT3").hide();
    $("#btnSelecLecturasCaso2").hide();
    $("#btnSelecLecturasCaso3").hide();
    $("#btnSelecLecturasCaso5").hide();
    
    $("#btnFacturacion").hide();
    $("#divTarifas").hide();
    $("#loading").hide();
    
       

    this.datosGenerales = caso;

    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = caso;

    //console.log(caso);

    this.repositorioENR.getDatosENR(datosENRdto).subscribe(
      response => {
      
        this.ordenNumeroCalculo = response;
       // $("#dataNis").show();
      },
      err => {
        //console.log("no");
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
         
          "initComplete": function(settings, json) {
            $("#titleCalculo").show();
          },
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
        ////console.log(this.cod);
      }
    );
   
  

   }


   public cerrarCalculo(){
    $("#titleCalculo").hide();
    $("#resultCaso1").hide();
    this.frm_Caso1.reset();
    this.frm_Caso2.reset();
    
    this.frm_Caso5.controls["porcentajeExactitudOT"].setValue('');
    this.frm_Caso5.controls["diferenciaExactitud"].setValue('');

    $("#myTabContent").show();
    $("#myTab").show();
    $("#titleGlobal").show();
    $("#divTarifas").hide();
   }


   public calcularENRCaso1(){
    this.casoEvaluado = '1';
    $("#resultCaso1").hide();

     var diasCobro = this.frm_Caso1.controls["diasCobroCaso1"].value;
     
     var amperaje1 = this.frm_Caso1.controls["amperaje1"].value;
     var voltaje1 = this.frm_Caso1.controls["voltaje1"].value;
     var amperaje2 = this.frm_Caso1.controls["amperaje2"].value;
     var voltaje2 = this.frm_Caso1.controls["voltaje2"].value;
     var horas = this.frm_Caso1.controls["horasEstimadas"].value;

     var totalConsumoL1 = (amperaje1 * voltaje1 * horas) / 1000;
     var totalConsumoL2 = (amperaje2 * voltaje2 * horas) / 1000;

     var consRegi = this.frm_Caso1.controls["consumoENRRegistrado"].value;


     this.frm_LecturasEvaluarTotales.controls["consumo1"].setValue(totalConsumoL1);
     this.frm_LecturasEvaluarTotales.controls["consumo2"].setValue(totalConsumoL2);

     this.frm_LecturasEvaluarTotales.controls["consumoENRRegistrado"].setValue(consRegi);

     var consumoENR = ((totalConsumoL1 + totalConsumoL2) * diasCobro)- consRegi;

     
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
     
      this.frm_LecturasEvaluarTotales.controls["consumoENRFacturar"].setValue(consumoENR.toFixed(3));
      $("#resultCaso1").show();
      $("#btnFacturacion").show();
     }
      
     
     
   }


  esconderSpan(){
    $("#sHorasValidator").hide();
  }


  public calcularConDiarioENR1(){
    var censo = this.frm_Caso2.controls["censoCarga"].value;
    

    var total = censo / 30;
    this.frm_Caso2.controls["consumoEstimado"].setValue(total.toFixed(3));

    $("#btnSelecLecturasCaso2").show();
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
      this.frm_LecturasEvaluarTotales.controls["totalConsumo"].setValue(sumatoriaConsumo.toFixed(3));
      this.frm_LecturasEvaluarTotales.controls["totalConsumoNF"].setValue(sumatoriaConsumoNF.toFixed(3));
      this.frm_LecturasEvaluarTotales.controls["totalDifConsumo"].setValue(sumatoriaDifConsumo.toFixed(3));

      var consumoENRDiario = (sumatoriaDifConsumo / sumatoriaDias).toFixed(3);

      this.frm_LecturasEvaluarTotales.controls["consumoDiarioENR"].setValue(consumoENRDiario);

      if(this.casoEvaluado == '2'){
        var consRegi = this.frm_Caso2.controls["consumoENRRegistrado"].value;

        var consumoENRFacturar = ((sumatoriaDifConsumo / sumatoriaDias) *
        this.frm_Caso2.controls["diasCobroCaso2"].value - consRegi).toFixed(3);
  
        this.frm_LecturasEvaluarTotales.controls["consumoENRFacturar"].setValue(consumoENRFacturar);
        this.frm_LecturasEvaluarTotales.controls["consumoENRRegistrado"].setValue(consRegi);
  
      }else if(this.casoEvaluado == '3'){

        var consRegi = this.frm_ConsumosReales3Totales.controls["consumoENRRegistrado"].value;

        var consumoENRFacturar = ((sumatoriaDifConsumo / sumatoriaDias) *
        this.frm_Caso3.controls["diasCobroCaso3"].value - consRegi).toFixed(3);
        
        this.frm_LecturasEvaluarTotales.controls["consumoENRFacturar"].setValue(consumoENRFacturar);
        this.frm_LecturasEvaluarTotales.controls["consumoENRRegistrado"].setValue(consRegi);

      }else if(this.casoEvaluado == '4'){
        var diasHistorico = this.frm_LecturasEvaluarTotales.controls["totalDias"].value;
        var consumoHistorico = this.frm_LecturasEvaluarTotales.controls["totalConsumo"].value;

        var promedioConsumo = consumoHistorico / diasHistorico;

        this.frm_LecturasEvaluarTotales.controls["consumoHistorioPromedio"].setValue(promedioConsumo.toFixed(3));


        var consumoENREs = (consumoHistorico / diasHistorico)* this.frm_Caso4.controls["diasCobroCaso4"].value;
        this.frm_LecturasEvaluarTotales.controls["consumoENREstimado"].setValue(consumoENREs.toFixed(3));

      }

      else if(this.casoEvaluado == '5'){
        const consumoFuera = [];
        const consumoCorrecto = [];

        //Calcular consumo fuera de rango
        $.each($('input[name=\'consumoFuera\']'), function(){
          consumoFuera.push($(this).val());
        });
  
  
        var sumatoriaConsumoFuera = consumoFuera.reduce(function(acumulador, siguienteValor){
          return parseFloat(acumulador) + parseFloat(siguienteValor);
        }, 0);


        //Calcular debio facturar
        $.each($('input[name=\'consumoCorrecto\']'), function(){
          consumoCorrecto.push($(this).val());
        });
  
  
        var sumatoriaConsumoCorrecto = consumoCorrecto.reduce(function(acumulador, siguienteValor){
          return parseFloat(acumulador) + parseFloat(siguienteValor);
        }, 0);

        var consRegi = this.frm_Caso5.controls["consumoENRRegistrado"].value;

        this.frm_LecturasEvaluarTotales.controls["consumoFuera"].setValue(sumatoriaConsumoFuera.toFixed(3));
        this.frm_LecturasEvaluarTotales.controls["consumoDebioFacturar"].setValue(sumatoriaConsumoCorrecto.toFixed(3));
        this.frm_LecturasEvaluarTotales.controls["consumoENRRegistrado"].setValue(consRegi);
       

        var totalENR = sumatoriaConsumoCorrecto - sumatoriaConsumo - consRegi;
        
        this.frm_LecturasEvaluarTotales.controls["consumoENRFacturar"].setValue(totalENR.toFixed(3));
      }
     
      this.totalSeleccion = dias.length;

      
     // 
    
    
    
  }




  //metodo para cargar lecturas del NIS
  public mostrarLecturas(datos,caso){

    this.casoEvaluado = caso;

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
    this.totalizarDatos();
    $("#mostrarLecturas").hide();
      $("#frmLec").show();
      $("#frmLecTotales").show();
      $("#btnFacturacion").show();
  }
 

  public cancelarModalLecturas(){
    $("#mostrarLecturas").hide();
  }

  public agregarLectura(periodo,fechaLecturaAnt,fechaLectura,diasFacturados,consumoN,i){
    $("#add"+periodo).hide();
    $("#tr"+periodo).addClass("adjuntos");
    $("#remove"+periodo).show();
    
    if(this.casoEvaluado == '2'){
      this.lecturas.push(
        this.fb2.group({
          idCaso: this.frm_Caso2.controls["idCaso"].value,
          periodo:periodo,
          fechaLecturaAnt:fechaLecturaAnt,
          fechaLectura:fechaLectura,
          diasFacturados:diasFacturados,
          consumo:consumoN,
          consumoNoFac: (diasFacturados * this.consumoDiario).toFixed(3),
          difConsumo : ((diasFacturados * this.consumoDiario)  - consumoN).toFixed(3)
         }),  
    );
    }else if(this.casoEvaluado == '3'){
      this.lecturas.push(
        this.fb2.group({
          idCaso: this.frm_Caso3.controls["idCaso"].value,
          periodo:periodo,
          fechaLecturaAnt:fechaLecturaAnt,
          fechaLectura:fechaLectura,
          diasFacturados:diasFacturados,
          consumo:consumoN,
          consumoNoFac: (diasFacturados * this.frm_ConsumosReales3Totales.controls["promedioDiasCT3"].value).toFixed(3),
          difConsumo : ((diasFacturados * this.frm_ConsumosReales3Totales.controls["promedioDiasCT3"].value) -consumoN).toFixed(3)
         }),  
    );
    }else if(this.casoEvaluado == '4'){
      this.lecturas.push(
        this.fb2.group({
          idCaso: this.frm_Caso4.controls["idCaso"].value,
          periodo:periodo,
          fechaLecturaAnt:fechaLecturaAnt,
          fechaLectura:fechaLectura,
          diasFacturados:diasFacturados,
          consumo:consumoN,
         }),  
    );
    }else if(this.casoEvaluado == '5'){
      if(this.frm_Caso5.controls["diferenciaExactitud"].value > 0){
        this.lecturas.push(
          this.fb2.group({
            idCaso: this.frm_Caso5.controls["idCaso"].value,
            periodo:periodo,
            fechaLecturaAnt:fechaLecturaAnt,
            fechaLectura:fechaLectura,
            diasFacturados:diasFacturados,
            consumo:consumoN,
            consumoFuera : ((consumoN * this.frm_Caso5.controls["diferenciaExactitud"].value)/
            this.frm_Caso5.controls["porcentajeExactitudOT"].value).toFixed(3),
           
            consumoCorrecto : (parseFloat(consumoN) - (Math.abs((consumoN * this.frm_Caso5.controls["diferenciaExactitud"].value)/
            this.frm_Caso5.controls["porcentajeExactitudOT"].value))).toFixed(3),
           }),  
      );
      }else{
        this.lecturas.push(
          this.fb2.group({
            idCaso: this.frm_Caso5.controls["idCaso"].value,
            periodo:periodo,
            fechaLecturaAnt:fechaLecturaAnt,
            fechaLectura:fechaLectura,
            diasFacturados:diasFacturados,
            consumo:consumoN,
            consumoFuera : ((consumoN * this.frm_Caso5.controls["diferenciaExactitud"].value)/
            this.frm_Caso5.controls["porcentajeExactitudOT"].value).toFixed(3),
           
            consumoCorrecto : (parseFloat(consumoN) + (Math.abs((consumoN * this.frm_Caso5.controls["diferenciaExactitud"].value)/
            this.frm_Caso5.controls["porcentajeExactitudOT"].value))).toFixed(3),
           }),  
      );
      }
     
    }
    


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




  //metodo para cargar lecturas del NIS
  public mostrarLecturasCasos(datos, caso){
    this.casoEvaluado = caso;
    this.datosGeneralesLecturas =datos;
    let datosENRdto : DatosENR = new DatosENR();
    datosENRdto = datos;

    $("#mostrarLecturas").show();
      
  }


  public agregarConsumoReal(){
    this.consumosReales3.push(
      this.fb2.group({
        idCaso: this.frm_Caso3.controls["idCaso"].value,
        periodo:'',
        consumoRegistradoCT3:0,
        diasCT3:0,
       }),  
    );
    $("#totalesConsumoCT3").hide();
    $("#btnSelecLecturasCaso3").hide();
  }

  public eliminarConsumoReal(i){
    this.consumosReales3.removeAt(i);
    $("#totalesConsumoCT3").hide();
    $("#btnSelecLecturasCaso3").hide();
  }

  public totalizarConsumosReales3(){
    const dias = [];
    const consumo = [];

    //Calcular dias totales
    $.each($('input[name=\'diasCT3\']'), function(){
      dias.push($(this).val());
    });


    var sumatoriaDias = dias.reduce(function(acumulador, siguienteValor){
      return parseFloat(acumulador) + parseFloat(siguienteValor);
    }, 0);


    //calcular consumo total
    $.each($('input[name=\'consumoRegistradoCT3\']'), function(){
      consumo.push($(this).val());
    });


    var sumatoriaConsumo = consumo.reduce(function(acumulador, siguienteValor){
      return parseFloat(acumulador) + parseFloat(siguienteValor);
    }, 0);

    if(this.dias.length == 0 && this.consumo.length == 0){

    }

    this.frm_ConsumosReales3Totales.controls["totalDiasCT3"].setValue(sumatoriaDias);
    this.frm_ConsumosReales3Totales.controls["totalConsumoCT3"].setValue(sumatoriaConsumo.toFixed(3));
   
    var promedioDia = sumatoriaConsumo / sumatoriaDias;
    var consumoEstimadoMensual = (sumatoriaConsumo / sumatoriaDias) * 30;
    this.frm_ConsumosReales3Totales.controls["promedioDiasCT3"].setValue(promedioDia.toFixed(3));
    this.frm_ConsumosReales3Totales.controls["totalConsumoEstimadoCT3"].setValue(consumoEstimadoMensual.toFixed(3));
    $("#totalesConsumoCT3").show();
    $("#btnSelecLecturasCaso3").show();
    //$(".calc").click();
    this.totalizarDatos();
  }


  calcularENRCaso4(){
    var consumoEst = this.frm_LecturasEvaluarTotales.controls["consumoENREstimado"].value;
    var consumoReg = this.frm_LecturasEvaluarTotales.controls["consumoENRRegistrado"].value;

    var total = consumoEst - consumoReg;

    this.frm_LecturasEvaluarTotales.controls["consumoENRFacturar"].setValue(total.toFixed(3));
  }


  calcularDiferenciaExactitud(){
    var exOT =  this.frm_Caso5.controls["porcentajeExactitudOT"].value;
    var exBase = this.frm_Caso5.controls["porcentajeExactitudBase"].value;

    var total = exOT - exBase;

    this.frm_Caso5.controls["diferenciaExactitud"].setValue(total.toFixed(3));

    $("#btnSelecLecturasCaso5").show();
  }

//Metodo que calcula todos los cuadros de facturación
  public verTarifas(tarifa){
 
    
    $("#loading").fadeIn();
    $("#divTarifas").hide();
    var caso = this.casoEvaluado;
    let datosKwh :  DatosENR = new DatosENR();

    datosKwh = this.frm_LecturasEvaluarTotales.value;
   
    

    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = this.frm_tarifas.value;
    this.repositorioENR.getTarifasFechas(datosENRdto).subscribe(
      response => {
        this.tarifasFechas =response;
      },
      err => {
      // // //console.log("no");
      },
      () => {
    
        this.repositorioENR.getTarifasFechasTotal(datosENRdto).subscribe(
          response => {
            this.tarifasFechasTotal =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {
        
          },
        );


      },
    );



    this.repositorioENR.getConsumoEstimado(datosKwh).subscribe(
      response => {
        this.consumoEstimado =response;
      },
      err => {
      // // //console.log("no");
      },
      () => {
    
        this.repositorioENR.getConsumoEstimadoTotal(datosKwh).subscribe(
          response => {
            this.consumoEstimadoTotal =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {
        
          },
        );

      },
    );

    this.repositorioENR.getConsumoRegistrado(datosKwh).subscribe(
      response => {
        this.consumoRegistrado =response;
      },
      err => {
      // // //console.log("no");
      },
      () => {
    
        this.repositorioENR.getConsumoRegistradoTotal(datosKwh).subscribe(
          response => {
            this.consumoRegistradoTotal =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {
        
          },
        );

      },
    );

    this.repositorioENR.getConsumoENR(datosKwh).subscribe(
      response => {
        this.consumoENR =response;
      },
      err => {
      // // //console.log("no");
      },
      () => {
        this.repositorioENR.getConsumoENRTotal(datosKwh).subscribe(
          response => {
            this.consumoENRTotal =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {
        
          },
        );

          if(tarifa === '1R'){

          
        this.repositorioENR.getConsumoENR1erBloque(datosKwh).subscribe(
          response => {
            this.consumoENR1erBloque =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {
        
          },
        );


        this.repositorioENR.getConsumoENR2doBloque(datosKwh).subscribe(
          response => {
            this.consumoENR2doBloque =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {
        
          },
        );


        this.repositorioENR.getConsumoENR3erBloque(datosKwh).subscribe(
          response => {
            this.consumoENR3erBloque =response;
          },
          err => {
          // // //console.log("no");
          },
          () => {

            this.repositorioENR.getConsumoENR1erBloqueTotal(datosKwh).subscribe(
              response => {
                this.consumoENR1erBloqueTotal =response;
              },
              err => {
              // // //console.log("no");
              },
              () => {
            
              },
            );
    
    
            this.repositorioENR.getConsumoENR2doBloqueTotal(datosKwh).subscribe(
              response => {
                this.consumoENR2doBloqueTotal =response;
              },
              err => {
              // // //console.log("no");
              },
              () => {
            
              },
            );
    
    
            this.repositorioENR.getConsumoENR3erBloqueTotal(datosKwh).subscribe(
              response => {
                this.consumoENR3erBloqueTotal =response;
              },
              err => {
              // // //console.log("no");
              },
              () => {
            
                this.repositorioENR.getConsumoENRTotalFechas(datosKwh).subscribe(
                  response => {
                    this.consumoENRTotalGlobalFechas =response;
                  },
                  err => {
                  // // //console.log("no");
                  },
                  () => {
                
                  },
                );


                this.repositorioENR.getConsumoENRTotalGlobal(datosKwh).subscribe(
                  response => {
                    this.consumoENRTotalGlobal =response;
                  },
                  err => {
                  // // //console.log("no");
                  },
                  () => {
                
                    this.repositorioENR.getConsumoENR1erBloqueEnergia(datosKwh).subscribe(
                      response => {
                        this.consumoENR1erBloqueEnergia =response;
                      },
                      err => {
                      // // //console.log("no");
                      },
                      () => {
                    
                      },
                    );
            
            
                    this.repositorioENR.getConsumoENR2doBloqueEnergia(datosKwh).subscribe(
                      response => {
                        this.consumoENR2doBloqueEnergia =response;
                      },
                      err => {
                      // // //console.log("no");
                      },
                      () => {
                    
                      },
                    );
            
            
                    this.repositorioENR.getConsumoENR3erBloqueEnergia(datosKwh).subscribe(
                      response => {
                        this.consumoENR3erBloqueEnergia =response;
                      },
                      err => {
                      // // //console.log("no");
                      },
                      () => {
            
                        this.repositorioENR.getConsumoENR1erBloqueTotalEnergia(datosKwh).subscribe(
                          response => {
                            this.consumoENR1erBloqueTotalEnergia =response;
                          },
                          err => {
                          // // //console.log("no");
                          },
                          () => {
                        
                          },
                        );
                
                
                        this.repositorioENR.getConsumoENR2doBloqueTotalEnergia(datosKwh).subscribe(
                          response => {
                            this.consumoENR2doBloqueTotalEnergia =response;
                          },
                          err => {
                          // // //console.log("no");
                          },
                          () => {
                        
                          },
                        );
                
                
                        this.repositorioENR.getConsumoENR3erBloqueTotalEnergia(datosKwh).subscribe(
                          response => {
                            this.consumoENR3erBloqueTotalEnergia =response;
                          },
                          err => {
                          // // //console.log("no");
                          },
                          () => {
                        
                            this.repositorioENR.getConsumoENRTotalFechasEnergia(datosKwh).subscribe(
                              response => {
                                this.consumoENRTotalGlobalFechasEnergia =response;
                              },
                              err => {
                              // // //console.log("no");
                              },
                              () => {
                            
                              },
                            );
            
            
                            this.repositorioENR.getConsumoENRTotalGlobalEnergia(datosKwh).subscribe(
                              response => {
                                this.consumoENRTotalGlobalEnergia =response;
                              },
                              err => {
                              // // //console.log("no");
                              },
                              () => {
                            
                              },
                            );

                            this.repositorioENR.getConsumoENR1erBloqueDistribucion(datosKwh).subscribe(
                              response => {
                                this.consumoENR1erBloqueDistribucion =response;
                              },
                              err => {
                              // // //console.log("no");
                              },
                              () => {
                            
                              },
                            );
                    
                    
                            this.repositorioENR.getConsumoENR2doBloqueDistribucion(datosKwh).subscribe(
                              response => {
                                this.consumoENR2doBloqueDistribucion =response;
                              },
                              err => {
                              // // //console.log("no");
                              },
                              () => {
                            
                              },
                            );
                    
                    
                            this.repositorioENR.getConsumoENR3erBloqueDistribucion(datosKwh).subscribe(
                              response => {
                                this.consumoENR3erBloqueDistribucion =response;
                              },
                              err => {
                              // // //console.log("no");
                              },
                              () => {
                    
                                this.repositorioENR.getConsumoENR1erBloqueTotalDistribucion(datosKwh).subscribe(
                                  response => {
                                    this.consumoENR1erBloqueTotalDistribucion =response;
                                  },
                                  err => {
                                  // // //console.log("no");
                                  },
                                  () => {
                                
                                  },
                                );
                        
                        
                                this.repositorioENR.getConsumoENR2doBloqueTotalDistribucion(datosKwh).subscribe(
                                  response => {
                                    this.consumoENR2doBloqueTotalDistribucion =response;
                                  },
                                  err => {
                                  // // //console.log("no");
                                  },
                                  () => {
                                
                                  },
                                );
                        
                        
                                this.repositorioENR.getConsumoENR3erBloqueTotalDistribucion(datosKwh).subscribe(
                                  response => {
                                    this.consumoENR3erBloqueTotalDistribucion =response;
                                  },
                                  err => {
                                  // // //console.log("no");
                                  },
                                  () => {
                                
                                    this.repositorioENR.getConsumoENRTotalFechasDistribucion(datosKwh).subscribe(
                                      response => {
                                        this.consumoENRTotalGlobalFechasDistribucion =response;
                                      },
                                      err => {
                                      // // //console.log("no");
                                      },
                                      () => {
                                    
                                      },
                                    );
                    
                    
                                    this.repositorioENR.getConsumoENRTotalGlobalDistribucion(datosKwh).subscribe(
                                      response => {
                                        this.consumoENRTotalGlobalDistribucion =response;
                                      },
                                      err => {
                                      // // //console.log("no");
                                      },
                                      () => {
                                        $("#loading").fadeOut();
                                        $("#divTarifas").show();
                                        
                                        
                                       
                                      },
                                    );
                    
                    
                                    
                    
                                  },
                                );
                    
                    
                              },
                            );
            
            
                            
            
                          },
                        );
            
            
                      },
                    );

                  },
                );


                

              },
            );


          },
        );
          }

          if(tarifa == '1G'){
           

            
            this.repositorioENR.getConsumoENRBloqueDistribucion1G(datosKwh).subscribe(
              response => {
                this.consumoENRTotalGlobalFechasDistribucion =response;
              },
              err => {
              // // //console.log("no");
              },
              () => {
            
              },
            );

            this.repositorioENR.getConsumoENRBloqueEnergia1G(datosKwh).subscribe(
              response => {
                this.consumoENR3erBloqueTotalEnergia =response;
              },
              err => {
              // // //console.log("no");
              },
              () => {
                this.repositorioENR.getConsumoENRBloqueEnergia1GTotal(datosKwh).subscribe(
                  response => {
                    this.consumoENR1erBloqueTotalEnergia =response;
                  },
                  err => {
                  // // //console.log("no");
                  },
                  () => {
                    this.repositorioENR.getConsumoENRBloqueDistribucion1GTotal(datosKwh).subscribe(
                      response => {
                        this.consumoENR1erBloqueTotalDistribucion =response;
                      },
                      err => {
                      // // //console.log("no");
                      },
                      () => {
                        $("#loading").fadeOut();
                        $("#divTarifas").show();
                        
                        
                       
                      },
                    );
                    
                   
                  },
                );
               
              },
            );
          }
      },
    );






    

  }



  public calcularDiasTarifas(){
    var lastFecha = new Date($("#fechasTarifas th:last").text()).getTime();

    var lastPrimero = new Date($("#fechasTarifas th:first").text()).getTime();

    var fechaInicio = new Date( this.frm_tarifas.controls["fechaInicio"].value).getTime();
    var fechaFin = new Date( this.frm_tarifas.controls["fechaFin"].value).getTime();

    var diferencia = fechaFin - fechaInicio;

    alert(diferencia);
  }



  public guardarDatosFinales(){
    var caso = this.casoEvaluado;

    if(caso == '1'){  
      
      let datosCalculados1 : DatosENR = new DatosENR();
  
      datosCalculados1 = this.frm_Caso1.value;

      this.repositorioENR.saveDatosCalCaso1(datosCalculados1).subscribe(
        response => {
          
        },
        err => {
         // //console.log("no");
        },
        () => { 
          let datosCalculados2 : DatosENR = new DatosENR();
  
          datosCalculados2 = this.frm_LecturasEvaluarTotales.value;

          this.repositorioENR.updateDatosCalCaso1(datosCalculados2).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              this.cobrarMedidor();
              notie.alert({
                type: 'success',
                text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Datos guardados con éxito!',
                stay: false, 
                time: 2, 
                position: 'top' 
              });
              this.cerrarCalculo();   
              this.getRepositorioIng();
              this.getRepositorioCalc();
              this.getRepositorioNoti();
        
             
            },
          );

        },
      );

    }

    if(caso == '2'){
      let datosCalculados1 : DatosENR = new DatosENR();
  
      datosCalculados1 = this.frm_Caso2.value;

      this.repositorioENR.saveDatosCalCaso2(datosCalculados1).subscribe(
        response => {
          
        },
        err => {
         // //console.log("no");
        },
        () => { 
          let datosCalculados2 : DatosENR = new DatosENR();
  
          datosCalculados2 = this.frm_LecturasEvaluarTotales.value;

          this.repositorioENR.updateDatosCalCaso2(datosCalculados2).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              
              let periodosSeleccionados : DatosENR = new DatosENR();
  
              periodosSeleccionados = this.frm_LecturasEvaluar.value;

          this.repositorioENR.savePeriodosSeleccionadosCaso2(periodosSeleccionados).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              this.cobrarMedidor();
              notie.alert({
                type: 'success',
                text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Datos guardados con éxito!',
                stay: false, 
                time: 2, 
                position: 'top' 
              });
              this.cerrarCalculo();   
              this.getRepositorioIng();
              this.getRepositorioCalc();
              this.getRepositorioNoti();
             
            },
          );
        
             
            },
          );

          

        },
      );

    }




    if(caso == '3'){
      let consumosReales : DatosENR = new DatosENR();
  
      consumosReales = this.frm_ConsumosReales3.value;

      this.repositorioENR.consumosRealesCaso3(consumosReales).subscribe(
        response => {
          
        },
        err => {
         // //console.log("no");
        },
        () => { 
          let consumosRealesTotales : DatosENR = new DatosENR();
  
          consumosRealesTotales = this.frm_ConsumosReales3Totales.value;

          this.repositorioENR.consumosRealesCaso3Totales(consumosRealesTotales).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              
              let periodosSeleccionados : DatosENR = new DatosENR();
  
              periodosSeleccionados = this.frm_LecturasEvaluar.value;

          this.repositorioENR.savePeriodosSeleccionadosCaso3(periodosSeleccionados).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              
              let periodosSeleccionados : DatosENR = new DatosENR();
  
              periodosSeleccionados = this.frm_LecturasEvaluarTotales.value;

          this.repositorioENR.updateDatosCalCaso3(periodosSeleccionados).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              this.cobrarMedidor();
              notie.alert({
                type: 'success',
                text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Datos guardados con éxito!',
                stay: false, 
                time: 2, 
                position: 'top' 
              });
              this.cerrarCalculo();   
              this.getRepositorioIng();
              this.getRepositorioCalc();
              this.getRepositorioNoti();
             
            },
          );
        
             
            },
          );
        
             
            },
          );
        },
      );

    }


    if(caso == '4'){
      let periodosSeleccionados : DatosENR = new DatosENR();
  
              periodosSeleccionados = this.frm_LecturasEvaluar.value;

          this.repositorioENR.savePeriodosSeleccionadosCaso4(periodosSeleccionados).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              
              let datosCalculados4 : DatosENR = new DatosENR();
  
          datosCalculados4 = this.frm_LecturasEvaluarTotales.value;

          this.repositorioENR.saveDatosCalCaso4(datosCalculados4).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              this.cobrarMedidor();
              notie.alert({
                type: 'success',
                text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Datos guardados con éxito!',
                stay: false, 
                time: 2, 
                position: 'top' 
              });
              this.cerrarCalculo();
              this.getRepositorioIng();
              this.getRepositorioCalc();
              this.getRepositorioNoti();
             
            },
          );
        
             
            },
          );
    }


    if(caso == '5'){
      let datosCalculados5 : DatosENR = new DatosENR();
  
          datosCalculados5 = this.frm_Caso5.value;

          this.repositorioENR.saveDatosCalCaso5(datosCalculados5).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              let periodosSeleccionados : DatosENR = new DatosENR();
  
              periodosSeleccionados = this.frm_LecturasEvaluar.value;

          this.repositorioENR.savePeriodosSeleccionadosCaso5(periodosSeleccionados).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 

              let datosCalculados5 : DatosENR = new DatosENR();
  
              datosCalculados5 = this.frm_LecturasEvaluarTotales.value;

          this.repositorioENR.updateDatosCalCaso5(datosCalculados5).subscribe(
            response => {
              
            },
            err => {
             // //console.log("no");
            },
            () => { 
              this.cobrarMedidor();
              notie.alert({
                type: 'success',
                text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Datos guardados con éxito!',
                stay: false, 
                time: 2, 
                position: 'top' 
              });
              this.cerrarCalculo();
                 
              this.getRepositorioIng();
              this.getRepositorioCalc();
              this.getRepositorioNoti();
              },
            );

              },
            );
             
            },
          );
    }
    
 


  }


  public cobrarMedidor(){

    let cobroMedidor : DatosENR = new DatosENR();
  
    cobroMedidor = this.cobroMedidor.value;

      this.repositorioENR.cobroMedidor(cobroMedidor).subscribe(
        response => {
          
        },
        err => {
        // //console.log("no");
        },
        () => { 



    },
  );
  }

  hideTotales1(){
    $("#resultCaso1").hide();
    $("#btnFacturacion").hide();
  }

  totalizarDato(){
    this.totalizarDatos();
  }


  public datosImprimir(caso){
    this.datoImprimir = caso;
    this.frm_PdfEvaluar = this.fbpdf.group({pdfs: this.fbpdf.array([]),});
    

    let casoEvaluado : Repositorio = new Repositorio();
  
    casoEvaluado = caso;

    this.repositorioENR.getDatosImprimir(casoEvaluado).subscribe(
      response => {

        this.datoImprimirObj = response;

        const table: any = $('#filePrint');
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
      err => {
       // //console.log("no");
      },
      () => { 
      },
    );
    
  }


  public agregarPDF(id, ruta){
    $("#addPDF"+id).hide();
    $("#trPDF"+id).addClass("adjuntos");
    $("#removePDF"+id).show();

    this.pdfs.push(
      this.fbpdf.group({
       archivo : ruta,
        id : id,
      })
  
    );

  } 


  public eliminarPDF(i,id){

    this.pdfs.removeAt(i);

    $("#addPDF"+id).show();
    $("#trPDF"+id).removeClass("adjuntos");
    $("#removePDF"+id).hide();
  }


  public eliminarPdfTbl(id){
    $("#btnElPDF"+id).click();
  }
  




  public fusionarPDF(caso, id){


    var url = this.url.getUrlBackEnd()+'files/reporteCaso'+id+'.pdf';

    this.verPDF =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
  
   // console.log(this.verPDF);


   this.repositorioENR.anexoCalculo(caso).subscribe(
    response => {

   

    },
    err => {
     // //console.log("no");
    },
    () => { 

      let documentosSeleccionados : DatosENR = new DatosENR();
  
      documentosSeleccionados = Object.assign(this.frm_PdfEvaluar.value, caso);
    
      
      this.repositorioENR.multiplesArchivos(documentosSeleccionados).subscribe(
        response => {
        
        
        },
        err => {
        // //console.log("no");
        },
        () => { 
          window.open(url, '_blank');
        },
        );

        
    },
  );





   
     
  }



  
}





