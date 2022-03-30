
abstract class ApiEndpoint {


    static nextId = 0;

    endpointName:string;


    endpointPathUrl:string = "";
    

    constructor(public endPointType:string,endpointName:string ,public endpointTargetModel:string,public id:number,public depends:string[] = []){
        this.endpointName = endpointName;
        ApiEndpoint.nextId +=1;
    }


   


    public abstract getEndPointString():string;

}


export class GetEndpointFunction extends ApiEndpoint{

       

    constructor(endpointName:string,endpointTargetModel:string){
        super('GET',endpointName,endpointTargetModel,ApiEndpoint.nextId)
    }

    public override getEndPointString(): string {
        return ''
    }

    public addDepend(dependName:string){
        this.depends.push(dependName)
    }
}


export class PostEndpointFunction extends ApiEndpoint{

    constructor(endpointName:string,endpointTargetModel:string){
        super('POST',endpointName,endpointTargetModel,ApiEndpoint.nextId)
    }

    public getEndPointString(): string {
        return '';
    }

}