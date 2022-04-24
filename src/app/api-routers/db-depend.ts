import { AppDependModel, AppFunction } from './../depends/depend-model';




function createDefaultFilter(functions:AppFunction[]){
    return new AppFunction('filter',{
        haveArgs:true
    },functions)
}


export default function createDBDepend(variabelName:string){


    let all = new AppFunction('all',{haveArgs:false},[])
    let first = new AppFunction('first',{haveArgs:false},[])

    let filter_ = new AppFunction('filter',{
        haveArgs:true
    },[
        all,first,createDefaultFilter([all,first,
            createDefaultFilter([all,first])
        ])
    ])
    let filter = new AppFunction('filter',{haveArgs:true},[
        filter_,
        all,
        first
    ])

    let query = new AppFunction('query',{haveArgs:true},[
        all,
        first,
        filter
    ])

    let app = new AppDependModel('get_db',variabelName,[
        query
    ])

    return app;
}