import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { MoviesService } from './movies.service';
import { CardComponent } from "../card/card.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-movies',
  imports: [CardComponent, LoaderComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  // movies = signal<any[]>([]);


  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  movies = this.moviesService.list
  pageNumber = this.moviesService.pageNumber;

  pagVisibility = this.moviesService.paginationVisible;


  // ONINIT
  ngOnInit() {
    setTimeout(() => {
      this.moviesService.paginationVisible.set(true);
      this.moviesCall();
    }, 4000);

  }


  nextPage() {
    this.moviesService.nextPage();
    if (this.moviesService.moviesSelected) {
      this.moviesCall();
    }
    else {
      this.tvShowCall();
    }
  }
  prevPage() {
    this.moviesService.prevPage();
    if (this.moviesService.moviesSelected) {
      this.moviesCall();
    }
    else {
      this.tvShowCall();
    }
  }



  moviesCall() {
    this.moviesService.tvShowSelected = false;
    this.moviesService.moviesSelected = true;

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

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  tvShowCall() {
    this.moviesService.moviesSelected = false;
    this.moviesService.tvShowSelected = true;

    console.log('clicked tv show')
    const subscription = this.moviesService.loadTvSeries().subscribe({
      next: (data) => {
        this.moviesService.list.set(data);
      },
      error: (error) => {
        console.error('error', error);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }




}
