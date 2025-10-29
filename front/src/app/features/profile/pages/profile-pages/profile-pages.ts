import { Component } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { Footer } from '../../../../shared/footer/footer';
@Component({
  selector: 'app-profile-pages',
  imports: [Header, Footer],
  templateUrl: './profile-pages.html',
  styleUrl: './profile-pages.css'
})
export class ProfilePage {

}
