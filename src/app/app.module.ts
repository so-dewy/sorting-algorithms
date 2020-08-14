import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ElementOfArrayComponent } from './components/element-of-array/element-of-array.component';
import { ArrayToBeSortedComponent } from './components/array-to-be-sorted/array-to-be-sorted.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementOfArrayComponent,
    ArrayToBeSortedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
