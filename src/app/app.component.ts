import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { MoviesComponent } from "./movies/movies.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_Netflix';
}
