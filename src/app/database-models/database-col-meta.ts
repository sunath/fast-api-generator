export interface DatabaseColumn {
    id:any
    isUnique:boolean
    isNullable:boolean
    dtype:string,
    name:string,
    defaultValue?:string
}


export interface DatabaseForeginKey {
    table_name:string,
    column_name:string
    
}