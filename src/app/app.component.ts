import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { WeatherService} from './Services/weather.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'weatherapp';
  weather;
  constructor (private weatherService : WeatherService){

  }
  ngOnInit(){
  }

  getWeather(cityName: string,countryCode: string){
    this.weatherService.getWeather(cityName, countryCode)
    .subscribe(
      res =>{
        console.log(res);
        this.weather = res},
      err => console.log(err)
    )

  }

  submitLocation(cityName: HTMLInputElement,countryCode: HTMLInputElement){
    if(cityName.value && countryCode.value){
      this.getWeather(cityName.value,countryCode.value);
      cityName.value = '';
      countryCode.value = '';
    }
    else{
      alert('Inserta algun dato')
    }
    cityName.focus();
    return false;

  }
  

}
