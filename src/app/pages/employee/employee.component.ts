import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  masterService = inject(MasterService); 
  parentDeptList: IParentDept[] = [];
  deptId: number = 0;
  childDeptList : IChildDept[] = [];

  employeeObj : Employee = new Employee();

  ngOnInit(): void {
    this.getParentDeptList();
  }

  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res:IApiResponse)=>{
      this.parentDeptList = res.data;
    });
  }

  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    })
  }

}
