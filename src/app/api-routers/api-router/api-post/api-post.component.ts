import { ActiveSchema } from './../active-schema';
import { TableProductModel } from 'src/app/data/table-product-model';
import { PostEndpointFunction } from './../api-router-custom/api-custom-def';
import { Component, Input, OnInit } from '@angular/core';
import { generateSchemasNames } from '../../api-schema-struc';
import CustomSchema from 'src/app/api-schemas/custom-schema-model';

@Component({
  selector: 'app-api-post',
  templateUrl: './api-post.component.html',
  styleUrls: ['./api-post.component.css']
})
export class ApiPostComponent implements OnInit {

  @Input('apiClass')
  apiClass!: PostEndpointFunction;

  @Input('tableProductModels')
  tablesProductModels!:TableProductModel[];

  @Input('customSchemas')
  customSchemas!:CustomSchema[];


  public schemaList:string[]  = []


  public schemaActiveList:ActiveSchema[] = []


  public nextSchemaVariableName:string = ""
  public nextSchemaName:string = ""

  constructor() { }

  ngOnInit(): void {
    if(this.tablesProductModels.length >= 1){
      if(this.customSchemas.length >= 1){
        this.schemaList = [...generateSchemasNames(this.tablesProductModels),...this.customSchemas.map(e => e.schemaName) ]
      }else{
        this.schemaList = [...generateSchemasNames(this.tablesProductModels) ]
      }
      }
  }


  reset():void{
    this.nextSchemaName = ''
    this.nextSchemaVariableName = ''
  }

  addSchema():void{
    this.schemaActiveList.push({variableName:this.nextSchemaVariableName,schemaName:this.nextSchemaName})
    this.reset()
    
  }

  deleteActiveSchema(e:ActiveSchema){
    this.schemaActiveList.splice(this.schemaActiveList.indexOf(e),1)
  }

}
