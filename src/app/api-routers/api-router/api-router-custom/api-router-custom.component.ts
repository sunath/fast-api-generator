import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IApiEndPointChooserDataModel from '../api-router-endpoint-chooser-data-model';
import { ApiRouterEndpointChooserComponent } from '../api-router-endpoint-chooser/api-router-endpoint-chooser.component';
import { GetEndpointFunction, PostEndpointFunction } from './api-custom-def';

import {TableProductModel} from "../../../data/table-product-model";
import CustomSchema from 'src/app/api-schemas/custom-schema-model';

@Component({
  selector: 'app-api-router-custom',
  templateUrl: './api-router-custom.component.html',
  styleUrls: ['./api-router-custom.component.css']
})
export class ApiRouterCustomComponent implements OnInit {


  @Input('models') models:TableProductModel[] | undefined = []

  @Input('customSchemas')
  customSchemas!:CustomSchema[];

  constructor(public dialog:MatDialog) { }

  getEndpoints:GetEndpointFunction[] = []

  postEndpoints:PostEndpointFunction[] = []

  putEndpoints:string[] = []

  deleteEndpoints:string[] = []

  ngOnInit(): void {
  }


  openSelectEndPointDialog(){
    const data:IApiEndPointChooserDataModel = {
      types:["GET","POST","PUT","DELETE"],
      defaultType:"GET"
    }
      const x = this.dialog.open(ApiRouterEndpointChooserComponent,{
        data:data
      })

      x.afterClosed().subscribe(e => {
        this.queryTheSelectType(e)
      })
  }


  queryTheSelectType(e:string){
    switch(e){
      case "GET":
        this.getEndpoints.push(new GetEndpointFunction('unknown'+this.getEndpoints.length+1,""))
        break;
      case "POST":
        this.postEndpoints.push(new PostEndpointFunction('unknwown'+this.getEndpoints.length+1,""))
        break
      default:
        console.log("Hehe");
        
    }
  }

  checkVisibility(x:any[]):boolean{
    return x.length >= 1
  }



  deleteGetEndPoint(args:any){
    let index:number = this.getEndpoints.indexOf(args)
    if(index >= 0){
      this.getEndpoints.splice(index,1)
    }
  }

}
