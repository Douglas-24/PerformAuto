import { Component, inject } from '@angular/core';
import { NotificationUser } from "../../components/notification-user/notification-user";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-page',
  imports: [NotificationUser],
  templateUrl: './notification-page.html',
  styleUrl: './notification-page.css'
})
export class NotificationPage {
  private route = inject(ActivatedRoute)
  currentRol: string | null = null;
  currentUserId: string | null = null;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentRol = params.get('rol');
      this.currentUserId = params.get('id');
    });
  }
}
