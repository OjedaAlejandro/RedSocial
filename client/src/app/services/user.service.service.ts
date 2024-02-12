import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  _Http=inject(HttpClient);
  private baseUrl='https://backen-red-sociall.fly.dev'
  constructor() { }

  
  getDataUser(id:any){
    return firstValueFrom(
      this._Http.get<any>(this.baseUrl+'/SeeProject/'+id)
    )
  }
  register_data(data:any){
    return firstValueFrom(
      this._Http.post<any>(this.baseUrl+'/registerDataUser',data)
    )
  }
  register(id:string,formData:any){
    return firstValueFrom(
      this._Http.put<any>(this.baseUrl+'/registerPasswordAndEmail/'+id,formData)
    )
  }
  login(formData:any){
    return firstValueFrom(
      this._Http.post<any>(this.baseUrl+'/login',formData)
    )
  }
  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();//Se crea una nueva instancia de la clase FormData. FormData es una interfaz que proporciona una forma fácil de construir un conjunto de pares clave/valor que representan campos de un formulario y sus valores, los cuales luego se pueden enviar fácilmente a través de una solicitud HTTP.

    formData.append('image', file);//Se agrega un nuevo par clave/valor al objeto FormData. La clave es 'imagenPerfil', que es el nombre del campo del formulario que se utilizará en el servidor. El valor es el objeto file, que se obtuvo de un input de tipo file en un formulario HTML.

    return this._Http.post(this.baseUrl+'/upload', formData);
  }

  getUser(form:any){
    return firstValueFrom(
      this._Http.post<any>(this.baseUrl+'/getUser',form)
    )
  }
  UpdateUrlImg(id:any,form:any){
    return firstValueFrom(
      this._Http.put<any>(this.baseUrl+'/UpdateUrlImg/'+id,form)
    )
  }
  getUsers(){
    return firstValueFrom(
      this._Http.get<any>(this.baseUrl+'/SeeProject')
    )
  }


}
