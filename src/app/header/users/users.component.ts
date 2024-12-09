import { Component, Input } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  private usersService = new UsersService();

  get allUsers() {
    return this.usersService.getAllUsers();
  }

  getImagePath(userId:string) {
    return this.usersService.userImagePath(userId);
  }


}
