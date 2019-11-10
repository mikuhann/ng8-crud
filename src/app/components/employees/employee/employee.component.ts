import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.employeeService.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobileNumber: ''
    };
  }
  onSubmit(form: NgForm) {
    const data = form.value;
    this.firestore.collection('employees').add(data);
    this.resetForm(form);
    this.toastr.success('Employee added');
  }
}
