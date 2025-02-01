import { Component, input, ViewEncapsulation } from '@angular/core';
import { Movie } from './Movie.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  host:{
    
  }
})
export class CardComponent {

  movie = input<Movie>()

  
}
