import { Routes } from '@angular/router';
import { GradeHistoriesComponent } from './grade-histories/grade-histories.component';
import { HomeComponent } from './home/home.component';
import { TestFormComponent } from './test-form/test-form.component';
import { GradeHistoryDetailsComponent } from './grade-history-details/grade-history-details.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', redirectTo: '/'},
    {path: 'grade-history', component: GradeHistoriesComponent},
    {path: 'grade-history/:id', component: GradeHistoryDetailsComponent, canActivate: [adminGuard]},
    {path: 'form', component: TestFormComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent}
    ];
