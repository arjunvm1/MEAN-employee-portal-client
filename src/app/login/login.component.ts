import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email:string=""
password:string=""

constructor (private toaster: ToastrService, private api:AdminService,private router:Router){}



login(){
  //admin login
  if(this.email && this.password){
    // this.toaster.success("proceed to api call")

    this.api.getAdminDetails().subscribe({
      next:(res:any)=> {
        console.log(res);
        const {email, password} = res
        if(email ==this.email && password == this.password) {
          this.toaster.success("login successfull!")
          sessionStorage.setItem("adminDetails",JSON.stringify(res))
          this.email= ""
          this.password= ""
          //navigate to dashboard
          this.router.navigateByUrl("/dashboard")
        }else{
          this.toaster.error("invalid credentials")
        }
      },
      error:(reson:any) => {
        this.toaster.error(reson.message)
      }
    })

  }else{
    this.toaster.warning("please enter email and password");
  }
}
}
