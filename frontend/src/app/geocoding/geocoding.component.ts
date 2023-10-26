import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent implements OnInit {
   lat: string = "48.665984902960616";
   lng: string = "6.1645160037523015";
   location: any;
   private readonly apiKey = 'aeb1aaa0cba148d48eb67f53cc30eeeb'; // Remplacez par votre clé API OpenCage Geocoding
   constructor(private http: HttpClient) {}

   ngOnInit(): void {
     this.reverseGeocode(this.lat, this.lng);
     this.searchLocation("Tacos Lès Nancy");
   }

   reverseGeocode(lat: string, lng: string): void {

     const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${this.apiKey}`;

     this.http.get(apiUrl)
       .subscribe((response: any) => {
         if (response.results.length > 0) {
           this.location = response.results[0];
           console.log(this.location);
           console.log(this.location.formatted)
           // Vous pouvez accéder à d'autres propriétés comme la ville, la rue, etc. dans `this.location`
         } else {
           console.error('Aucun résultat trouvé');
         }
       }, (error) => {
         console.error('Erreur de géocodage :', error);
       });
   }

   searchLocation(address: string): void {
    address = encodeURIComponent(address);
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${this.apiKey}`
    this.http.get(apiUrl)
      .subscribe((response: any) => {
        if (response.results.length > 0) {
          this.location = response.results[0];
          console.log(this.location);
          console.log(this.location.formatted)
        } else {
          console.error('Aucun résultat trouvé');
        }
      }, (error) => {
        console.error('Erreur de géocodage :', error);
      });
   }
}
