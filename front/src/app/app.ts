import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DinamicToast } from './shared/dinamic-toast/dinamic-toast';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DinamicToast,OverlayModule, PortalModule],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('proyectoprueba');
}
