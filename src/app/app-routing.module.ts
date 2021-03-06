import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortingVisualisationComponent } from './components/sorting/sorting-visualisation/sorting-visualisation.component';


const routes: Routes = [
  { path: 'sorting-algorithms', component: SortingVisualisationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
