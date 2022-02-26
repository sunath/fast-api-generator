export interface DatabaseColumn {
    id:any
    isUnique:boolean
    isNullable:boolean
    dtype:string,
    name:string,
    defaultValue?:string
}