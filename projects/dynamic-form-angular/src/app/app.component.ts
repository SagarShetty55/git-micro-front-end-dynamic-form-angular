import { Component } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  imports: [DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
