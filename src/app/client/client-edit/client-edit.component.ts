import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUser } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  editForm!: FormGroup;
  user!: IUser;
  userId!: string;
  initialFormValue: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private apiservice: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(route => {
      this.userId = route.id;
      this.apiservice.getSingleUser(route.id).subscribe(user => {
        this.user = user;
        this.formData(this.user);
      });
    });
  }

  formData(user: IUser) {
    this.editForm = this.fb.group({
      "id": new FormControl(''),
      "name": new FormControl('',[Validators.required]),
      "thumbImg": new FormControl('', [Validators.required]),
      "username": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "address": new FormGroup(
        {
          "street": new FormControl(''),
          "suite": new FormControl(''),
          "city": new FormControl('', [Validators.required]),
          "zipcode": new FormControl(''),
          "geo": new FormGroup(
            {
              "lat": new FormControl(''),
              "lng": new FormControl(''),
            }
          )
        }
      ),
      "phone": new FormControl('', [Validators.required]),
      "website": new FormControl(''),
      "company": new FormGroup(
        {
          "name": new FormControl('',[Validators.required]),
          "catchPhrase": new FormControl(''),
          "bs": new FormControl('')
        }
      )
    });
    this.editForm.setValue(user);
    // Store the initial form value for comparison
    this.initialFormValue = this.editForm.value;
  }

  getAddressControls() {
    return (this.editForm.get('address') as FormGroup).controls;
  }

  getGeoControls() {
    return (this.editForm.get('address.geo') as FormGroup).controls;
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
     // Compare current form value with the initial value
    if (JSON.stringify(this.editForm.value) === JSON.stringify(this.initialFormValue)) {
      console.log('No changes detected, form will not be submitted.');
      this.dataService.openSnackBar("No changes detected, form will not be submitted.");
      return;
    }
    const obj = this.editForm.value;
    if (this.editForm.valid) {
      setTimeout(() => {
        this.apiservice.editUser(obj, this.userId).pipe(
          debounceTime(1000), // Add delay
          distinctUntilChanged() // Ensure the changes are distinct
        ).subscribe(
          res => {
            console.log(res, "edit");
          },
          err => {
            console.log(err);
          },
          () => {
            this.dataService.openSnackBar("User Edit Successfully");
            this.router.navigateByUrl('/client');
          }
        );
      }, 1000); // Delay in milliseconds (e.g., 1000ms = 1 second)
    } else {
      this.editForm.markAllAsTouched();
    }
  }
  

}
