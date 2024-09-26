import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Imovies } from '../../interfaces/Imovies';
import { Ireviews } from '../../interfaces/Ireviews';
import { ReviewService } from '../../services/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-id.component.html',
  styleUrl: './movie-id.component.scss'
})
export class MovieIdComponent implements OnInit {
  @Input() movie: Imovies | null = null; 

  movieId: number;

  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private moviesService: MoviesService
  ) {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
  }

  reviews: Ireviews[] =[];

  reviewForm = new FormGroup({
    text: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getMoviesById(this.movieId);
    this.getReviewsId(this.movieId);
    }

    getMoviesById(id: number){
    
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

    getReviewsId(id: number){
      this.reviewService.getReviewsId(id).subscribe({
        next: (response) =>{
          this.reviews = response.content || response;
        },
        error: (err) =>{
          console.log(err)
        }
      })
    }

    onSubmit(): void{
      if (this.reviewForm.valid){

        const formData = {
          ...this.reviewForm.value,  // Inclui os dados do formulário
          movieId: this.movieId      // Adiciona o movieId
        };

        this.reviewService.postReview(formData).subscribe({
          next: (response) => {
            this.getReviewsId(this.movieId);
          },
          error: (err) => {
            if(err.status === 401 ){
              this.toastService.error("Usuário precisa estar logado!")
            }else{
              this.toastService.error("Erro inesperado! Tente novamente.");
            }
          }
        })
      }else{
        this.toastService.error("Por favor digite uma avaliação!");

      }
      this.reviewForm.reset();
    }



}
