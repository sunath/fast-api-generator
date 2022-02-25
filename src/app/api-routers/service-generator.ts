
import TableProductModel from "../data/table-product-model";


export interface TabelServiceCode{
    tablename:any
    code:string
}

export function generateService(codeTables:TableProductModel[]){



    let services:TabelServiceCode[] = []


    for (let table of codeTables){
    let initData = `
#view ${table.tablename}
from fastapi import APIRouter
import schemas
import models


api_router = APIRouter(prefix="${table.tablename.toLocaleLowerCase()}")

`   
initData+= getAllService(table.tablename)
initData += getQueryService(table.tablename)
initData += postService(table)
initData += deleteService(table.tablename)
initData += updateService(table.tablename,table)

        services.push({tablename:table.tablename,code:initData})

    }
return services

}


const getAllService = (tablename:string) => {
return`@api_router.get("/all")
async def getAll${tablename.toLocaleLowerCase()}s (db:Session = Depends(get_db)):
    return db.query(models.${tablename}).all()`
}

const getQueryService = (tablename:string) => {
return `
@api_router.get("/")
async def get${tablename}s(skip:int=0,limit:int=10,db:Session = Depends(get_db)):
    return db.query(models.${tablename}).offset(skip).limit(limit).all()`
}


const postService = (tableData:TableProductModel) => {
let data =  `
@api_router.post("/")
async def create${tableData.tablename.toLocaleLowerCase()} (${tableData.tablename}schema:schemas.${tableData.tablename}In,db:Session = Depends(get_db)):
`

 for(let col of tableData.columns){
     data+= createUniqueConditions(tableData.tablename,col.name)
 }

 data += `
    model = models.${tableData.tablename}(**${tableData.tablename}schema.dict())
    db.add(model)
    db.commit(model)
    db.refresh(model)
    return model
 `
 return data
}

const createUniqueConditions = (tablename:string,columnname:string) => {
   return `
    if db.query(model.${tablename}).filter(models${tablename}.${columnname} == ${tablename}schema.${columnname}).first():
        raise HTTPException(status_code=403,details="${tablename} already defined with that ${columnname}")
    `
}


const deleteService = (tablename:string) => {
    return `

@api_router.delete("/{id}")
async def delete${tablename}(id:int,db:Session = Depends(get_db)):
    if not db.query(models.${tablename}).filter(models.${tablename} == id).first():
        raise HTTPException(status_code=404,detail="${tablename} does not found with that id")
    db.query(models.${tablename}).filter(models.${tablename} == id).delete()
    db.commit()
    return {'isSuccess':True}`
}


const updateService = (tablename:string,table:TableProductModel) => {
 
    return`
@api_router.put("/{id}")
async def update${tablename.toLowerCase()}(id:int,${tablename}schema:schemas.${tablename}In,db:Session = Depends(get_db)):
    if not db.query(models.${tablename}).filter(models.${tablename}.id == id).first():
        raise HTTPException(status_code=404,detail="${tablename} does not found with that id")
    
    db.query(models.${tablename}).filter(models.${tablename}.id == id).update({${updateArgsCreator(table,tablename)}})
    db.commit()
    return db.query(models.${tablename}).filter(models.${tablename}.id == id).first()
    
`
}

const updateArgsCreator = (tableData:TableProductModel,tableName:string) => {
    let data = ``

    for(let i = 0 ; i < tableData.columns.length; i++){
        data+= `models.${tableName}.${tableData.columns[i].name}:${tableName}schema.${tableData.columns[i].name}` + (i+1 == tableData.columns.length ? "" : ",")
    }

    return data

}