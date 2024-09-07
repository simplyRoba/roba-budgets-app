import { Routes } from '@angular/router';
import { IncomeComponent } from './income.component';
import { EditComponent } from './edit/edit.component';

const incomeRoutes: Routes = [
  { path: '', component: IncomeComponent },
  { path: 'add', component: EditComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: ':year/:month', component: IncomeComponent },
];

export default incomeRoutes;
