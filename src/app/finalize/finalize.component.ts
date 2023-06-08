import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomEndpointCode } from '../api-routers/api-router/custom-endpoint-code';
import { TabelServiceCode, generateService } from '../api-routers/service-generator';
import {TableProductModel} from '../data/table-product-model';
import { createMainFile } from './main-file.generator';
import { DataService } from '../services/data-service';
import { createDatabaseCode } from '../database-config/db_file_generator';
import { modelClassGenerator, modelClassGeneratorWhole } from '../database-models/model-class-generator';
import { makeAPISchema } from '../api-schemas/api-schemas-generator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.css']
})
export class FinalizeComponent implements OnInit {


 tables:TableProductModel[] = [];


  routes:TabelServiceCode[] = []


  modelsCode:string = ""
  schemasCode:string = ""


  @Input('customEndpointCodes') customEndpointCodes:CustomEndpointCode[] = []


  mainFileContent:string = ""


  dbFileContent:string = ""

  codes:TabelServiceCode[]  = []

  constructor(public dataService:DataService,private router:Router) { 


    try{

      this.tables = this.dataService.tables || []
      this.dbFileContent = createDatabaseCode(this.dataService.config)
      this.modelsCode = modelClassGeneratorWhole(this.tables)
      this.schemasCode = makeAPISchema(this.tables)
      this.routes = generateService(this.tables)

      this.generate()

    }catch(ex){
      this.router.navigate([''])
    }
      

  }

  ngOnInit(): void {
  }


  generate(){
    this.mainFileContent = createMainFile(generateService(this.tables))
  }


   getTableCode(tablename:string){

    const data = this.customEndpointCodes.filter(e => e.targetModel = tablename).map(e => e.code)

    if(data.length >= 1){
      return data.reduce((p,v) =>  "\n"+p+v+"\n")
    }

    return ''
  }
}
