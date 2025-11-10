import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DinamicToast } from './shared/dinamic-toast/dinamic-toast';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DinamicToast],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('proyectoprueba');
}
