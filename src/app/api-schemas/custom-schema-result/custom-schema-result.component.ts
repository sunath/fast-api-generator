import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-schema-result',
  templateUrl: './custom-schema-result.component.html',
  styleUrls: ['./custom-schema-result.component.css']
})
export class CustomSchemaResultComponent implements OnInit {


  @Input('fields') fields:string[] = []

  constructor() { }

  ngOnInit(): void {
  }


  removeFromList(name:string){
    const index = this.fields.indexOf(name);
    this.fields.splice(index,1)
  }

}
