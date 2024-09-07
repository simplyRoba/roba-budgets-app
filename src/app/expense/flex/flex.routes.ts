import { Routes } from '@angular/router';
import { FlexListComponent } from './flex-list/flex-list.component';

const flexRoutes: Routes = [
  { path: '', component: FlexListComponent },
  { path: ':year/:month', component: FlexListComponent },
];

export default flexRoutes;
