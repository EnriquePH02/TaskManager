import { Component } from '@angular/core';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CategoriesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
