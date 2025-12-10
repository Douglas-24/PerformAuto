import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-unauthorized-page',
  imports: [Header, Footer, RouterLink],
  templateUrl: './unauthorized-page.html',
  styleUrl: './unauthorized-page.css'
})
export class UnauthorizedPage {


  goBack(){
    window.history.back();
  }
}
