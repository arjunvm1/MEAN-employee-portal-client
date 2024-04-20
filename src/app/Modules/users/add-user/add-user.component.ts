import { Component } from '@angular/core';
import { userSchema } from '../../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user:userSchema ={}
  constructor(private api:ApiService,private toaster:ToastrService){}
  addUser(){
    this.api.addUserAPI(this.user).subscribe({
      next:(res:any) =>{
        this.toaster.success(res.message,"Added  Successfully");
        this.cancel()
      },
      error:(reason:any)=>{
        console.log(reason);
      }
    })
  }


  cancel(){
    this.user.email=""
    this.user.name=""
    this.user.empId=""
    this.user.status=""
  }
}
