
abstract class ApiEndpoint {


    static nextId = 0;

    constructor(public endPointType:string,endpointName:string ,public id:number,public depends:string[] = []){
        this._endpointName = endpointName;
        ApiEndpoint.nextId +=1;
    }


    private _endpointName : string;
    public get endpointName() : string {
        return this._endpointName;
    }
    public set endpointName(v : string) {
        this._endpointName = v;
    }


    public abstract getEndPointString():string;

}


export class GetEndpointFunction extends ApiEndpoint{

       

    constructor(endpointName:string){
        super('GET',endpointName,ApiEndpoint.nextId,)
    }

    public override getEndPointString(): string {
        return ''
    }

    public addDepend(dependName:string){
        this.depends.push(dependName)
    }
}


export class PostEndpointFunction extends ApiEndpoint{

    constructor(endpointName:string){
        super('POST',endpointName,ApiEndpoint.nextId)
    }

    public getEndPointString(): string {
        return '';
    }

}