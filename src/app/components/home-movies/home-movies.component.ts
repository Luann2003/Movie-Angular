import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Igenre } from '../../interfaces/Igenre';
import { Imovies } from '../../interfaces/Imovies';
import { Router } from '@angular/router';
import { MovieIdComponent } from "../movie-id/movie-id.component";

@Component({
  selector: 'app-home-movies',
  standalone: true,
  imports: [CommonModule, MovieIdComponent],
  templateUrl: './home-movies.component.html',
  styleUrl: './home-movies.component.scss'
})
export class HomeMoviesComponent implements OnInit{

  constructor(
    private router: Router,
    private moviesService: MoviesService
  ) {}

  genres: Igenre[] = [];
  movies: Imovies[] =[];
  movieId: number | null = null;


  selectedMovie: Imovies | null = null; ;

  ngOnInit(): void {
    this.loadGenres();
    this.loadMovies();

  }

  loadGenres(): void{
    this.moviesService.getGenre().subscribe({
      next: (response) =>{
        this.genres =  response.content || response;
        
      },
      error: (err) =>{
        console.error("error " + err )
      }
    })
  }

  onGenreChange(event: Event) {
    const genreId = (event.target as HTMLSelectElement).value;
    this.moviesService.getMoviesByGenre(genreId, 0, 4).subscribe(response => {
      this.movies = response.content; 
    });
  }

  loadMovies(): void{
    this.moviesService.getMoviesByGenre("0", 0, 4).subscribe({
      next: (response) =>{
        console.log(response)
        this.movies =  response.content || response;
      }
    })
  }

  getMovieId(id: number) {
    this.moviesService.getMoviesById(id).subscribe({
      next: (response) => {
        this.selectedMovie = response; 
        this.router.navigate(["/movies", id])
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  




}
