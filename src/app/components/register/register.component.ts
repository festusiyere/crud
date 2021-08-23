import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') form: any;

  data: User = {
    name: '',
    phone: '',
    email: '',
    business_name: '',
    dob: '',
  }
  isEditMode: boolean = false
  isLoading: boolean = false
  isSuccessful: boolean = false

  constructor(private userService: UserService, private activateRoute: ActivatedRoute) {
    const param = this.activateRoute.snapshot.params.id;
    if (param) {
      this.isEditMode = true
      this.userService.getUser(param).subscribe(val => {
        this.data.id = val.id
        this.data.name = val.name
        this.data.phone = val.phone
        this.data.email = val.email
        this.data.business_name = val.business_name
        this.data.dob = val.dob
      })
    }
  }

  ngOnInit(): void {
  }

  submitForm(form: NgForm) {
    this.isLoading = true
    const user: User = {
      id: this.generateUuid,
      name: form.value.name,
      phone: form.value.phone,
      business_name: form.value.business_name,
      email: form.value.email,
      dob: form.value.dob,
      hasPaid: false
    }
    this.userService.saveUser(user).subscribe(val => {
      this.isLoading = false
      this.form.reset()
      this.isSuccessful = true

      setTimeout(() => {
        this.isSuccessful = false
      }, 2000);
    })
  }


  updateUser() {
    this.isLoading = true

    this.userService.updateUser(this.data).subscribe(val => {
      this.isLoading = false
      this.isSuccessful = true

      setTimeout(() => {
        this.isSuccessful = false
      }, 2000);
    })
  }

  get generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


}
