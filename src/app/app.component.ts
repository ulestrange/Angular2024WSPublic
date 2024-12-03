import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AuthCustomService } from './authCustom.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, AsyncPipe, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnguarlWS2024';

  constructor(
    public authService: AuthCustomService,
  ) {}

  handleLogOut() {
    this.authService.logout();
}


}
