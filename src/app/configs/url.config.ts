import { environment } from "../../environments/environment";



export const UrlConfig = {
    Home: '',
    Management: 'management',
    HomeAdmin: 'admin',
    AdminUsers: 'admin.users',
    AdminLogUsers: 'admin.log.users',
    AdminBin: 'admin.bin',
    HomeTeacher: 'teacher',
    TeacherUsers: 'teacher.users',
    TeacherListQuiz: 'teacher.list.quiz',
    TeacherReport: 'teacher.report',
    TeacherStartQuiz: 'teacher.start.quiz',
    TeacherSetting: 'teacher.setting',
    HomeStudent: 'student',
    StudentProfile: 'student.profile',
    StudentQuizReady: 'student.quiz.ready',
    StudentQuizStart: 'student.quiz.start',
    StudentQuizScore:'student.quiz.score',
    StudentSetting:'student.settting',
    Signup: 'signup',
    Login: 'login',
};
export const baseUrlsignalr = environment.production? 'http://quickquiz.paramat.work/':'http://localhost:50262/';
export const baseUrl = environment.production? 'http://quickquiz.paramat.work/api':'http://localhost:50262/api';
export const baseUrlimg = environment.production? 'http://quickquiz.paramat.work/':'http://localhost:50262/';

// export const baseUrl = 'http://quickquiz.paramat.work/api';
// export const baseUrlimg = 'http://quickquiz.paramat.work/';