import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms'

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css'
})
export class TestFormComponent {

  gradeHistoryForm : FormGroup = new FormGroup({
    class_id: new FormControl (''),
    student_id: new FormControl (''),
    })


    onSubmit(){
      console.log('forms submitted with ');
      console.table(this.gradeHistoryForm.value);
    }

}
