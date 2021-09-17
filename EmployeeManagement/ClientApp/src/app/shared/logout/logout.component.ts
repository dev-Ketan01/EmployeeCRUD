import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user';
import { LoginComponent } from '../../login/login.component';
//import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  modalRef: BsModalRef;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(public modalService: BsModalService) {
    
    this.modalRef = this.modalService.show(LoginComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
    });

  }

  ngOnInit(): void {
  }

}
