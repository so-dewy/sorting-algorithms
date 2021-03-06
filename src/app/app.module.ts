import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ElementOfArrayComponent } from './components/element-of-array/element-of-array.component';
import { ArrayToBeSortedComponent } from './components/array-to-be-sorted/array-to-be-sorted.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SortingVisualisationComponent } from './components/sorting-visualisation/sorting-visualisation.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementOfArrayComponent,
    ArrayToBeSortedComponent,
    NavigationHeaderComponent,
    SortingVisualisationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
