import { Person } from './person'

export class Student implements Person {
    id: string;
    name: string;
    score: number;
    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.score = data.score;
    }

    getStudent(id: string): Student {
        let students:Student[] = Student.getStudents();
        return <Student> students.filter((student)=>{
            return id === student.id;
        })[0];
    }

    static createStudent(student: Student) {
        let students = Student.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    static sortStudents(students: Student[], flag: boolean): Student[] {
        students.sort((a, b) =>{
            if(a.score > b.score)
                return flag ?  1 : -1;
            else if(a.score < b.score)
                return flag ?  -1 : 1;
            else 
                return 0;
        });
        return students;
    }

    static getStudents(): Student[] {
        let students: Student[] = [];
        if(JSON.parse(localStorage.getItem('students'))){
            let stnds = JSON.parse(localStorage.getItem('students'));
            for(let stdn of stnds) {
                students.push(new Student({id: stdn.id, name: stdn.name, score: stdn.score }))
            }
        }
        else {
            localStorage.setItem('students', null);
        }
        return students;
    }

    static deleteStudent(id: string): boolean {
        let students: Student[] = Student.getStudents();
        let tempStdn: Student[] = [];
        let flag: boolean = false;
        students.forEach((student)=>{
            if (id !== student.id){
                tempStdn.push(student);
            }
            else {
                flag = true;
            }
        });
        localStorage.setItem('students', JSON.stringify(tempStdn));
        return flag;
    }
}