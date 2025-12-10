import { Component } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { Footer } from '../../../../shared/footer/footer';
import { ServicesOffered } from "../../components/services-offered/services-offered";
@Component({
  selector: 'app-home-component',
  imports: [Header, Footer, ServicesOffered],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}
