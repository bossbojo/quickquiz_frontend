import { environment } from "../../environments/environment";



export const UrlConfig = {
    Home: '',
    Management: 'management',
    HomeAdmin: 'admin',
    AdminUsers: 'admin-users',
    AdminLogUsers: 'admin-log-users',
    AdminBin: 'admin-bin',
    HomeTeacher: 'teacher',
    TeacherUsers: 'teacher-users',
    HomeStudent: 'student',
    Signup: 'signup',
    Login: 'login',
};
export const baseUrl = environment.production? 'http://quickquiz.paramat.work/api':'http://localhost:51161/api';
export const baseUrlimg = environment.production? 'http://quickquiz.paramat.work/':'http://localhost:51161/';
