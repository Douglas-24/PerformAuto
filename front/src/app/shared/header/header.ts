import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/service/auth.service';
import { NotificationSocket } from '../../core/service/notificationSocket.service';
import { Employee, User } from '../../core/interfaces/user.interfaces';
import { NotificationService } from '../../core/service/notification.service';
import { Notification } from '../../core/interfaces/notification.interface';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private authService = inject(AuthService)
  private notificationSocket = inject(NotificationSocket)
  private notificationService = inject(NotificationService)
  logged: boolean = false
  user: User | Employee | null = null
  notificationCount: number = 0;

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.logged = token ? true : false
    if (this.logged && token) {
      this.getProfile()
      this.notificationSocket.connect(token)
      this.notificationSocket.onNotification().subscribe(payload => {
        if (payload) {
          this.notificationCount++;
        }
      });
    }
  }

  getProfile() {
    this.authService.getProfile().subscribe({
      next: (resp) => {
        if (resp.user) {
          this.user = resp.user
          this.logged = true
          if (resp.user.rol == 'CLIENT') {
            this.loadNotificationUser()
          } else {
            this.loadNotificationEmployee()
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loadNotificationEmployee() {
    if (this.user?.id) {
      this.notificationService.allNotificationEmployee(this.user.id).subscribe({
        next: (resp) => {
          this.notificationCount = resp.data.length
        }
      })
    }
  }

  loadNotificationUser() {
    if (this.user?.id) {
      this.notificationService.allNotificationUser(this.user.id).subscribe({
        next: (resp) => {
          this.notificationCount = resp.data.length
        }
      })
    }
  }
}
