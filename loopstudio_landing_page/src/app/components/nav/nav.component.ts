import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  mostrar = false;
  innerWidth = 0;

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth > 1000){
      this.mostrar = false;
    }
  }

  mostrarMenu(){
    this.mostrar = true;
  }

  fecharMenu(){
    this.mostrar = false;
  }
}
