import { Component } from '@angular/core';
import { ServicesTable } from "../../components/services-table/services-table";

@Component({
  selector: 'app-services-page',
  imports: [ServicesTable],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css'
})
export class ServicesPage {

}
