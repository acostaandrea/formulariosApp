import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/validator/validators.service';
import { emailPattern, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { noPuedeSerStrider } from '../../../shared/validator/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required]]
  },{
    validators: [this.validatorService.camposIguales('password', 'password2')]
  })
  
  
  constructor( private fb: FormBuilder, private validatorService: ValidatorsService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Andrea Acosta',
      email: 'test1@test.com',
      username: 'aacosta'
    })
  }

  camnpoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
