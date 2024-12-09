import { Component } from '@angular/core';
import { UsersComponent } from "./users/users.component";

@Component({
  selector: 'app-header',
  imports: [UsersComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
