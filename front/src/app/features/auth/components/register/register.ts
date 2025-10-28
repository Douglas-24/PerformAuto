import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @Output() goLogin = new EventEmitter<boolean>()

  goFormLogin(){
    this.goLogin.emit(false)
  }
}
