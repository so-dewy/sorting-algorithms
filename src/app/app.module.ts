import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ElementOfArrayComponent } from './components/sorting/element-of-array/element-of-array.component';
import { ArrayToBeSortedComponent } from './components/sorting/array-to-be-sorted/array-to-be-sorted.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SortingVisualisationComponent } from './components/sorting/sorting-visualisation/sorting-visualisation.component';
import { MatButtonModule } from '@angular/material/button';
import { CanvasComponent } from './components/canvas-graphics/canvas/canvas.component';
import { MatSelectModule } from '@angular/material/select';
import { RasterizerComponent } from './components/canvas-graphics/rasterizer/rasterizer.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementOfArrayComponent,
    ArrayToBeSortedComponent,
    NavigationHeaderComponent,
    SortingVisualisationComponent,
    CanvasComponent,
    RasterizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
