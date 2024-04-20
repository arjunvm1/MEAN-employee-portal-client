import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{
 @Output() onAdminChange = new EventEmitter()
  adminDetails:any={}
  editAdminStatus: boolean = false;
  profilePicture:string="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"

  constructor(private adminAPI:AdminService, private toaster:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any) => {
      this.adminDetails = res
      if(res.profilePicture){
        this.profilePicture = res.profilePicture
      }
    })
  }

  editAdminBtn(){
    this.editAdminStatus = true
  }

  onCancel(){
    this.editAdminStatus = false
  }

  getFile(event:any) {
    let file = event.target.files[0]
    let fr = new FileReader();
    fr.readAsDataURL(file)
    fr.onload = (event:any)=> {
      console.log(event.target.result); 
      this.profilePicture= event.target.result;
      this.adminDetails.profilepic = event.target.result
      
    }
  }

  updateAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any) => {
        this.editAdminStatus = false
        this.toaster.success("admin details updated successfully...")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)
      },
      error:(reason:any) => {
        this.toaster.warning("something went wrong! please try again later.")
      }
    })
  }


}
