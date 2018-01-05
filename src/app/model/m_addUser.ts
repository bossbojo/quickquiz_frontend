export class m_addUser{
    constructor(username:string, password:string,user_type:number,user_id:number){
        this.username = username
        this.password = password
        this.user_type = user_type
        this.user_id = user_id
    }
    user_id:number
    username:string
    password:string
    user_type:number
}