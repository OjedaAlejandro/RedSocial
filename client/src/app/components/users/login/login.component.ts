import { Component, inject } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { UserServiceService } from '../../../services/user.service.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  public prueba:boolean
  formulario:FormGroup;
  _userService=inject(UserServiceService);
  router=inject(Router)
  constructor(){
    this.formulario=new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
    this.prueba=false
  }

  async onSubmit() {
    try{
      const Response=await this._userService.login(this.formulario.value);
      
      const res= await this._userService.getUser({email:this.formulario.value.email})
      console.log(Response)
      if(!Response.error){
        localStorage.setItem('token_songs',Response.token);
        localStorage.setItem('idUser',res._id);
        this.router.navigate(['/home'])
      }
      else{
        this.prueba=true;
      }
    }catch(err){
      console.log(err)
     
    }
    }
}
