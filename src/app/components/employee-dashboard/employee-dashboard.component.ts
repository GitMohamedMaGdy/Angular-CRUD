import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: EmployeeModel[] = [];
  showAdd: boolean = true;
  constructor(private formbuilder: FormBuilder, private apiService: APIService) {

  }
  ngOnInit() {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }
  clickAdd() {
    this.formValue.reset();
    this.showAdd = true;
  }
  AddEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.apiService.postEmplyee(this.employeeModelObj).subscribe(res => {
      alert('Emplyee Added Successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      err => {
        alert('error');
      })
  }

  getAllEmployee() {
    this.apiService.getEmployees().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(emp: any) {
    this.apiService.deleteEmployee(emp.id).subscribe(res => {
      alert('Deleted Successfully');
      this.getAllEmployee();
    })
  }
  onEdit(employee: EmployeeModel) {
    this.showAdd = false;
    this.employeeModelObj.id = employee.id;
    this.formValue.controls['firstName'].setValue(employee.firstName);
    this.formValue.controls['lastName'].setValue(employee.lastName);
    this.formValue.controls['email'].setValue(employee.email);
    this.formValue.controls['phone'].setValue(employee.phone);
    this.formValue.controls['salary'].setValue(employee.salary);
  }
  UpdateEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.apiService.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe((res) => {
      alert('Update Successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    });
  }
}
