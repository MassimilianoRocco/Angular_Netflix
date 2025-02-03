import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    private httpClient = inject(HttpClient);

    list = signal<any[]>([]);

    paginationVisible = signal<boolean>(true);

    pageNumber = signal<number>(1);

    moviesSelected = false;
    tvShowSelected = false;




    loadPopularMovies() {
        return this.fetchMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page='+this.pageNumber(), 'Qualcosa è andato storto con la richiesta dei Film. Riprova più tardi')
    }

    loadTvSeries(){
        return this.fetchMovies('https://api.themoviedb.org/3/discover/tv?page='+this.pageNumber(), 'Qualcosa è andato storto con la richiesta delle Serie Tv. Riprova più tardi')
    }

    loadOnSearch(value:string){
        return this.fetchMovies('https://api.themoviedb.org/3/search/movie?query=' + value, 'Qualcosa è andato storto con la ricerca. Riprova più tardi')
    }

    nextPage(){
        this.pageNumber.set(this.pageNumber()+1);
      }
    prevPage(){
        this.pageNumber.set(this.pageNumber()-1);
    }





    // E' comune avere la subscription nel component, ma la configurazione http in un service come questo
    private fetchMovies(url: string, errorMessage: string) {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzE5MmFlYjcyZDY5NDI1MGFkYzYxODJhOTk1NmVjMyIsInN1YiI6IjY2NTcwYWQ1ZmVlNjZlZmZiNWU0ZTUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pOvQ1OKAYU2WHehpISSAFEQetdRMxLF2-h2lW5U6Szo'
        });

        return this.httpClient
            .get<{ results: any[] }>(url, { headers })
            .pipe(
                map(response => response.results), // Estrai solo l'array dei film
                catchError(error => {
                    console.error(error);
                    return throwError(() => new Error(errorMessage));
                })
            );
    }
}