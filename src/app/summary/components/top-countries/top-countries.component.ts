import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-countries',
  templateUrl: './top-countries.component.html',
  styleUrls: ['./top-countries.component.css']
})
export class TopCountriesComponent implements OnInit, OnChanges {

  @Input() covidData: any;
  topConfirmedCases: any[] = [];
  topConfirmedDeaths: any[] = [];
  topConfirmedRecovered: any[] = [];

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.topConfirmedCases = this.covidData.Countries?.slice(0, 5)
      .sort((a: any, b: any) => b.TotalConfirmed - a.TotalConfirmed);
  
    this.topConfirmedDeaths = this.covidData.Countries?.slice(0, 5)
      .sort((a: any, b: any) => b.TotalDeaths - a.TotalDeaths);
  
    this.topConfirmedRecovered = this.covidData.Countries?.slice(0, 5)
      .sort((a: any, b: any) => b.TotalRecovered - a.TotalRecovered);
  

  }

}
