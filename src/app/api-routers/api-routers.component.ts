import { Component, Input, OnInit } from '@angular/core';
import TableProductModel from '../data/table-product-model';
import { generateService, TabelServiceCode } from './service-generator';

@Component({
  selector: 'app-api-routers',
  templateUrl: './api-routers.component.html',
  styleUrls: ['./api-routers.component.css']
})
export class ApiRoutersComponent implements OnInit {

  @Input('tables') tables:TableProductModel[]| undefined;

  code:TabelServiceCode[] = []

  constructor() { }

  ngOnInit(): void {
  }

  generate(){

    if(!this.tables)return;
    this.code = generateService(this.tables)
    
  }

}
