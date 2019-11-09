import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

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
}
