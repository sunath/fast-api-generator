import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],


  animations:[
  ]
})
export class HeaderComponent implements OnInit {



  public isToggledButtonShow = false;

  @Input('headerMobileResponsive') headerMobileResponsive:number = 900;


  isNavbarToggled:boolean = false;


  headerCurrentWidth:number;

  constructor() { 
    this.headerCurrentWidth = window.innerWidth ;
    this.onResized(this.headerCurrentWidth)
    window.addEventListener('resize',() => {
      this.onResized(window.innerWidth)
    })
  }

  get CurrentState(){
    return (window.innerWidth >= this.headerMobileResponsive + 1 ) || this.isNavbarToggled
  }

  toggleNavItems(){
    this.isNavbarToggled = !this.isNavbarToggled;
  }

  onResized(currentWindowHeight:number){
      // this.isToggledButtonShow = currentWindowHeight <= this.headerMobileResponsive;
      const newState = currentWindowHeight <= this.headerMobileResponsive;

      if(!newState){
        this.isNavbarToggled = false;
      }
      this.isToggledButtonShow = newState;
  }

  ngOnInit(): void {
  }

}
