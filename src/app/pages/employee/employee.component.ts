import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { debug, error } from 'console';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  parentDeptList: IParentDept[] = [];
  deptId: number = 0;
  childDeptList : IChildDept[] = [];
  employeeList : Employee[] = [];

  employeeObj : Employee = new Employee();
  isSidePanelOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.getParentDeptList();
    this.getEmployeeList();
  }

  onDelete(id: number){
    debugger;
    this.employeeService.deleteEmployee(id).subscribe(()=>{
      debugger;
      alert("DONE");
      this.getEmployeeList();
    }, error => {
      alert("ERROR");
    })
  }

  onUpdateEmployee(){
    debugger;
    this.employeeService.updateEmployee(this.employeeObj).subscribe(()=>{
      debugger;
      alert("UPDATED");
      this.getEmployeeList();
    }, error => {
      alert("ERROR");
    })
  }

  onEdit(item: Employee){
    this.employeeObj = item;
  }

  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res:IApiResponse)=>{
      this.parentDeptList = res.data;
    });
  }

  getEmployeeList(){
    this.employeeService.getAllEmployees().subscribe((res:Employee[])=>{
      this.employeeList = res;
    });
  }

  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    })
  }

  onSaveEmployee(){
    debugger;
    this.employeeService.createNewEmployee(this.employeeObj).subscribe((res: Employee)=>{
      debugger;
      alert("done");
      this.getEmployeeList();

    }, error => {
      alert('ERROR');
    })
  }

  

}
