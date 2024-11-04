import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export class TestFormComponent {
  gradeHistoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form in the constructor
    this.gradeHistoryForm = this.formBuilder.group({
      class_id: [''],
      student_id: [''],
      grades: this.formBuilder.array([]),
    });
  }

  get grades(): FormArray {
    return this.gradeHistoryForm.get('grades') as FormArray;
  }

  removeGrade(index: number): void {
    this.grades.removeAt(index);
  }

  addGrade(): void {
    const gradeGroup = this.formBuilder.group({
      type: [''],
      score: [''],
    });
    this.grades.push(gradeGroup);
  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.gradeHistoryForm.value);
  }
}
