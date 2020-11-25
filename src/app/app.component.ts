import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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
  constructor (
    private weatherService : WeatherService,
    private cookie: CookieService
    ){

  }
  ngOnInit(){
  }

  getWeather(cityName: string,countryCode: string){
    this.weatherService.getWeather(cityName, countryCode)
    .subscribe(
      res =>{
        console.log(res);
        this.cookie.set("ciudad",res["name"]);
        this.cookie.set("vientos",res["wind"].deg);

        alert("Los vientos de " + this.cookie.get("ciudad") + " son de " + this.cookie.get("vientos") + " km por hora");

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
