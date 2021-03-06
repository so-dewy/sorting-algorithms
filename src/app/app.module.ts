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
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
