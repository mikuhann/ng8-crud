import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from '../../../services/employee.service';
import { employees } from '../../../constants/constants';

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
    const {id, ...data} = form.value;
    if (form.value.id == null) {
      this.firestore.collection(employees).add(data);
      this.toastr.success('Employee added');
    } else {
      this.firestore.doc(`${employees}/${id}`).update(data);
      this.toastr.success('Employee updated');
    }
    this.resetForm(form);
  }
}
