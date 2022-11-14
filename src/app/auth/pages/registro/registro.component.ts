import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/validator/validators.service';
import { emailPattern, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6) ]],
    password2: ['', [Validators.required]]
  },{
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });

  // emailErrorMsg: string = '';

  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'Email es obligatorio'
    } else if( errors?.['pattern']){
      return 'El valor ingresado no tiene formato de correo electrónico'
    } else if( errors?.['emailTomado']){
      return 'El mail ya fue usado'
    } else{
      return ''
    }
  }
  
  
  constructor( private fb: FormBuilder, private validatorService: ValidatorsService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Andrea Acosta',
      email: 'test1@test.com',
      username: 'aacosta',
      password: 123456,
      password2: 123456
    })
  }

  camnpoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched
  // }


  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched
  // }
  
  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched
  // }



  submitFormulario(){
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
