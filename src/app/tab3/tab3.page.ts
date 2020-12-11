import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  private usuarios = new Array<Usuario>();
  private usuariosSubs: Subscription

  constructor(
    private usuarioServ: UsuarioService,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router
  ) { }

  async ngOnInit() {
    this.displayInfo();
    
  }

  

  ngOnDestroy() {
  }

  async displayInfo() {
    const nomeUser = document.querySelector('.nome_user')

    this.fireauth.onAuthStateChanged(user => {
      if (user) {
        const htmlName = `<h1> @${user.displayName} </h1>`
        nomeUser.innerHTML = htmlName
      } else {
        nomeUser.innerHTML = ''
      }
    })
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
