import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ConfigFieldsForm } from '../../core/interfaces/configFiledsForm';
@Component({
  selector: 'app-dinamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dinamic-form.html',
  styleUrl: './dinamic-form.css'
})
export class DinamicForm {
  @Input() formGroup!: FormGroup
  @Input() configfields: ConfigFieldsForm[] = []
  @Input() dataForm !: any

  fields: ConfigFieldsForm[] = [];

  ngOnChanges() {
    this.fields = this.configfields.filter(field => this.formGroup.contains(field.key));
    if(this.dataForm){
      this.formGroup.patchValue(this.dataForm)
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.formGroup.get(controlName);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['email']) return 'Formato de correo inválido';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    if (control.errors['min']) return `Valor mínimo: ${control.errors['min'].min}`;
    if (control.errors['max']) return `Valor máximo: ${control.errors['max'].max}`;
    if (control.errors['pattern']) return `La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.`

    return 'Campo inválido';
  }

}
