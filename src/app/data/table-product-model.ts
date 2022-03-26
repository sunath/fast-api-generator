import { DatabaseForeginKey } from './../database-models/database-col-meta';
export default interface TableProductModel {
    id:number,
    columns:DatabaseExportColumn[],
    tablename:string,
    foreignKeys:DatabaseForeginKey[]
}

interface DatabaseExportColumn{
    id:number
    dtype:string
    isNullable:boolean
    isUnique:boolean
    name:string,
    defaultValue?:string
}