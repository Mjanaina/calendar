import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private usuario: Usuario = {};
  private usuarioId: string = null;
  private usuarioSubs: Subscription;

  constructor(
    private usuarioServ: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.inicializar(params['id']);
    })
  }

  inicializar(id: string) {
    this.usuarioId = id;
console.log(this.usuarioId);

    if(this.usuarioId) this.loadUsuario();
  }

  loadUsuario() {
    this.usuarioSubs = this.usuarioServ.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    })
  }

}
