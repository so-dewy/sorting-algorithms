import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './components/canvas-graphics/canvas/canvas.component';
import { SortingVisualisationComponent } from './components/sorting/sorting-visualisation/sorting-visualisation.component';


const routes: Routes = [
  { path: 'sorting-algorithms', component: SortingVisualisationComponent },
  { path: '3d-graphics', component: CanvasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
