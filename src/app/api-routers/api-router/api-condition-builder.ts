import { TableProductModel } from 'src/app/data/table-product-model';
import { IApiFunctionStep } from './depend_function_model';



export interface FilterCondition{
    action:string,
    leftside:string
    rightSide:string
}


export const buildConditions = (steps:IApiFunctionStep[][]) => {
   return  steps.map(e => {
       return `db`+ e.map(x => {
            switch(x.name){
                case 'query':
                    const table:TableProductModel = x.args
                    return `.query(models.${table.tablename})`
                case 'filter':
                    const args:FilterCondition = x.args;
                    return `.filter(mdels.${args.leftside}.${args.action}${args.rightSide})`

                default:
                    return ``
            }
        }).reduce((e,i) => e+i)
    })
}