import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DinamicToast } from './shared/dinamic-toast/dinamic-toast';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { NotificationSocket } from './core/service/notificationSocket.service';
import { ToastServices } from './core/service/toast.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DinamicToast, OverlayModule, PortalModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  protected readonly title = signal('proyectoprueba');
  private notificationService = inject(NotificationSocket);
  private toastService = inject(ToastServices)
  ngOnInit(): void {
    console.log('entra app component');
    const token = localStorage.getItem('token')
    if (token){
      this.notificationService.connect(token)
      this.notificationService.onNotification().subscribe(payload => {
        console.log('Notificación recibida:', payload);
        this.toastService.show(payload.title, payload.message, 'info')
      });
    } 

  }
}
