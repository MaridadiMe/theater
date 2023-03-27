import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIConstants } from '../Constants/api-constants';
import { Movie } from '../Models/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * getLatestMovie
   */
  public getLatestMovie(): Observable<Movie> {
    return this.http.get<Movie>(APIConstants.APP_URL + "/movie/latest?api_key=" + APIConstants.MTB_API_KEY)
  }

  /**
   * getPopularMovies
   */
   public getPopularMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(APIConstants.APP_URL + "/movie/popular?api_key=" + APIConstants.MTB_API_KEY)
  }

  /**
   * Get List of Movies To watch
   */
  public getWatchList(): Observable<any[]> {
    return this.http.get<any[]>(APIConstants.BACK_END + "/get-movie-list-to-watch/");
  }

  /**
   * @author Norbert Seho
   * March 27 2022 13:10
   * getMovieDetails
   * returns details of a movie to watch
   * 
   */
   public getMovieDetails(movieUuid: any): Observable<any>{
    return this.http.get<any>(APIConstants.BACK_END + "/get-movie-to-watch-details/" + movieUuid);
  }
}
