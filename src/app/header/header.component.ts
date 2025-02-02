import { Component, DestroyRef, EventEmitter, inject, signal } from '@angular/core';
import { UsersComponent } from "./users/users.component";
import { MoviesService } from '../movies/movies.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [UsersComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  enteredSearchValue = signal<string>('');






  // METODI PER CHIAMATE

  onTvShowClicked() {
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

  onMoviesClicked() {
    console.log('clicked tv show')
    const subscription = this.moviesService.loadPopularMovies().subscribe({
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

  onSearch() {

    if(this.enteredSearchValue() === ''){
      this.onMoviesClicked();
    }
    else{

      const subscription = this.moviesService.loadOnSearch(this.enteredSearchValue()).subscribe({
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

}
