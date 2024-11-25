import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GradeHistoriesComponent } from './grade-histories/grade-histories.component';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnguarlWS2024';
}
