import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[customMin] [ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator{

    @Input() minimo!: number;

    constructor() {}

    validate( control: FormControl){
        const inputValue = control.value;
        
        return (inputValue< this.minimo) ? {'customMin' : true} : null
    }
}

//selector es la manera que le decimos a angular que lo busque o utilice la directiva personalizada

//para recibirlo del padre necesitamos el @input

//tiene que se inluida en el modulo, es decir importarla en template.module