import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  imports: [],
  templateUrl: './separator.html',
  styleUrl: './separator.css'
})
export class Separator {
  @Input() message:string = ''
}
