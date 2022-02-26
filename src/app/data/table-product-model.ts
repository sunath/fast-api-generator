export default interface TableProductModel {
    id:number,
    columns:DatabaseExportColumn[],
    tablename:string
}

interface DatabaseExportColumn{
    id:number
    dtype:string
    isNullable:boolean
    isUnique:boolean
    name:string,
    defaultValue?:string
}