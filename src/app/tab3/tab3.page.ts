import { Component } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private usuarios = new Array <Usuario>();
  private usuariosSubs: Subscription;
  private usuarioId: string = null
  private usuario = {};

  constructor(
    private fireauth: AngularFireAuth,
    private usuarioServ: UsuarioService,
    private router: Router
  ) {
    this.usuariosSubs = this.usuarioServ.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })

    this.filterUsuarios();
  }

  async filterUsuarios() {
    // const userUid = (await this.fireauth.currentUser).uid
  
    // for (let i = 0; i < this.usuarios.length; i++) {
    //     if (this.usuarios[i].uid === userUid) {
    //       this.usuarioId = this.usuarios[i].uid
    //       try {
    //        await this.usuarioServ.getUsuario(this.usuarioId);
    //       } catch(error) {
    //         console.log(error);
            
    //       }
    //     }
    // }
  }

  async logout() {
    try {
      await this.fireauth.signOut();
      this.router.navigate(['/login'])
    } catch(error) {
      console.log(error);
      
    }
  }

}
