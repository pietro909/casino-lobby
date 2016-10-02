import { Routes } from '@angular/router';
import { About, Casino, GameView, NoContent } from './pages';

export const ROUTES: Routes = [
  { path: '',      component: About },
  { path: 'about', component: About },
  { path: 'casino', component: Casino },
  { path: 'game/:id', component: GameView },
  { path: '**',    component: NoContent },
];
