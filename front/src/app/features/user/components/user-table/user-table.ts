import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { ToastServices } from '../../../../core/service/toast.service';
import { Role, User } from '../../../../core/interfaces/user.interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { DinamicModal } from '../../../../shared/dinamic-modal/dinamic-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigFieldsForm } from '../../../../core/interfaces/configFiledsForm';
import { environments } from '../../../../core/environments/environments';
@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css'
})
export class UserTable {
  private userService = inject(UserService)
  private toast = inject(ToastServices)
  private modal = inject(Dialog)

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    address: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
    role: new FormControl('')
  });

  configField: ConfigFieldsForm[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'lastname', label: 'Apellidos', type: 'text' },
    { key: 'dni', label: 'Dni', type: 'text' },
    { key: 'email', label: 'Correo electronico', type: 'email' },
    { key: 'phone_number', label: 'Numero de telefono', type: 'text' },
    { key: 'address', label: 'Direccion', type: 'text' },
    { key: 'postal_code', label: 'Codigo postal', type: 'text' },
    { key: 'role', label: 'Rol', type: 'select', options: environments.roles },
  ]

  allUsers: User[] = []
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (resp) => {
        this.allUsers = resp.data
        console.log(resp.data);
        
      },
      error: (error) => {
        this.toast.show('Error al obtener todos los usuarios', 'No se han podido obtener los usuarios', 'error')
        console.log(error);

      }
    })
  }

  mappingUserForm(userUpdate?:User): User {
    const formValue = this.userForm.value;
    const user: User = {
      id: Number(userUpdate?.id),
      name: formValue.name || '',
      lastname: formValue.lastname || '',
      dni: formValue.dni || '',
      email: formValue.email || '',
      phone_number: Number(formValue.phone_number),
      address: formValue.address || '',
      postal_code: Number(formValue.postal_code),
      rol: formValue.role as Role || Role.CLIENT
    };
    return user
  }

  async openModal(user?:User) {
    const modalRef = this.modal.open(DinamicModal, {
      data: {
        title: !user ? 'Crear nuevo usuario' : user.name + ' ' + user.lastname,
        formGroup: this.userForm,
        configFields: this.configField,
        typeModal: !user ? 'Crear' : 'Actualizar',
        updateDataForm: user ? user : null
      }

    })
    const confirmed = await modalRef.closed.toPromise();
    if (confirmed) {
      if(user){
        this.createOrUpdateUser(user)
      }else this.createOrUpdateUser()
    } else {
      this.userForm.reset({
        role: ''
      });
    }
  }

  createOrUpdateUser(userUpdate?:User) {
    const user = this.mappingUserForm(userUpdate)
    if(userUpdate){
    this.userService.updateUser(user).subscribe({
      next: (resp) =>{
        console.log(resp);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
   }else{
     this.userService.postUser(user).subscribe({
      next: (resp) => {
        this.getAllUsers()
        this.toast.show('Accion Exitosa', resp.data.message, 'success')
      }
    })
   }
  }

}
