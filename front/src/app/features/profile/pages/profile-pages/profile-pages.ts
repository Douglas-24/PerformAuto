import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/service/auth.service';
import { Employee, Role, User } from '../../../../core/interfaces/user.interfaces';
import { UserService } from '../../../../core/service/user.service';
import { Dialog } from '@angular/cdk/dialog';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { ToastServices } from '../../../../core/service/toast.service';
@Component({
  selector: 'app-profile-pages',
  imports: [],
  templateUrl: './profile-pages.html',
  styleUrl: './profile-pages.css'
})
export class ProfilePage {
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private toast = inject(ToastServices)

  private modal = inject(Dialog)
  user: User | null = null
  employee: Employee | null = null

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
  })
  configField: ConfigFieldsForm[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'lastname', label: 'Apellidos', type: 'text' },
    { key: 'dni', label: 'Dni', type: 'text' },
    { key: 'phone_number', label: 'Numero de telefono', type: 'text' },
    { key: 'address', label: 'Direccion', type: 'text' },
    { key: 'postal_code', label: 'Codigo postal', type: 'text' },
  ]

  ngOnInit() {
    this.getProfile()
  }


  getProfile() {
    this.authService.getProfile().subscribe({
      next: (resp) => {
        const profileData = resp.user
        if (profileData.rol == Role.CLIENT) {
          this.user = profileData as User
        } else {
          this.employee = profileData as Employee
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  async openModalEditData() {
    const modalRef = this.modal.open(DinamicModal, {
      data: {
        title: 'Modifcar tus datos',
        formGroup: this.userForm,
        message: 'Actualizar tus datos',
        configFields: this.configField,
        typeModal: 'Actualizar',
        updateDataForm: this.user
      }
    })
    const confirmed = await modalRef.closed.toPromise()
    if (confirmed) {
      const formValue = this.userForm.value
      const userData:User = {
        ...(this.user?.id && { id: Number(this.user?.id) }),
        name: formValue.name!,
        lastname: formValue.lastname!,
        email: this.user?.email!,
        dni:formValue.dni!,
        phone_number:parseInt(formValue.phone_number!),
        address: formValue.address!,
        postal_code: parseInt(formValue.postal_code!),
        rol: this.user?.rol!
      }
      
      this.userService.updateUser(userData).subscribe({
        next: (resp) => {          
          this.user = resp.data
          this.toast.show('Accion Exitosa', resp.message, 'success')
        },
        error: (error) => {
          console.log(error);
        }
      })
    }

  }

}
