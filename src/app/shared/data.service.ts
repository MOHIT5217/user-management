import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable(
  {
  providedIn: 'root'
}
)
export class DataService {

  constructor(private snackBar:MatSnackBar ) { }
  
  log(message: string): void {
    console.log(message);
  }
openSnackBar(message: string, action: string = 'Close', duration: number = 3000) {
  console.log("openSnackBar", message);
  
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
  
}
