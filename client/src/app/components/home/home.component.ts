import { Component, inject } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { OtrosUsersComponent } from '../otros-users/otros-users.component';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MenuComponent,OtrosUsersComponent]
})
export class HomeComponent {

}
