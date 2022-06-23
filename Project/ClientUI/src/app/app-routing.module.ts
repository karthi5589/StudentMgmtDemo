import { ViewStudentScoreComponent } from './view-student-score/view-student-score.component';
import { AdminConfigComponent } from './admin-config/admin-config.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes =
[
  { path: 'welcome', component: HomeComponent },
  { path: 'admin', component: AdminConfigComponent },
  { path: 'student', component: ViewStudentScoreComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
