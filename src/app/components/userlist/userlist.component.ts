import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  users: User[] | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.sort((a, b) => {
        return (a === b) ? 0 : a ? -1 : 1
      })
    })
  }

  deleteUser(user: User, index: number) {
    this.userService.deleteUser(user.id).subscribe(val => {
      this.getAllUsers()
    })
  }

  updatePaidStatus(event: any, user: User, index: number) {
    const updatedUser = { ...user }
    updatedUser.hasPaid = event.srcElement.checked
    this.userService.updateUser(updatedUser).subscribe(val => {
      this.getAllUsers()
    }
    )
  }

}
