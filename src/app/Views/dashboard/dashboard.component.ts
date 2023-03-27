import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIConstants } from 'src/app/Constants/api-constants';
import { Movie } from 'src/app/Models/movie';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private dataService: DataService,
    private router: Router
    ){}

  ngOnInit(){
    // this.getLatestMovie();
    // this.getPopularMovies();
    this.getWatchList();
  }


  latestMovie !: Movie;
  popularMovies !: Movie[];
  recentUploads : any[] = [];

  getLatestMovie(){
    this.dataService.getLatestMovie().subscribe({
      next: (data: Movie)=>{
        this.latestMovie = this.modifyLatest(data);
      },
      error: (error: any)=>{
        console.log('there was an error', error)
      }
    });
  }

  getPopularMovies(){
    this.dataService.getPopularMovies().subscribe({
      next: (data: any)=>{
        this.popularMovies = this.modifyData(data);
      },
      error: (error: any)=>{
        console.log('there was this error', error)
      }

    });
  }

  getWatchList(){
    this.dataService.getWatchList().subscribe({
      next: (data: any[])=>{
        if(data.length > 0){
          this.recentUploads = data;
        }
      },
      error: (error: any)=>{
        console.log('An error was encountered', error)
      }
    });
  }


  modifyData(movies: any){
    if(movies.results){
      movies.results.forEach((movie: Movie) => {
        movie.backdrop_path = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path + "?api_key=" + APIConstants.MTB_API_KEY;
      });
    }

    return movies.results;
  }

  modifyLatest(movie: Movie){
    if(!movie.backdrop_path){
      movie.backdrop_path = "https://image.tmdb.org/t/p/w500/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg?api_key=b8343b58fbf40d59abdeca829f57c659";
    }

    return movie;
  }

  view(movie: any){
    this.router.navigate(['watch'], {queryParams: {'v': movie.uuid}})
  }
}
