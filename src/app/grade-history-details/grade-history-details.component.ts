import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GradeHistory } from '../grade-history';
import { GradeHistoriesService } from '../grade-histories-service';
import { AsyncPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { TestFormComponent } from '../test-form/test-form.component';
import { MatCardModule } from '@angular/material/card'
import { MatButton, MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-grade-history-details',
  standalone: true,
  imports: [AsyncPipe, TestFormComponent, MatCardModule, DecimalPipe, TitleCasePipe, MatButton],
  templateUrl: './grade-history-details.component.html',
  styleUrl: './grade-history-details.component.css'
})
export class GradeHistoryDetailsComponent {

  id : string | null = "";
  showForm: boolean = false;
  
  gradeHistory$ : Observable<GradeHistory> | undefined

  constructor(private route: ActivatedRoute, private gradeHistoriesService : GradeHistoriesService,
    private router : Router ) {}

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.gradeHistory$ = this.gradeHistoriesService.getGradeHistory(this.id)

    }
  }

  editGradeHistory() : void {
    this.showForm = true;
  }

  deleteGradeHistory() : void {
    console.log("in delete");

    if (this.id) {
    this.gradeHistoriesService.deleteGradeHistory(this.id)
    .subscribe({
      next: response => {   
        this.router.navigateByUrl('/grade-history')
      },
      error: (err : Error) => {
          console.log (err.message);
         // this.message = err
      }})

    }
  }

}
