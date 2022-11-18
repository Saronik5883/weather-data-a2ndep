import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-weather-location',
  templateUrl: './weather-location.component.html',
  styleUrls: ['./weather-location.component.css'],
})
export class WeatherLocationComponent implements OnInit {
  public location = new FormControl();
  public locationsList = [];
  public day1;
  public day2;
  public day3;
  public day4;
  public day5;
  public weatherDesc;
  public mainWeather;
  public wind;
  public pressure;
  public temperature;
  public humidity;
  public sunrise;
  public sunset;
  public time;
  public counter;
  public showData = false;
  locationGroup = new FormGroup({
    location: new FormControl(),
  });

  constructor(private service: WeatherService) {}

  ngOnInit() {}

  onSubmit(locationValue, isPush) {
    let selectedLocation = locationValue;
    this.service.searchWeatherData(selectedLocation).subscribe(
      (success) => {
        this.showData = true;
        this.weatherDesc = success.weather[0].description;
        this.mainWeather = success.weather[0].main;
        this.wind = success.wind.speed + 'ms  ' + success.wind.deg + ' deg';
        this.pressure = success.main.pressure;
        this.humidity = success.main.humidity;

        this.time = success.dt;
        var date = new Date(this.time * 1000);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var seconds = '0' + date.getSeconds();
        this.time = hours + ':' + minutes + ':' + seconds;

        this.sunrise = success.sys.sunrise;
        var date = new Date(this.sunrise * 1000);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var seconds = '0' + date.getSeconds();
        this.sunrise = hours + ':' + minutes + ':' + seconds;

        this.sunset = success.sys.sunset;
        var date = new Date(this.sunset * 1000);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var seconds = '0' + date.getSeconds();
        this.sunset = hours + ':' + minutes + ':' + seconds;

        this.temperature = (success.main.temp - 273.15).toFixed(1);
        if (isPush) {
          let appendedData = ' - ' + this.temperature + 'C ' + this.mainWeather;
          let selectedLocationData = {};
          selectedLocationData['location'] = selectedLocation;
          selectedLocationData['data'] = appendedData;
          this.locationsList.push(selectedLocationData);
        }
        let latitude = success.coord.lat;
        let longitude = success.coord.lon;
        for (let i = 0; i < 5; i++) {
          this.service
            .getWeeklyData(latitude, longitude, i)
            .subscribe((res) => {
              let spanId = 'day' + i;
              res['current'].temp;
              document.getElementById(spanId).innerHTML =
                (res['current'].temp - 273.15).toFixed(1) + ' C';
            });
        }
      },
      (error) => {
        alert('Please enter the valid location');
      }
    );
  }

  selectedLocation(location) {
    console.log('location', location);
    this.onSubmit(location, false);
    this.counter = this.counter + 1;
  }

  clearWeatherData() {
    this.locationsList = [];
    this.showData = false;
  }
}
