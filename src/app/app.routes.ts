import { Routes, RouterModule } from '@angular/router';
import { About } from './about';
import { Casino } from './casino';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Casino },
  { path: 'about', component: About },
  { path: 'casino', component: Casino },
  { path: '**',    component: NoContent },
];
