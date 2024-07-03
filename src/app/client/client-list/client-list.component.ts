import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { IUser } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/shared/data.service';


type sort = { label: string; value: string }
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput!: ElementRef
  users: IUser[] = [];
  loading: boolean = false;
  sortBy: sort[] =[];
  shortedBy!: string;
  constructor(private apiService: ApiService, private sharedDataService: DataService) { }

  ngOnInit(): void {
    this.sortBy = [
      { label: 'Name', value: 'name' },
      { label: 'Phone No.', value: 'phone' },
      { label: 'User name', value: 'username' }]
    this.getUsersData();
  }

  ngAfterViewInit(): void {
    const source = fromEvent<any>(this.searchInput.nativeElement, 'keyup');
    source.pipe(
      map(event => event.target.value),
      debounceTime(400),
      distinctUntilChanged()
      )
      .subscribe(data => {
        this.apiService.SearchByName(data).subscribe(searched => {
          this.users = searched;
        });
      })

  }

  getUsersData() {
    this.loading = true;
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
      this.sharedDataService.log('Data facted');
    },
      err => {
        console.log(err);
      },
      () => {
        this.loading = false;
      });
  }

  deleteUser(id: string) {
    this.apiService.deleteUser(id).subscribe(
      ()=>this.sharedDataService.openSnackBar("User Deleted Successfully")
    );
  }

  sortedData() {
    console.log(this.shortedBy,"this.shortedBy");
    this.apiService.sordBy(this.shortedBy).subscribe(sorted => {
      console.log(sorted, "sortBy");
      this.users = sorted;
    })
  }

}
