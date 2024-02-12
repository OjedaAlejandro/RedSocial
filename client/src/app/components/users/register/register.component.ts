import { Component, inject, signal } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../../services/user.service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  _id:any;

  formulario:FormGroup;
  _UserService=inject(UserServiceService);
  router=inject(Router);
  _route=inject(ActivatedRoute)
  constructor(){
    this.formulario= new FormGroup({
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
 
    });
  }
   ngOnInit(){
    this._route.params.subscribe(async params=>{
      this._id=params['id'];
    })
    
  }
  async onSubmit(){
    try{
      const Response=this._UserService.register(this._id,this.formulario.value);
      console.log(Response);
      this.router.navigate(['/login']);
    }catch(err){
      console.log(err);
    }
  }

}
