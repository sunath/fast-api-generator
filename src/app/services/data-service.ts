import { Injectable } from '@angular/core';
import CustomSchema from '../api-schemas/custom-schema-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public config:any;
  public tables:any;
  public customSchemas:CustomSchema[] = [];
  public routes:any;
  public tableServices:any;

  constructor() { }


  setConfig(data:any) {
    this.config = data;
  }

  setTables(data:any){
    this.tables = data;
  }

  setSchemas(data:any){
    this.customSchemas = data
  }

  setRoutes(data:any){
    this.routes = data
  }
}
