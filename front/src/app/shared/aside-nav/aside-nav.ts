import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-aside-nav',
  imports: [RouterLink],
  templateUrl: './aside-nav.html',
  styleUrl: './aside-nav.css'
})
export class AsideNav {
 private router = inject(Router)
  logOut(){
    const token = localStorage.getItem('token')
    if(token){
      localStorage.removeItem('token')
      this.router.navigate(['/'])
    }
  }
}
