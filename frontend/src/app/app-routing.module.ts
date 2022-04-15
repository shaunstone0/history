import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuidelinesComponent} from "./guidelines/guidelines.component";

const routes: Routes = [
  { path: 'guidelines', component: GuidelinesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
