import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  constructor(private fb: FormBuilder) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)] ],   //valor, validadores sincronos(cuando toca una tecla), validadores asincronos
    favoritos: this.fb.array([
      ['Metalgear',Validators.required], ['DeathStranding',Validators.required]
    ], Validators.required)
  })

  nuevoFavorito: FormControl = this.fb.control('', Validators.required)


  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray
  }

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){
      return
    }

    //this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required))

    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required))

    this.nuevoFavorito.reset();

  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched()
      return
    }
    console.log(this.miFormulario.value);
  }

  borrar(i:number){
    this.favoritosArr.removeAt(i);
  }

}
