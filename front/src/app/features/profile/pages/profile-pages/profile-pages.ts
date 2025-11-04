import { Component } from '@angular/core';
import { Header } from '../../../../shared/header/header';
import { Footer } from '../../../../shared/footer/footer';
import { AsideNav } from '../../components/aside-nav/aside-nav';
import { UserPages } from '../../../user/pages/user-pages/user-pages';
@Component({
  selector: 'app-profile-pages',
  imports: [Header, Footer, AsideNav, UserPages],
  templateUrl: './profile-pages.html',
  styleUrl: './profile-pages.css'
})
export class ProfilePage {

}
