import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { employeeModel } from '../shared/models/employee';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { Designation } from '../shared/models/designation';
import { Department } from '../shared/models/department';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  buttonName: string;
  employeeList: employeeModel[];
  designationList: Designation[];
  departmentList: Department[];
  resp: any;
  selectedDesignation: Designation;
  selectedDepartment: Department[];
  editItemData: employeeModel;
  public modalRef: BsModalRef;

  selectedItems: [string];
  knowledgeList: any = [
    {
      name: "MVC",
      value: "MVC",
      selected: true
    },
    {
      name: "VB",
      value: "VB",
      selected: true
    },
    {
      name: "SQL",
      value: "SQL",
      selected: true
    },
    {
      name: "Jquery",
      value: "Jquery"
    },
    {
      name: "JavaScript",
      value: "JavaScript"
    },
    {
      name: "AngularJS",
      value: "AngularJS"
    },
    {
      name: "NodeJS ",
      value: "NodeJS "
    }
  ];

  constructor(private ServiceService: ServiceService, private formBuilder: FormBuilder, private http: HttpClient, public toastr: ToastrService, public modalService: BsModalService) {
    this.buttonName = "Add";
    this.getEmployee();
    this.getDesignation();
    this.getDepartment();

    this.selectedDesignation = new Designation();
    this.selectedDepartment = [];
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      knowledgeItem: this.createKnowlegeList(this.knowledgeList),
      value: ['', Validators.required],
    });
  }

  get f() { return this.employeeForm.controls; }

  

  createKnowlegeList(hobbiesInputs) {
    const arr = hobbiesInputs.map(item => {
      return new FormControl(item.selected || false);
    });
    return new FormArray(arr);
  }

  sortings() {

  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    debugger
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }
    debugger
    this.buttonName = "Add";
    let employee: employeeModel = this.employeeForm.value;
    employee.id = this.editItemData.id;


    this.ServiceService.postData(this.employeeForm.value).subscribe((resp: any[]) => {
      this.resp = resp;
      this.loading = false;
      if (this.resp.status == 200) {
        this.employeeForm.reset();
        this.getEmployee();
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Added Successfully</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-top-right"
          }
        );
      }
      else {
        this.employeeForm.reset();
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + this.resp.message + '</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-top-right"
          }
        );

      }
    },
      error => {
        console.log(error)
        this.employeeForm.reset();
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + error.message + '</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-top-right"
          }
        );
        this.loading = false;
      })
  }
  getDesignationValue(option) {
    this.selectedDesignation = option;
  }


  onCheckChange(event, dept) {

    this.selectedDepartment.push(dept);
  }

  getEmployee() {
    this.ServiceService.getData().subscribe((data: any[]) => {
      console.log(data);
      this.employeeList = data;
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

  

  edit(item: employeeModel) {
    debugger
    this.editItemData = item;
    this.buttonName = "Edit";
    this.employeeForm = this.formBuilder.group({
      value: ['', Validators.required],
    });

    this.employeeForm.patchValue({
      firstname: item.firstName,
      description: item.lastName,
      designationId: item.designationId,
      departmentId: item.departmentId,
      haveKnowledgeOf: item.haveKnowledgeOf,
      salary: item.salary,
      joiningdate: item.joiningDate,
      reportingPerson: item.reportingPerson,
    });

    

  }

  postData(formData) {
    return this.http.post('/api/Employee', formData);
  }

  putData(id, formData) {
    return this.http.put('/api/Employee/' + id, formData);
  }
  deleteData(id) {
    return this.http.delete('/api/Employee/' + id);
  } 
}
