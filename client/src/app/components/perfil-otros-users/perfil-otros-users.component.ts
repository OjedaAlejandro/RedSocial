import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../services/user.service.service';
import { CommonModule } from '@angular/common';
import { RouterModule,Router,Route, ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule,FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-otros-users',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './perfil-otros-users.component.html',
  styleUrl: './perfil-otros-users.component.css'
})
export class PerfilOtrosUsersComponent {
  formulario=new FormGroup({
    description: new FormControl('')
  });
  selectedFile?: File;//File, que es un tipo de objeto en JavaScript utilizado para representar archivos seleccionados por el usuario.
  imageUrl?: string;  // Propiedad para almacenar la URL de la imagen
  _userService=inject(UserServiceService);
  public Response?:any
  public id:any;
  router=inject(Router);
  _route=inject(ActivatedRoute)

  async ngOnInit(){
    this._route.params.subscribe(async params=>{
      const id=params['id'];
      this.id=id
    })
     if(this.id){
      this.Response= await this._userService.getDataUser(this.id);
     }
  }

  onFileSelected(event:any): void {
    if (event.target.files && event.target.files.length > 0) { //en el if compruebo que el archivo no sea underfull  ni null
      this.selectedFile = event.target.files[0];
      
    }
  }
  onUpload(): void {
    if (this.selectedFile) {
      this._userService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Archivo subido con éxito', response);

          // Asigna la URL de la imagen para mostrarla
          this.imageUrl = "http://localhost:3000/uploads/"+this.selectedFile?.name;
          console.log(this.imageUrl);
          this._userService.UpdateUrlImg(this.id,{img:this.imageUrl});
          this.recargarPagina()
        },
        (error) => {
          console.error('Error al subir el archivo', error);
        }
      );
    }
  }
  async EnviarDescription(){
    try{
      const Response=await this._userService.UpdateUrlImg(this.id,this.formulario.value)
      this.recargarPagina()
    }catch{}
  }  
  recargarPagina() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['perfil']);
    });
  }
}
