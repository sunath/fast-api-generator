import { AppDependModel, AppFunction } from './../../../depends/depend-model';
import { buildFullGetDefVersion, generateGetFunction, IApiGetQueryParam } from './api-get-func';
import  TableProductModel  from 'src/app/data/table-product-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetEndpointFunction } from '../api-router-custom/api-custom-def';
import createDBDepend from '../../db-depend';
import { ColumnTypes } from 'src/app/data/col-types';
import { FilterActions } from '../api-actions';
import { IApiGetFunctionStep } from './get_depend_func-model';

@Component({
  selector: 'app-api-get',
  templateUrl: './api-get.component.html',
  styleUrls: ['./api-get.component.css']
})
export class ApiGetComponent implements OnInit {

  @Input('models') models:TableProductModel[]  | undefined = []
  public newModels:TableProductModel[] = []
  public nextQueryPram:string = '';
  public nextQueryPramType:string = 'int'
  public queryPrams:IApiGetQueryParam[] = []
  public code = ''
  public dbDepend:AppDependModel;
  public currentFunctions:AppFunction[] = [];
  public nextFunctionListFrom:string = ""
  public targetModel?:TableProductModel;
  public targetModelName:string = ''
  public columsDTypes = ColumnTypes;
  public compareTypes =  FilterActions;
  public nextFilterLeft:string = ""
  public nextFilterRight:string = ""
  public nextFilterSign:string  = ""
  public steps:IApiGetFunctionStep[] = []

  @Input('apiClass') apiClass!:GetEndpointFunction;


  public bigStpes:IApiGetFunctionStep[][] = []


  @Output('deleteGetEndPointMethod') deleteGetEndPointMethod = new EventEmitter();


  constructor() { 
    this.dbDepend = createDBDepend('db');
    this.reset()
   

  }

  private reset(){
    
    this.currentFunctions = this.dbDepend.functions;
    this.nextFunctionListFrom = ''
  }

  ngOnInit(): void {
    if(this.models){
      this.newModels = this.models;
      this.newModels = this.models.map(e => ({...e,columns:[...e.columns,{
        dtype:'Integer',
        isUnique:true,
        isNullable:false,
        name:'id',
        id:new Date().getMilliseconds()
      }]}))
    }
  }


  addNewPram(){
    this.queryPrams.push({name:this.nextQueryPram,type:this.nextQueryPramType})
    this.nextQueryPram = ''
    this.nextQueryPramType = 'int'
  }


  deleteQuery(name:string){
    const index = this.queryPrams.indexOf(this.queryPrams.filter(e => e.name == name)[0])
    this.queryPrams.splice(index,1)
  }


  generateCode(){

    this.code = generateGetFunction(this.queryPrams,this.apiClass)
    this.code = buildFullGetDefVersion(this.code,this.steps,this.targetModel?.tablename || 'Model(N)',this.bigStpes.length >= 1 ? this.bigStpes : undefined)

  }


  nextFunctions(e:string,args?:any){

    if(e === 'query'){
        this.targetModel = this.newModels?.filter(x => x.tablename == this.targetModelName)[0]
        this.steps.push({name:e,args:this.targetModel})
        this.toNextFunctionlist(e)
    }else if(e == 'filter'){
      this.steps.push({name:e,args:{
        leftSide: this.targetModel?.columns.filter(e => e.name == this.nextFilterLeft)[0] || this.targetModel?.foreignKeys.filter(e => e.column_name == this.nextFilterLeft)[0],
        rightSide: this.nextFilterRight,
        compareBy: this.nextFilterSign
      }})
      this.toNextFunctionlist(e)
    }else{
      this.steps.push({name:e})
      this.bigStpes.push(this.steps)
      this.steps = []
      this.reset()
    }



  }


  private  toNextFunctionlist(e:string){
    this.currentFunctions = this.currentFunctions.filter(x => x.functionName == e)[0].functions
    this.nextFunctionListFrom = ''
  }


  get availableProps(){
    return [...this.targetModel?.columns.map(e => e.name) || [],...this.targetModel?.foreignKeys.map(e => e.column_name) || []]
  }

  get compareWith(){
    const model = this.targetModel?.columns.filter(e => e.name == this.nextFilterLeft)[0];

    if(model)return this.queryPrams.filter(e => e.type === model.dtype)
    else return this.queryPrams
  } 


  printSteps(){
    console.log(this.steps);
    
  }

  removeSelf(){
    this.deleteGetEndPointMethod.emit(this.apiClass)
  }



  logBigSteps(){
    console.log(this.bigStpes);
    
  }
}
