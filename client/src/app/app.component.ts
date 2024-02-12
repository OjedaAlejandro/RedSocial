import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MenuComponent]
})
export class AppComponent {
  title = 'client';
  Chequeo(){
    return localStorage.getItem('token_songs')
  }
}
