

export interface Column{
    dtype:string,
    canUnqiue:boolean
}



export const ColumnTypes:Column[] = [
    {
        dtype:"Integer",
        canUnqiue:true
    },
    {
        dtype:"String",
        canUnqiue:true
    },
    {
        dtype:"Boolean",
        canUnqiue:false
    },
    {
        dtype:"Float",
        canUnqiue:true
    }
]