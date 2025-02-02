import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { MoviesService } from './movies.service';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-movies',
  imports: [CardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  // movies = signal<any[]>([]);


  private moviesService = inject(MoviesService);
  private destroyRef = inject (DestroyRef);

  movies = this.moviesService.list

  // ONINIT
  ngOnInit() {
    console.log('ENTRATO')
    const subscription = this.moviesService.loadPopularMovies().subscribe({
      next: (data) => {
        console.log(data)
        this.moviesService.list.set(data)
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })

  }




}
