import { GetEndpointFunction } from './../api-routers/api-router/api-router-custom/api-custom-def';
import { CustomEndpointCode } from './../api-routers/api-router/custom-endpoint-code';
import { Component, OnInit } from '@angular/core';
import { PostEndpointFunction } from '../api-routers/api-router/api-router-custom/api-custom-def';
import { TabelServiceCode } from '../api-routers/service-generator';
import CustomSchema from '../api-schemas/custom-schema-model';
import {TableProductModel} from '../data/table-product-model';
import { modelClassGeneratorWhole } from './model-class-generator';

@Component({
  selector: 'app-database-models',
  templateUrl: './database-models.component.html',
  styleUrls: ['./database-models.component.css']
})
export class DatabaseModelsComponent {

  customSchemas:CustomSchema[] = [];

  tables:any[] = []

  wholeCode:string = ''

  schemaTextContent:string = ''



  customPostEndpoints:PostEndpointFunction[] = []
  customGetEndpoints:GetEndpointFunction[] = []


  postEndpointsToFinalize:CustomEndpointCode[] = []
  getEndpointsToFinalize:CustomEndpointCode[] = []



  codeTables:any[] = []

  tablesRoutes:TabelServiceCode[] = []

  addNew(){
    const id  = new Date().getTime()
    this.tables.push({id:id})
    this.codeTables.push({id:id})
  }

  update(data:TableProductModel){
    const pos = this.codeTables.indexOf((this.codeTables.filter(e => e.id === data.id)[0]))
    this.codeTables[pos] = data;
    this.wholeCode = modelClassGeneratorWhole(this.codeTables)
    
    
  }

  updateRouters(data:{tablesRoutes:TabelServiceCode[]}){
    this.tablesRoutes = data.tablesRoutes
  }

  remove(data:{id:any}){
    const pos = this.tables.indexOf(data)
    console.log("remove",pos);
    this.codeTables.splice(pos,1)
    this.tables.splice(pos,1)
  }

  get haveTables(){
    return this.tables.length >= 1
  }


  receiveDataFromSchema(d:any){
    this.schemaTextContent = d.code
  }



  acceptCustomSchemas(args:CustomSchema[]){
    this.customSchemas = args;
    console.log(this.customSchemas);
    
  }


  setPostEndpoints(posts:PostEndpointFunction[]){ 
   this.customPostEndpoints = posts;
   this.postEndpointsToFinalize = this.customPostEndpoints.map(e => {
     return {code:e.endpointCode,targetModel:e.endpointTargetModel}
   })
  }


  setGetEndpoints(getEndpoints:GetEndpointFunction[]){
    this.customGetEndpoints = getEndpoints;
    this.getEndpointsToFinalize = this.customGetEndpoints.map(e => {
      return {code:e.endpointCode,targetModel:e.endpointTargetModel}
    })
    console.log(this.getEndpointsToFinalize);
    
  }


  get customEndpointsData(){
    return [...this.postEndpointsToFinalize,...this.getEndpointsToFinalize]
  }



}
