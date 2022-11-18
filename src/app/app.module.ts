import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherLocationComponent } from './components/weather-location/weather-location.component';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatIconModule ],
  declarations: [ AppComponent, HelloComponent, WeatherLocationComponent, WeatherDataComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
