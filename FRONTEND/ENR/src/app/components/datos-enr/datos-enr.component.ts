import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatosENRService } from 'src/app/service/datos-enr.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatosENR } from 'src/app/models/datos-enr';
import notie from 'notie';

@Component({
  selector: 'app-datos-enr',
  templateUrl: './datos-enr.component.html',
  styleUrls: ['./datos-enr.component.css']
})
export class DatosENRComponent implements OnInit {
  frm_NIS : FormGroup;
  frm_DatosNIS : FormGroup;
  datos: DatosENR[] = new Array();
  addForm: FormGroup;

  productForm: FormGroup;
  constructor( private datosENR : DatosENRService, private chRef: ChangeDetectorRef,
    private fb: FormBuilder) {
    

    this.frm_NIS = new FormGroup({
      'nis' : new FormControl('',[Validators.required]),
    });



    this.frm_DatosNIS = new FormGroup({
      'usuario' : new FormControl(''),
      'direccion' : new FormControl(''),
      'municipio' : new FormControl(''),
      'colonia' : new FormControl(''),
      'red' : new FormControl(''),
      'medidor' : new FormControl(''),
    });

  

   }

   ngOnInit() {
    this.productForm = this.fb.group({
      title: [],
      documentacion: this.fb.array([this.fb.group({nombreDoc:'',tipoPrueba:1,archivo:''})
    ]),
      
    })
    }

    get documentos() {
      return this.productForm.get('documentacion') as FormArray;
    }

    addDoc() {
      this.documentos.push(
        this.fb.group({nombreDoc:'',tipoPrueba:1,archivo:''}),
        
        );
    }
  
    deleteDoc(index) {
      this.documentos.removeAt(index);
    }


  public obtenerDatos(){
  
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

  }

}
