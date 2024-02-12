import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  router=inject(Router)
OnClickLogagut() {
  localStorage.removeItem('token_songs');
  localStorage.removeItem('idUser');
  this.router.navigate(['/login'])
}

}
