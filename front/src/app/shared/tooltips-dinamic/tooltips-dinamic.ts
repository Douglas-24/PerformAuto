import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-tooltips-dinamic',
  templateUrl: './tooltips-dinamic.html',
  styleUrl: './tooltips-dinamic.css'
})
export class TooltipsDinamic {
  @Input() message:string = ''
}
