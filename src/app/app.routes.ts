import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { AuthGuard } from './services/auth-guard.service';
import { MovieIdComponent } from './components/movie-id/movie-id.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "movies",
        component: HomeMoviesComponent,
        //canActivate: [AuthGuard]
    },
    {
        path: "movies/:id",
        component: MovieIdComponent,
        //canActivate: [AuthGuard]
    }
];
