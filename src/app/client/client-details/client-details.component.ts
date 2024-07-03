import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  user!:IUser;

  constructor(private activatedroute:ActivatedRoute, private apiservice:ApiService) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(route=>{
      console.log("id =>",route.id);
      this.apiservice.getSingleUser(route.id).subscribe(user=>{
        this.user = user;
      });
    });
  }

}
