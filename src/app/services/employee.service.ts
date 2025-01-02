import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse, project, projectEmployee } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  apiUrl:string = "https://projectapi.gerasim.in/api/EmployeeManagement/";

  createNewEmployee(obj: Employee){
    return this.http.post<Employee>(this.apiUrl + "CreateEmployee", obj);
  }

  getAllEmployees(){
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }

  deleteEmployee(id: number){
    return this.http.delete(this.apiUrl + "DeleteEmployee/" + id);
  }

  updateEmployee(obj: Employee){
    return this.http.put(this.apiUrl + "UpdateEmployee/"+obj.employeeId, obj);
  }

  createNewProject(obj:project){
    return this.http.post(this.apiUrl + "CreateProject", obj);
  }

  getAllProjects(){
    return this.http.get<project[]>(this.apiUrl + "GetAllProjects");
  }

  updateProject(obj: project){
    return this.http.put(this.apiUrl + "UpdateProject/" + obj.projectId, obj);
  }

  deleteProject(obj: project){
    return this.http.delete(this.apiUrl + "DeleteProject/" + obj.projectId);
  }

  addProjectEmployees(obj: projectEmployee){
    return this.http.post<projectEmployee>(this.apiUrl + "CreateProjectEmployee", obj);
  }

  getAllProjectEmployee(){
    return this.http.get<projectEmployee[]>(this.apiUrl + "GetAllProjectEmployees");
  }

}
