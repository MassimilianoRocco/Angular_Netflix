import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  movies = signal<any[]>([]);
  

  private moviesService = inject(MoviesService);


  ngOnInit() {
    console.log('ENTRATO')
    this.moviesService.loadPopularMovies().subscribe({
      next: (data) => {
        console.log(data)
        this.movies.set(data)
        },
        error: (error) => {
          console.error('Error:', error);
          }
    });

  }

 

}
