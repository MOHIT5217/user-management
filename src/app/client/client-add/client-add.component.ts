import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  newuser!: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder, private sharedDataService: DataService, private router: Router) { }


  ngOnInit(): void {
    this.newuser = this.fb.group({
      "name": new FormControl('',[Validators.required]),
      "username": new FormControl('',[Validators.required]),
      "thumbImg": new FormControl('',[Validators.required]),
      "email": new FormControl('',[Validators.required, Validators.email]),
      "address": new FormGroup(
        {
          "street": new FormControl(''),
          "suite": new FormControl(''),
          "city": new FormControl('',[Validators.required]),
          "zipcode": new FormControl(''),
          "geo": new FormGroup(
            {
              "lat": new FormControl(''),
              "lng": new FormControl(''),
            }
          )
        }
      ),
      "phone": new FormControl('',[Validators.required]),
      "website": new FormControl(''),
      "company": new FormGroup(
        {
          "name": new FormControl('',[Validators.required]),
          "catchPhrase": new FormControl(''),
          "bs": new FormControl('')
        }
      )
    });
  }

  addNewUser() {
    const formData = this.newuser.value;
    if (this.newuser.valid) {
      this.apiService.addUser(formData).subscribe(
        () => {
          this.sharedDataService.openSnackBar("User Added Successfully");
          this.router.navigateByUrl('/client')
        }
      );
    } else {
      this.newuser.markAllAsTouched();
    }
  }
}
