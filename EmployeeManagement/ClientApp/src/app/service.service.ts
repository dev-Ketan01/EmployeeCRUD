import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 

  getData() {
    return this.http.get('/api/Employee');  //https://localhost:44338/ webapi host url  
  }

  getDesignation() {
    return this.http.get('/api/Employee/GetDesignation');  //https://localhost:44338/ webapi host url  
  }

  getDepartment() {
    return this.http.get('/api/Employee/GetDepartment');  //https://localhost:44338/ webapi host url  
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
