import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import TableProductModel from '../data/table-product-model';
import { makeAPISchema } from './api-schemas-generator';

@Component({
  selector: 'app-api-schemas',
  templateUrl: './api-schemas.component.html',
  styleUrls: ['./api-schemas.component.css']
})
export class ApiSchemasComponent implements OnInit {


  @Input('tables') tables:TableProductModel[]| undefined;


  @Output('receiveSchemaFile') receiveSchemaFile = new EventEmitter()

  constructor() { }


  code:string = ""

  ngOnInit(): void {
    console.log(this.tables);
    
  }

  generate(){
    if(!this.tables)return;
    this.code = makeAPISchema(this.tables)
    this.receiveSchemaFile.emit({code:this.code})
    
  }


}
