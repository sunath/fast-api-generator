import { DatabaseColumn } from "./database-col-meta";



export function modelClassGenerator(details:DatabaseColumn[],tablename:string){



        let data = `from .database import Base
class ${tablename}(Base):
        __tablename__ = "${(tablename as string).toLowerCase()}"
        id = Column(Integer, primary_key=True, index=True)
`

    for(let detail of details){
        const modify = {...detail,isNullable:detail.isNullable ? 'True' : 'false',isUnqiue:detail.isUnqiue ? 'True' : 'False'};
        data+= `        ${modify.name} = Column(${modify.dtype}, unqiue=${modify.isUnqiue}, nullable=${modify.isNullable})\n`
    }

    return data
}

export function modelClassGeneratorWhole(tables:any[]){


    

    let data = `from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base
    
`

    for (let table of tables){
        let newData= `class ${table.tablename}(Base):
    __tablename__ = "${(table.tablename as string).toLowerCase()}"
    
    id = Column(Integer, primary_key=True, index=True)\n`

        console.log(table);
        

        for(let column of table.columns){
            console.log(column);
            
            const data:DatabaseColumn = column;
            const modify = {...column,isNullable:column.isNullable ? 'True' : 'False',isUnqiue:column.isUnqiue ? 'True' : 'False'};
            newData+=`    ${modify.name} = Column(${modify.dtype},unique=${modify.isUnqiue},nullable=${modify.isNullable})\n`

        }

        newData+="\n"
        data+=newData

    }

    return data
}