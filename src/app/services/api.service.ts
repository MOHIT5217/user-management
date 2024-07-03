import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interface/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private postJsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/posts';
  // private userJsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/users';
  private userJsonPlaceholderUrl = 'http://localhost:3000/users';
  // private northwindUrl = 'https://services.odata.org/V4/Northwind/Northwind.svc/';

  constructor(private httpclient:HttpClient) { }

  getUsers():Observable<IUser[]>{
    return this.httpclient.get<IUser[]>(this.userJsonPlaceholderUrl);
  }

  getSingleUser(id:string):Observable<IUser>{
    return this.httpclient.get<IUser>(`${this.userJsonPlaceholderUrl}/${id}`);
  }

  addUser(body:IUser){
    return this.httpclient.post(`${this.userJsonPlaceholderUrl}/`,body);
  }

  editUser(body:IUser, id:string){
    return this.httpclient.put(`${this.userJsonPlaceholderUrl}/${id}`,body);
  }
  deleteUser(id:string){
    return this.httpclient.delete(`${this.userJsonPlaceholderUrl}/${id}`);
  }
  sordBy(sortBy:string):Observable<IUser[]>{
    return this.httpclient.get<IUser[]>(`${this.userJsonPlaceholderUrl}?_sort=${sortBy}`);
  }
  SearchByName(name:string):Observable<IUser[]>{
    return this.httpclient.get<IUser[]>(`${this.userJsonPlaceholderUrl}?username=${name}`);
  }
}
