import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj = {
    "username": "",
    "password": ""
  }

  // constructor(private http:HttpClient){

  // }

  http = inject(HttpClient);
  router = inject(Router);

  OnLogin() {
    debugger;
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginObj).
      subscribe((res: any) => {
        debugger;
        if (res.result) {

          localStorage.setItem('employeeApp', JSON.stringify(res.data));
          this.router.navigateByUrl('dashboard');

        }
        else {
          alert(res.message);
        }
      })
  }
}
