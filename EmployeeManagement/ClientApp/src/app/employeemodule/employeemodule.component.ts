import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Department } from '../shared/models/department';
import { Designation } from '../shared/models/designation';
import { employeeModel } from '../shared/models/employee';

@Component({
  selector: 'app-employeemodule',
  templateUrl: './employeemodule.component.html',
  styleUrls: ['./employeemodule.component.css']
})
export class EmployeemoduleComponent implements OnInit {
  employeeModel: employeeModel;
  employeeDetails: employeeModel[];
  designationList: Designation[];
  departmentList: Department[];
  constructor(private ServiceService: ServiceService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.employeeModel = new employeeModel();
  }

  ngOnInit() {
  }

  getEmployee() {
    this.ServiceService.getData().subscribe((data: any[]) => {
      console.log(data);
      this.employeeDetails = data;
    })
  }

  getDesignation() {
    this.ServiceService.getDesignation().subscribe((data: any[]) => {
      this.designationList = data;
    })
  }

  getDepartment() {
    this.ServiceService.getDepartment().subscribe((data: any[]) => {
      this.departmentList = data;
    })
  }
}
