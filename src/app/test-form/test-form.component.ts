import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormArray,
  Validators,
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
      class_id: ['', [Validators.required, Validators.minLength(3)]],
      student_id: [''],
      grades: this.formBuilder.array([]),
    });
  }

  get grades(): FormArray {
    return this.gradeHistoryForm.get('grades') as FormArray;
  }

  get class_id() {
    return this.gradeHistoryForm.get('class_id');
  }

  removeGrade(index: number): void {
    console.log(index);
    console.table(this.grades.at(index).value);
    this.grades.removeAt(index);
  }

  addGrade(): void {
    const gradeGroup = this.formBuilder.group({
      type: ['', [Validators.required]],
      score: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
    this.grades.push(gradeGroup);
  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.gradeHistoryForm.value);
  }
}
