import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './components/canvas-graphics/canvas/canvas.component';
import { RasterizerComponent } from './components/canvas-graphics/rasterizer/rasterizer.component';
import { SortingVisualisationComponent } from './components/sorting/sorting-visualisation/sorting-visualisation.component';


const routes: Routes = [
  { path: 'sorting-algorithms', component: SortingVisualisationComponent },
  { path: 'raytracer', component: CanvasComponent },
  { path: 'rasterizer', component: RasterizerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
