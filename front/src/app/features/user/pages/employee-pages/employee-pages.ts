import { Component } from '@angular/core';
import { EmployeeTable } from "../../components/employee-table/employee-table";

@Component({
  selector: 'app-employee-pages',
  imports: [EmployeeTable],
  templateUrl: './employee-pages.html',
  styleUrl: './employee-pages.css'
})
export class EmployeePages {

}
