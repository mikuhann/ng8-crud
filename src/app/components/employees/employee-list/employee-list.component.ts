import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { EmployeeService } from '../../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

import { Employee } from '../../../models/employee.model';

import { employees } from '../../../constants/constants';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.list = employees.map((employee) => {
        return {
          id: employee.payload.doc.id,
          ...employee.payload.doc.data()
        } as Employee;
      });
    });
  }
  onEdit(employee: Employee) {
    this.employeeService.formData = Object.assign({}, employee);
  }
  onDelete(id: string) {
    if (confirm('Are you sure want to delete this record')) {
      this.firestore.doc(`${employees}/${id}`).delete();
      this.toastr.warning('Employee has been deleted');
    }
  }
}
