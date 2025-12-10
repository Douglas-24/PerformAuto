import { Component, inject, Input, input, OnInit } from '@angular/core';
import { NotificationService } from '../../../../core/service/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Notification } from '../../../../core/interfaces/notification.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification-user',
  imports: [CommonModule],
  templateUrl: './notification-user.html',
  styleUrl: './notification-user.css'
})
export class NotificationUser implements OnInit {
  private notificationService = inject(NotificationService)
  @Input() rol: string | null = null;
  @Input() id: string | null = null;
  notifications: Notification[] = [];
  ngOnInit(): void {
    if (this.rol == 'CLIENT') {
      this.loadNotificationUser()
    } else {
      this.loadNotificationEmployee()
    }
  }

  loadNotificationEmployee() {
    if (this.id) {
      this.notificationService.allNotificationEmployee(+this.id).subscribe({
        next: (resp) => {
          this.notifications = resp.data
        }
      })
    }
  }

  loadNotificationUser() {
    if (this.id) {
      this.notificationService.allNotificationUser(+this.id).subscribe({
        next: (resp) => {
          this.notifications = resp.data
        }
      })
    }
  }

  markRead(id:number){
    this.notificationService.markRead(id).subscribe({
      next: (resp) => {
        if (this.rol == 'CLIENT') {
          this.loadNotificationUser()
        } else {
          this.loadNotificationEmployee()
        }
      },
      error: (error) =>{
        console.log(error);
        
      }
    })
    
  }

  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id).subscribe({
      next: (resp) => {
        if (this.rol == 'CLIENT') {
          this.loadNotificationUser()
        } else {
          this.loadNotificationEmployee()
        }
      },
      error: (error) =>{
        console.log(error);
        
      }
    })
  }
}
