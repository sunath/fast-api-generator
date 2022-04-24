import { MatSelect } from '@angular/material/select';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosticReporter } from 'typescript';
import IApiEndPointChooserDataModel from '../api-router-endpoint-chooser-data-model';

@Component({
  selector: 'app-api-router-endpoint-chooser',
  templateUrl: './api-router-endpoint-chooser.component.html',
  styleUrls: ['./api-router-endpoint-chooser.component.css']
})
export class ApiRouterEndpointChooserComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ApiRouterEndpointChooserComponent>,@Inject(MAT_DIALOG_DATA) public data:IApiEndPointChooserDataModel) {}

  ngOnInit(): void {
  }

  close(x:MatSelect){
    this.dialogRef.close(x.value)
  }

}