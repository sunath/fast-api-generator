
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IApiEndPointChooserDataModel from '../api-router-endpoint-chooser-data-model';
import { ApiRouterEndpointChooserComponent } from '../api-router-endpoint-chooser/api-router-endpoint-chooser.component';
import { GetEndpointFunction, PostEndpointFunction } from './api-custom-def';

@Component({
  selector: 'app-api-router-custom',
  templateUrl: './api-router-custom.component.html',
  styleUrls: ['./api-router-custom.component.css']
})
export class ApiRouterCustomComponent implements OnInit {

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
        this.getEndpoints.push(new GetEndpointFunction('unknown'+this.getEndpoints.length+1))
        break;
      default:
        console.log("Hello");
    }
  }

  checkVisibility(x:any[]):boolean{
    return x.length >= 1
  }

}
