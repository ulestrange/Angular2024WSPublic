import { Component } from '@angular/core';
import { GradeHistory } from '../grade-history';
import { GradeHistoriesService } from '../grade-histories-service';
import { MatCardModule } from '@angular/material/card'



@Component({
  selector: 'app-grade-histories',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './grade-histories.component.html',
  styleUrl: './grade-histories.component.css'
})
export class GradeHistoriesComponent {

  gradeHistories : GradeHistory[] = [];
  message: string = '';
   
  constructor (private gradeHistoryService: GradeHistoriesService) {}

  ngOnInit(): void {
    this.gradeHistoryService.getGradeHistories().subscribe({
      next: (value: GradeHistory[]) => { console.log ('here'); this.gradeHistories = value},
      complete: () => console.log('gradeHistory service finished'),
      error: (message) => this.message = message
    }) 
  }




}
