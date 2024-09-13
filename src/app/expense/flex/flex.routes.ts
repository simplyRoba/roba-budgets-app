import { Routes } from '@angular/router';
import { FlexListComponent } from './flex-list/flex-list.component';
import {EditExpenseComponent} from "../edit-expense/edit-expense.component";

const flexRoutes: Routes = [
  { path: '', component: FlexListComponent },
  { path: 'add', component: EditExpenseComponent, data: { type: 'flex' } },
  { path: 'edit/:id', component: EditExpenseComponent, data: { type: 'flex' } },
  { path: ':year/:month', component: FlexListComponent },
];

export default flexRoutes;
