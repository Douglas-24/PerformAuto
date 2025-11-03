import { Component } from '@angular/core';
import { UserTable } from '../../components/user-table/user-table';
@Component({
  selector: 'app-user-pages',
  imports: [UserTable],
  templateUrl: './user-pages.html',
  styleUrl: './user-pages.css'
})
export class UserPages{

}
