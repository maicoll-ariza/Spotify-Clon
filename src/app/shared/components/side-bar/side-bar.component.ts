import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
   mainMenu: { defaulOptions: Array<any>, accessLink: Array<any>} = {defaulOptions: [], accessLink:[]}

   customOptions: Array<any> = []
  constructor() { }

  ngOnInit(): void {

    this.mainMenu.defaulOptions=[
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: {hola: 'mundo'}
      }
      
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]

    this.customOptions=[
      {
        name: 'Mi lista °1',
        router:['/']
      },
      {
        name: 'Mi lista °2',
        router:['/']
      },
      {
        name: 'Mi lista °3',
        router:['/']
      },
      {
        name: 'Mi lista °4',
        router:['/']
      },
    ]








  }

}
