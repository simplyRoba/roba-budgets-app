import { Routes } from '@angular/router';
import { SummaryComponent } from './summary.component';

const summaryRoutes: Routes = [
  { path: '', component: SummaryComponent },
  { path: ':year/:month', component: SummaryComponent },
];

export default summaryRoutes;
