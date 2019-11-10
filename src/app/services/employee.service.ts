import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Employee } from '../models/employee.model';
import { employees } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;

  constructor(
    private firestore: AngularFirestore
  ) { }
  getEmployees() {
    this.firestore.collection(employees).snapshotChanges();
  }
}
