import { Component, OnInit } from '@angular/core';
import { modelClassGeneratorWhole } from './model-class-generator';

@Component({
  selector: 'app-database-models',
  templateUrl: './database-models.component.html',
  styleUrls: ['./database-models.component.css']
})
export class DatabaseModelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  tables:any[] = []

  wholeCode:string = ''


  codeTables:any[] = []

  addNew(){
    const id  = new Date().getTime()
    this.tables.push({id:id})
    this.codeTables.push({id:id})
  }

  update(data:any){
    const pos = this.codeTables.indexOf((this.codeTables.filter(e => e.id === data.id)[0]))
    this.codeTables[pos] = data;
    this.wholeCode = modelClassGeneratorWhole(this.codeTables)
    console.log(this.codeTables)
    
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



}
