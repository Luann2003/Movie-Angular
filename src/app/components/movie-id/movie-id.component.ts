import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Imovies } from '../../interfaces/Imovies';

@Component({
  selector: 'app-movie-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-id.component.html',
  styleUrl: './movie-id.component.scss'
})
export class MovieIdComponent implements OnInit {
  @Input() movie: Imovies | null = null; 

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.moviesService.getMoviesById(id).subscribe({
      next: (response) => {
        this.movie = response; 
        console.log(this.movie);
      },
      error: (err) => {
        console.log(err);
      }
    });

    }



}
