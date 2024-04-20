import { Component, OnInit } from '@angular/core';
import { userSchema } from '../../Models/userSchema'; // Importing the userSchema interface
import { ApiService } from '../services/api.service'; // Importing the ApiService
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list', // Component selector
  templateUrl: './users-list.component.html', // Template file path
  styleUrls: ['./users-list.component.css'] // Styles file path
})
export class UsersListComponent implements OnInit {

  page: number = 1;
  allUsers: userSchema[] = []; // Array to hold all users
  searchKey: string = '';

  constructor(private api: ApiService,private toaster:ToastrService) { } // Constructor with ApiService injection

  ngOnInit(): void {
    this.getAllUsersList()// Getting all users on component initialization
  }

  // Method to fetch all users from the API
  getAllUsersList() {
    this.api.getAllUserAPI().subscribe({
      next: (result: any) => { // Handling successful response
        this.allUsers = result; // Assigning the fetched users to the array
        console.log(this.allUsers); // Logging the fetched users to the console
      },
      error: (reason: any) => { // Handling error response
        console.log(reason); // Logging the error to the console
      }
    });
  }

  deleteUser(id:any){
    this.api.removeUserAPI(id).subscribe(
      (res:any)=> {
        this.toaster.success('User deleted successfully!'); // Show success
        this.getAllUsersList()
      }
    )
  }

  generatePDF(){
    let pdf = new jsPDF()
    let head = [['EmpId','Username','Email','Status']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      if(item.id!=='1'){
        let status = item.status == '0' ? "Inactive" : "Active";
        body.push([item.empId,item.name,item.email,status])
      }
    })
    pdf.setFontSize(16)
    pdf.text('All Users List',10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('Alluserslist.pdf')
  }

  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=> user1.name.localeCompare(user2.name));
  }

  sortById(){
    this.allUsers.sort((user1:any,user2:any)=> user1.empId.localeCompare(user2.empId));
  }
}
