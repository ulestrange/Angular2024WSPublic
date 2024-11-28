import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthCustomService } from './authCustom.service';
import { AsyncPipe } from '@angular/common';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnguarlWS2024';

  constructor(
    public authService: AuthCustomService,
  ) {}

  handleLogOut() {
    this.authService.logout().subscribe({
      next: response  =>
       {
         console.log('user is logged out');
      //this.router.navigateByUrl('/');
       }
    });
}


}
