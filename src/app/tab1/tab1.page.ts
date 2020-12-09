import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/Interfaces/evento';
import { EventoService } from 'src/app/Services/evento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  private eventos = new Array<Evento>();
  private eventosSubs: Subscription;
  private eventoId: string = null;

  constructor(
    private eventoServ: EventoService
  ) {
    this.eventosSubs = this.eventoServ.getEventos().subscribe(data => {
      this.eventos = data;
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.eventosSubs.unsubscribe();
  }
}
