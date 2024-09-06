import { Routes } from '@angular/router';
import { IncomeComponent } from './income.component';
import { AddComponent } from './add/add.component';

const incomeRoutes: Routes = [
  { path: '', component: IncomeComponent },
  { path: ':year/:month', component: IncomeComponent },
  { path: 'add', component: AddComponent },
];

export default incomeRoutes;
