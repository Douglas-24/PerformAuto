import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { DinamicForm } from "../../../../shared/dinamic-form/dinamic-form";
import { AuthService } from '../../../../core/service/auth.service';
import { Role, UserRegister } from '../../../../core/interfaces/user.interfaces';
import { ToastServices } from '../../../../core/service/toast.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, DinamicForm],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() goLogin = new EventEmitter<boolean>()
  private authService = inject(AuthService)
  private toast = inject(ToastServices)
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]),
    lastname: new FormControl('', [Validators.required,Validators.minLength(2), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl('', [Validators.required,  Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    address: new FormControl('',[Validators.required, Validators.minLength(5)]),
    postal_code: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
  })

  configField: ConfigFieldsForm[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'lastname', label: 'Apellidos', type: 'text' },
    { key: 'dni', label: 'Dni', type: 'text' },
    { key: 'email', label: 'Correo electronico', type: 'email' },
    { key: 'password', label: 'Contraseña', type: 'password' },
    { key: 'confirmPassword', label: 'Confirmar contraseña', type: 'password' },
    { key: 'phone_number', label: 'Numero de telefono', type: 'text' },
    { key: 'address', label: 'Direccion', type: 'text' },
    { key: 'postal_code', label: 'Codigo postal', type: 'text' },
  ]

  goFormLogin() {
    this.goLogin.emit(false)
  }
  mappingUserForm() {
      const formValue = this.registerForm.value;
      const user = {
        name: formValue.name || '',
        lastname: formValue.lastname || '',
        dni: formValue.dni || '',
        email: formValue.email || '',
        password: formValue.password || '',
        phone_number: Number(formValue.phone_number),
        address: formValue.address || '',
        postal_code: Number(formValue.postal_code),
        rol: Role.CLIENT
      };
      return user
    }

  registerUser() {
    const registerUser = this.mappingUserForm()
    this.authService.register(registerUser).subscribe({
      next: (resp) => {
        this.toast.show('Registro correcto', resp.message, 'success')        
      },
      error: (error) =>{
        this.toast.show('Error en el registro', error.message, 'error')        
        
      }
    })
  }
}
