import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public login: LoginService) { }

  ngOnInit(): void {
  }
  public logout() {
    Swal.fire({  
      title: 'Do you want to Logout?',  
      showDenyButton: true,    
      confirmButtonText: `Yes,logout`,  
      denyButtonText: `No`,
      icon:'question',
    }).then((result) => {  
      /* Read more about isConfirmed, isDenied below */  
        if (result.isConfirmed) {    
          Swal.fire('Successfully done !!', '', 'success')
          this.login.logout();
          window.location.reload();
        } else if (result.isDenied) {    
          
       }
    });

    // this.login.loginStatusSubject.next(false);
  }
}
