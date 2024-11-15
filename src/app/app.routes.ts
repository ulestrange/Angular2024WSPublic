import { Routes } from '@angular/router';
import { GradeHistoriesComponent } from './grade-histories/grade-histories.component';
import { HomeComponent } from './home/home.component';
import { TestFormComponent } from './test-form/test-form.component';
import { GradeHistoryDetailsComponentComponent } from './grade-history-details-component/grade-history-details-component.component';



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', redirectTo: '/'},
    {path: 'grade-history', component: GradeHistoriesComponent},
    {path: 'grade-history/:id', component: GradeHistoryDetailsComponent},
    {path: 'form', component: TestFormComponent},
    ];
f