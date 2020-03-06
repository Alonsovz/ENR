import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatosENRService } from 'src/app/service/datos-enr.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatosENR } from 'src/app/models/datos-enr';
import notie from 'notie';
import { CodigoENRService } from 'src/app/service/codigo-enr.service';
import { codigos } from 'src/app/models/codigos';
import { metodologia } from 'src/app/models/metodologiaCal';
import { MetodologiaCalcService } from 'src/app/service/metodologia-calc.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-datos-enr',
  templateUrl: './datos-enr.component.html',
  styleUrls: ['./datos-enr.component.css']
})
export class DatosENRComponent implements OnInit {
  frm_NIS : FormGroup;
  frm_DatosNIS : FormGroup;
  datos: DatosENR[] = new Array();
  dias: DatosENR[] = new Array();
  addForm: FormGroup;
  codigosENR : codigos[];
  codigosMetENR : metodologia[];
  docForm: FormGroup;
  adjuntoOrdenesForm: FormGroup;
  dataTable: any;
  ordenes : DatosENR[];
  ordenNumero : DatosENR = new DatosENR();

  constructor( private datosENR : DatosENRService, private chRef: ChangeDetectorRef,
    private fb: FormBuilder,private fb1: FormBuilder, 
    private codigoENR: CodigoENRService, private codigoMetENR: MetodologiaCalcService) {
    

    this.frm_NIS = new FormGroup({
      'nis' : new FormControl('',[Validators.required]),
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
     this.codigoENR.getCodigoENR().subscribe(data => {this.codigosENR = data;});
     this.codigoMetENR.getMetodologiaCalc().subscribe(data => {this.codigosMetENR = data;});
     this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
   }

   

    get documentos() {
      return this.docForm.get('documentacion') as FormArray;
    }

    addDoc() {
      this.documentos.push(
        this.fb.group({nombreDoc:'',tipoPrueba:1,archivo:''}),    
        );
    }
  
    deleteDoc(index) {
      this.documentos.removeAt(index);
    }


    get adjuntos(){
      return this.adjuntoOrdenesForm.get('documentacionOrden') as FormArray;
    }


    addDocOrden() {
      this.adjuntos.push(
        this.fb1.group({nombreDocOrden:'',tipoAdjuntoOrden:1,archivoOrden:''}),    
        );
    }
  
    deleteDocOrden(index) {
      this.adjuntos.removeAt(index);
    }

  
  public obtenerDatos(){
    this.docForm = this.fb.group({documentacion: this.fb.array([]),});

    this.adjuntoOrdenesForm = this.fb1.group({documentacionOrden: this.fb1.array([]),});
  
    let datosENRdto : DatosENR = new DatosENR();

    datosENRdto = this.frm_NIS.value;
    
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
       
        'responsive': true,
          'order' :[[3,'desc']],

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


  public asigFechaFin(){
    var fecha = this.frm_DatosNIS.controls["fechaRegular"].value;

    this.frm_DatosNIS.controls["fechaFinENR"].setValue(fecha);
  }


  public validarFechas(){
    var fechaMax = this.frm_DatosNIS.controls["fechaRegular"].value;

    var fechaFin = this.frm_DatosNIS.controls["fechaFinENR"].value;
    var fechaInicio = this.frm_DatosNIS.controls["fechaInicioENR"].value;

    if(fechaFin > fechaMax){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha de regularización!',
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
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser menor a la fecha de inicio!',
        stay: false, // optional, default = false
        time: 4, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });
      this.frm_DatosNIS.controls["fechaFinENR"].setValue(fechaMax);
      this.calcularDias();
    }

    else{
      this.calcularDias();
    }


  }

  public validarFechaInicio(){
    var fechaMax = this.frm_DatosNIS.controls["fechaRegular"].value;
    var fechaInicio = this.frm_DatosNIS.controls["fechaInicioENR"].value;
    var fechaFin = this.frm_DatosNIS.controls["fechaFinENR"].value;
    if(fechaInicio > fechaMax){
      notie.alert({
        type: 'error', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha de regularización!',
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
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/problem.png" width=40 height=40> No debe ser mayor a la fecha fin!',
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
    }
  }

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

  public calcularDias(){
    var fechaFin1 = new Date(this.frm_DatosNIS.controls["fechaFinENR"].value).getTime() ;
    var fechaInicio1 = new Date( this.frm_DatosNIS.controls["fechaInicioENR"].value).getTime();

    var diferencia = fechaFin1 - fechaInicio1;

    var total = diferencia / (1000 * 60 * 60 * 24);

    var diasRetroactivos = this.frm_DatosNIS.controls["diasRetroactivos"].value;

    
    var codigo = this.frm_DatosNIS.controls["codTipoENR"].value;
   
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
      this.frm_DatosNIS.controls["diasCobro"].setValue(total);
    }else{
     
        
        this.frm_DatosNIS.controls["diasCobro"].setValue(total);
      
    }
     
      
    
  

  }


  public modalAdjuntar(orden){
    this.ordenNumero = orden;
  }

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


 public guardarDatos(){
  let datosENRdto : DatosENR = new DatosENR();

  datosENRdto = this.frm_DatosNIS.value;


  this.datosENR.saveDatosNISGenerales(datosENRdto).subscribe(
    response => {
      
    },
    err => {
      console.log("no");
    },
    () => {
      notie.alert({
        type: 'success', // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: '<img class="img-profile alertImg" src="../../../assets/imagenes/save.png" width=40 height=40> Caso guardado con éxito!',
        stay: false, // optional, default = false
        time: 2, // optional, default = 3, minimum = 1,
        position: 'top' // optional, default = 'top', enum: ['top', 'bottom']
      });

      this.cancelarGuardado();
    },
  );
 }


}
