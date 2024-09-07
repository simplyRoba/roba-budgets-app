import { Routes } from '@angular/router';
import { IncomeListComponent } from './income-list/income-list.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';

const incomeRoutes: Routes = [
  { path: '', component: IncomeListComponent },
  { path: 'add', component: EditIncomeComponent },
  { path: 'edit/:id', component: EditIncomeComponent },
  { path: ':year/:month', component: IncomeListComponent },
];

export default incomeRoutes;
