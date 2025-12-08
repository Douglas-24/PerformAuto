import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationSocket {
private socket?: Socket;

  connect(token: string) {
    if (!this.socket || !this.socket.connected) {
      this.socket = io('http://localhost:3000/notifications', {
        auth: { token },
        reconnection: true
      })
    }
  }


  onNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('newNotification', (data) => observer.next(data));
    });
  }

  public onRefreshData(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('refreshData', (data) => observer.next(data));
    });
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }
}
