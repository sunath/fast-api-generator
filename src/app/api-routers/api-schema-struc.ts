import { TableProductModel } from 'src/app/data/table-product-model';
export const generateSchemasNames = (tableProductModels:TableProductModel[]) => {
    return tableProductModels.map(e => [`${e.tablename}Base`,`${e.tablename}In`,`${e.tablename}`]).reduce((p,v) => [...p,...v])
}