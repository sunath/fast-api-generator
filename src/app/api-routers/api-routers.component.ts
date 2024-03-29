
import { AppDependModel } from './../depends/depend-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {TableProductModel} from '../data/table-product-model';

import { generateService, TabelServiceCode } from './service-generator';
import CustomSchema from '../api-schemas/custom-schema-model';
import { PostEndpointFunction, GetEndpointFunction } from './api-router/api-router-custom/api-custom-def';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-api-routers',
  templateUrl: './api-routers.component.html',
  styleUrls: ['./api-routers.component.css']
})
export class ApiRoutersComponent implements OnInit {

  tables:TableProductModel[]| undefined;

  customSchemas:CustomSchema[] = [];

  @Output('updateRoutes') updateRoutes = new EventEmitter();




  @Output('setPosts') setPosts = new EventEmitter<PostEndpointFunction[]>();
  @Output('setGetEndpoints') setGetEndpoints = new EventEmitter<GetEndpointFunction[]>()


  

  code:TabelServiceCode[] = []

  constructor(public dataService:DataService) { 
    this.tables  = dataService.tables
    this.customSchemas = dataService.customSchemas
  }

  ngOnInit(): void {
  }

  generate(){

    
    if(!this.tables)return;
    this.code = generateService(this.tables)
    this.updateRoutes.emit({tablesRoutes:this.code})
  }



  setCustomPosts(posts:PostEndpointFunction[]){
    this.setPosts.emit(posts)
  }


}
