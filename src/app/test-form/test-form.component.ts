import { Component, Input } from '@angular/core';
import { GradeHistory } from '../grade-history';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { GradeHistoriesService } from '../grade-histories-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export class TestFormComponent {
  
  @Input() gradeHistory? : GradeHistory;

  gradeHistoryForm: FormGroup = new FormGroup({});
  gradeTypes = [
    {value: 'homework', viewValue: 'Homework'},
    {value: 'quiz', viewValue: 'Quiz'},
    {value: 'exam', viewValue: 'Exam'},
  ];
 

  constructor(private formBuilder: FormBuilder,
     private gradeHistoriesService: GradeHistoriesService,
    private router : Router) {
    // Cannot Initialize the form in the constructor anymore 
    // because the input is not defined until initialisaion
  }

  ngOnInit() : void{

   this.gradeHistoryForm = this.formBuilder.group({
      class_id: [this.gradeHistory?.class_id, [Validators.required, Validators.minLength(3)]],
      student_id: [this.gradeHistory?.student_id],
      scores: this.formBuilder.array([]),
  });

  if (this.gradeHistory)
    {
      this.populateScores()
    }
}

populateScores() {
  const scoreArray = this.gradeHistoryForm.get('scores') as FormArray;
  this.gradeHistory?.scores.forEach(score => {
    const gradeGroup = this.formBuilder.group({
      type: [score.type, [Validators.required]],
      score: [
        score.score,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    scoreArray.push(gradeGroup);
  });
}

  get scores(): FormArray {
    return this.gradeHistoryForm.get('scores') as FormArray;
  }

  get class_id() {
    return this.gradeHistoryForm.get('class_id');
  }

  removeGrade(index: number): void {
    console.log(index);
    console.table(this.scores.at(index).value);
    this.scores.removeAt(index);
  }

  addGrade(): void {
    const gradeGroup = this.formBuilder.group({
      type: ['', [Validators.required]],
      score: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    this.scores.push(gradeGroup);
  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.gradeHistoryForm.value);
    if (!this.gradeHistory){
        this.gradeHistoriesService.addGradeHistory(this.gradeHistoryForm.value)
      }
    else {
      this.updateGradeHistory(this.gradeHistory._id, this.gradeHistoryForm.value)
    }
  }


    updateGradeHistory (id : string, updatedValues : GradeHistory){
      this.gradeHistoriesService.updateGradeHistory(id, {...updatedValues})
      .subscribe({
        next: response => {   
          this.router.navigateByUrl('/grade-history')
        },
        error: (err : Error) => {
            console.log (err.message);
           // this.message = err
          }})}
  


  addNewGradeHistory(newHistory: GradeHistory): void {
    console.log('adding new gradeHistory ' + JSON.stringify(newHistory));
    this.gradeHistoriesService.addGradeHistory( {...newHistory})
    .subscribe({
    next: response => {
      console.log('Grade history submitted successfully', response);
    },
    error: (err : Error) => {
      console.error('There was an error!', err.message);
    }  }
    )
  }
}
