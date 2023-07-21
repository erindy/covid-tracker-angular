import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSummaryData() {
    // return this.http.get('https://api.covid19api.com/summary');

    return of(createCovidDataObject());
  }
}


function createCovidDataObject() {

  const countries = ["Brazil", "Albania", "USA", "India", "Russia", "China", "Italy", "Germany", "France", "Spain", "Australia"];
  const covidDataObjects = [];
  for (let i = 0; i < 10; i++) {
    const randomCovidData = createRandomCovidDataObject(countries);
    if (randomCovidData === null) {
      // If all countries have been used, break out of the loop or handle accordingly
      break;
    }
    covidDataObjects.push(randomCovidData);
  }
  return {
    Global: {
      TotalConfirmed: 20000,
      TotalDeaths: 150,
      TotalRecovered: 394
    },
    Countries: 
      covidDataObjects

    
  };
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomCovidDataObject(countries: string[]): any {
  if (countries.length === 0) {
    // If all countries have been used, return null or handle accordingly
    return null;
  }

  const randomCountryIndex = getRandomNumber(0, countries.length - 1);
  const country = countries[randomCountryIndex];
  countries.splice(randomCountryIndex, 1); // Remove the selected country from the list
  const countryCode = country.slice(0, 2).toUpperCase();
  const date = getRandomPastDate().toISOString();
  const newConfirmed = getRandomNumber(100, 1000);
  const newDeaths = getRandomNumber(1, 50);
  const newRecovered = getRandomNumber(0, 100);
  const slug = country.toLowerCase();
  const totalConfirmed = getRandomNumber(10000, 500000);
  const totalDeaths = getRandomNumber(500, 10000);
  const totalRecovered = getRandomNumber(1000, 200000);

  return {
    Country: country,
    CountryCode: countryCode,
    Date: date,
    NewConfirmed: newConfirmed,
    NewDeaths: newDeaths,
    NewRecovered: newRecovered,
    Slug: slug,
    TotalConfirmed: totalConfirmed,
    TotalDeaths: totalDeaths,
    TotalRecovered: totalRecovered
  };
}

function getRandomPastDate(): Date {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime());
  pastDate.setDate(currentDate.getDate() - getRandomNumber(1, 365)); // Generate a random date within the last year
  return pastDate;
}