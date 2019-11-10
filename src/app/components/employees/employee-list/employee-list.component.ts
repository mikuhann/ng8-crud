import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];

  constructor(
    private employeeService: EmployeeService
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

}
