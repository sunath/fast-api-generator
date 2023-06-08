import { DatabaseColumn, DatabaseForeginKey } from "./database-col-meta";



export function modelClassGenerator(details:DatabaseColumn[],tablename:string,foreignKeys:DatabaseForeginKey[]){



        let data = `from database import Base
class ${tablename}(Base):
        __tablename__ = "${(tablename as string).toLowerCase()}"
        id = Column(Integer, primary_key=True, index=True)
`

    for(let detail of details){
        const modify = {...detail,isNullable:detail.isNullable ? 'True' : 'false',isUnqiue:detail.isUnique ? 'True' : 'False'};

        if(detail.dtype === "DateTime"){

            data+= `        ${modify.name} = Column(DateTime(timezone=True), unqiue=${modify.isUnqiue}, nullable=${modify.isNullable},server_default=func.now())\n`

        }else{

        data+= `        ${modify.name} = Column(${modify.dtype}, unqiue=${modify.isUnqiue}, nullable=${modify.isNullable})\n`
        
    }

    if(foreignKeys.length >= 1){
    data+=  mapForeignKeysToDatabase(foreignKeys,2).reduce((x,v) => x+"\n"+v);
    }

}
    return data
}


const mapForeignKeysToDatabase =  (keys:DatabaseForeginKey[],tabs:number=1) => {
    const blanks = new Array(tabs*4).fill(" ").reduce((e,v) => e+v)
    return keys.map(e => blanks+`${e.column_name} = Column(ForeignKey("${e.table_name.toLowerCase()}.id",ondelete="CASCADE"),nullable=False)`)
}

export function modelClassGeneratorWhole(tables:any[]){


    // console.log(tables,"test for 2");
    
    

    let data = `from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float,func,DateTime
from sqlalchemy.orm import relationship
from database import Base
    
`

    for (let table of tables){
        let newData= `class ${table.tablename}(Base):
    __tablename__ = "${(table.tablename as string).toLowerCase()}"
    
    id = Column(Integer, primary_key=True, index=True)\n`

        // console.log(table);
        

        for(let column of table.columns){
            // console.log(column);
            
            const data:DatabaseColumn = column;
            const modify = {...column,isNullable:column.isNullable ? 'True' : 'False',isUnqiue:column.isUnqiue ? 'True' : 'False'};
            if(column.dtype === "DateTime"){
            newData+=`    ${modify.name} = Column(DateTime(timezone=True),unique=${modify.isUnqiue},nullable=${modify.isNullable},server_default=func.now())\n`
            }else{
                newData+=`    ${modify.name} = Column(${modify.dtype},unique=${modify.isUnqiue},nullable=${modify.isNullable})\n`
            }
        }

        if(table.foreignKeys.length >= 1){
            newData+=mapForeignKeysToDatabase(table.foreignKeys).reduce((e,v) => e+"\n"+v)
            newData+="\n"
        }



        newData+="\n"
        data+=newData

    }

    return data
}