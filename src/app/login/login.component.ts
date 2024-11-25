import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  // imports: [
  //   MatInputModule,
  //   MatFormFieldModule,
  //   MatButtonModule,
  //   HttpClientModule,
  //   ReactiveFormsModule
  // ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const values = this.loginForm.value
    console.log('submit with ');
    console.table(values);
    this.userService.login(this.email, this.password).
     subscribe(
      () => {
        console.log ("user is logged in"),
        this.router.navigateByUrl('/');
      }
     )

    }

    get email() {
      return this.loginForm.get('email')?.value ;
    }
    get password() {
      return this.loginForm.get('password')?.value ;
    }
  
  }
