import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  private usuarios = new Array<Usuario>();
  private usuariosSubs: Subscription
  
  constructor(
    private usuarioServ: UsuarioService
  ) { 
    this.usuariosSubs = this.usuarioServ.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  async ngOnInit() {
  }

  ngOnDestroy() {
    this.usuariosSubs.unsubscribe();
  }
}
