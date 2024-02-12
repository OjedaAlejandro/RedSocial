import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../../services/user.service.service';
@Component({
  selector: 'app-register-data-user',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './register-data-user.component.html',
  styleUrl: './register-data-user.component.css'
})
export class RegisterDataUserComponent {
  formulario:FormGroup;
  _UserService=inject(UserServiceService)
  public id?:string;
  router=inject(Router)

  constructor(){
    this.formulario=new FormGroup({
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      year:new FormControl ('',[Validators.required]),
      sex:new FormControl('',[Validators.required])
    })
  }

  async OnSubmit() {
    const Response= await this._UserService.register_data(this.formulario.value)
    console.log(Response)
    this.id=Response._id
    this.router.navigate(['registro',this.id])

    }

}
