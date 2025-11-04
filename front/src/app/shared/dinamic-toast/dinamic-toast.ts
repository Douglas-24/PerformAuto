import { Component, inject } from '@angular/core';
import { ToastServices } from '../../core/service/toast.service';

@Component({
  selector: 'app-dinamic-toast',
  imports: [],
  templateUrl: './dinamic-toast.html',
  styleUrl: './dinamic-toast.css'
})
export class DinamicToast {
  title = '';
  message = '';
  visible = false;
  type: 'success' | 'error' | 'info' | 'warning' = 'info';

  private toastService = inject(ToastServices)

  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      if (toast && toast.title && toast.message) {
        this.title = toast.title;
        this.message = toast.message;
        this.type = toast.type;
        this.visible = true;
        setTimeout(() => this.visible = false, toast.duration || 3000);
      }
    });
  }

  toastStyles = {
    success: {
      container: 'bg-gray-800 border border-green-500',
      icon: 'text-green-600',
      iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
    },
    error: {
      container: 'bg-gray-800 border border-red-500',
      icon: 'text-red-600',
      iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
    },
    warning: {
      container: 'bg-gray-800 border border-yellow-500',
      icon: 'text-yellow-600',
      iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
    },
    info: {
      container: 'bg-gray-800 border border-blue-500',
      icon: 'text-blue-600',
      iconSvg: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>`
    }
  };


}
