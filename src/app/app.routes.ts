import { Routes } from '@angular/router';
import { GradeHistoriesComponent } from './grade-histories/grade-histories.component';
import { HomeComponent } from './home/home.component';
import { TestFormComponent } from './test-form/test-form.component';



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', redirectTo: '/'},
    {path: 'grade-history', component: GradeHistoriesComponent},
    {path: 'form', component: TestFormComponent},
    ];
