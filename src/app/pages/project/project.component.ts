import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee, project, projectEmployee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { debug } from 'console';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor, AsyncPipe, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  currentView: string = 'List';

  @ViewChild("myModal") employeeModal: ElementRef | undefined;

  projectEmployees: projectEmployee = new projectEmployee();
  allProjectEmployeess : projectEmployee[] = [];

  projectForm: FormGroup = new FormGroup({});

  employeeData$: Observable<Employee[]> = new Observable<Employee[]>;

  onAddProjectEmployees(emp: projectEmployee) {
    debugger;
    this.employeeService.addProjectEmployees(this.projectEmployees).subscribe((res:projectEmployee)=>{
      debugger;
      alert("ADDED");
      this.getProjectEmployees(this.projectEmployees.projectId);
    }, error => {
      alert("ERROR");
    })
  }

  employeeService = inject(EmployeeService);
  projectList: project[] = [];
  // projectObj : project;

  constructor() {
    this.initializeForm();
    this.employeeData$ = this.employeeService.getAllEmployees();
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  initializeForm(project?: project) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId : 0),
      projectName: new FormControl(project ? project.projectName : ''),
      clientName: new FormControl(project ? project.clientName : ''),
      startDate: new FormControl(project ? project.startDate : new Date().toLocaleDateString()),
      leadByEmpId: new FormControl(project ? project.leadByEmpId : 0),
      contactPerson: new FormControl(project ? project.contactPerson : ''),
      contactNo: new FormControl(project ? project.contactNo : ''),
      emailId: new FormControl(project ? project.emailId : '')
    })
  }

  onEdit(project: project) {
    this.initializeForm(project);
    this.currentView = 'Create';
  }

  onSaveProject() {
    let formValue = this.projectForm.value;
    if (formValue.projectId != 0) {
      debugger;
      this.employeeService.updateProject(formValue).subscribe(() => {
        debugger;
        alert("UPDATED");
        this.initializeForm();
        this.getAllProjects();
        this.currentView = 'List';
      }, error => {
        alert("ERROR")
      })
    }
    // debugger;
    else {
      this.employeeService.createNewProject(formValue).subscribe(() => {
        debugger;
        alert("Done");
        this.initializeForm();
        this.getAllProjects();
        this.currentView = 'List';

      }, error => {
        alert("ERROR");
      })
    }

  }

  getProjectEmployees(id :number){
    debugger;
    this.employeeService.getAllProjectEmployee().subscribe((res : projectEmployee[])=>{
      debugger;
      this.allProjectEmployeess = res;
      let record = this.allProjectEmployeess.filter((m)=>m.projectId==id);
      this.allProjectEmployeess = record;
      // alert("DONE");
    }, error => {
      alert("LOCHO")
    })
  }

  onAddEmployee(id: number) {
    this.projectEmployees.projectId = id;
    this.getProjectEmployees(id);
    if (this.employeeModal)
      this.employeeModal.nativeElement.style.display = 'block';
  }

  onCloseModal() {
    if (this.employeeModal)
      this.employeeModal.nativeElement.style.display = 'none';
  }

  getAllProjects() {
    debugger;
    this.employeeService.getAllProjects().subscribe((res: project[]) => {
      debugger;
      this.projectList = res;
    }, error => {
      alert("ERROR");
    })
  }
}
