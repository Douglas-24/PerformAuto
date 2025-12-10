import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ToastData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastServices {
  private toastSubject = new BehaviorSubject<ToastData>({ title: '', message: '',type: 'success', duration: 0 });
  toast$ = this.toastSubject.asObservable();

  show(title: string, message: string, type:'success' | 'error' | 'info' | 'warning', duration = 3000) {
    this.toastSubject.next({ title, message,type, duration });
  }
}
