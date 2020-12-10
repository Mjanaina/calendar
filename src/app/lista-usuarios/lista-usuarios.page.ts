import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  private usuarios = new Array<Usuario>();
  private usuariosSubs: Subscription
  public pesquisa: string = '';

  constructor(
    private usuarioServ: UsuarioService,
    private firestore: AngularFirestore
  ) { 
    this.usuariosSubs = this.usuarioServ.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  async ngOnInit() {
    // this.usuarios = await this.inicializaItens();
  }

 async inicializaItens(): Promise <any> {
    const listaUsuarios = await this.firestore.collection('Usuários').valueChanges().pipe(first()).toPromise();
    return listaUsuarios;
  }

  ngOnDestroy() {
    this.usuariosSubs.unsubscribe();
  }

  async filterList(evt) {
    this.usuarios = await this.inicializaItens();
    this.pesquisa = evt.srcElement.value;
  
    if (!this.pesquisa) {
      return;
    }
    console.log(this.usuarios);
    
    this.usuarios = this.usuarios.filter(usuario => {
      if (usuario.username && this.pesquisa) {
        return (usuario.username.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1);
      }
    })
  }

  nome(){
    console.log();
    
  }

  seguir() {

  }
}
