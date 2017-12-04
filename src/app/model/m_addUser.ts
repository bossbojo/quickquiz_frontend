export class m_addUser{
    constructor(username:string, password:string,user_type:number){
        this.username = username
        this.password = password
        this.user_type = user_type
    }
    username:string
    password:string
    user_type:number
}