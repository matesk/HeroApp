import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesServices.getHeroeById(id))
        )
        .subscribe(heroe => this.heroe = heroe);
    }
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {

      this.heroesServices.updateHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackBar('Registro actualizado'));
    } else {
      this.heroesServices.addHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnackBar('Registro creado');
          this.router.navigate(['/heroes/editar', heroe.id]);
        })
    }
  }

  eliminar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.heroesServices.deleteHeroe(this.heroe.id!)
          .subscribe(resp => {
            this.router.navigate(['/heroes']);
          });
      }
    });
  }

  mostrarSnackBar(msj: string) {
    this.snackBar.open(msj, 'Ok!', {
      duration: 2500
    });
  }


}
