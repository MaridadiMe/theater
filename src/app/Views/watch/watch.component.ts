import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIConstants } from 'src/app/Constants/api-constants';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    ){}

  ngOnInit(){
    this.route.queryParams.subscribe({
      next: (params: Params)=>{
        let movieUuid = params['v'];
        // get movie details
        this.getMovieDetails(movieUuid);
      }
    });

  }


  movie: any;


  getMovieDetails(movieUuid: string){
    this.dataService.getMovieDetails(movieUuid).subscribe({
      next: (movie: any)=>{
        this.movie = movie;
        this.movie.cover = APIConstants.HOST_URL + this.movie.cover;
        this.movie.upload = APIConstants.HOST_URL + this.movie.upload;
        console.log('movie', this.movie);
      },
      error: (error: any)=>{
        console.log('there was an error', error)
      }
    });
  }

}
