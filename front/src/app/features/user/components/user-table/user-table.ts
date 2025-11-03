import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { ToastServices } from '../../../../core/service/toast.service';
import { User } from '../../../../core/interfaces/user.interfaces';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.html',
  styleUrl: './user-table.css'
})
export class UserTable {
  private userService = inject(UserService)
  private toast = inject(ToastServices)

  allUsers:User[] = []
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.allUsers = resp.data
      },
      error: (error) => {
        this.toast.show('Error al obtener todos los usuarios', 'No se han podido obtener los usuarios', 'error')
        console.log(error);
        
      }
    })
  }
}
