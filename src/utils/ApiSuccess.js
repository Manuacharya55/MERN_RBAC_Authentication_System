
export default class ApiSuccess{
    constructor(stausCode=200,data,message){
        this.success = true;
        this.stausCode = stausCode;
        this.data = data;
        this.message = message
    }
}