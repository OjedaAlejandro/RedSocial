import { Component, WritableSignal, inject, signal } from '@angular/core';
import { UserServiceService } from '../../services/user.service.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-otros-users',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './otros-users.component.html',
  styleUrl: './otros-users.component.css'
})
export class OtrosUsersComponent {
  _UserService=inject(UserServiceService)
  arrPersonas:WritableSignal<any[]>=signal([]);;
  async ngOnInit(){
      const Response=await this._UserService.getUsers();
      this.arrPersonas.set(Response)
      console.log(this.arrPersonas());
  }
  localStorageUser(){
    return localStorage.getItem('idUser');
  }


}
