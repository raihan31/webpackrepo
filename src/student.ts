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

    public getStudent(id: string): Student {
        let students:Student[] = Student.getStudents();
        return <Student> students.filter((student)=>{
            return id === student.id;
        })[0];
    }

    public static sortStudents(students: Student[]): Student[] {
        students.sort((a, b) =>{
            if(a.score > b.score)
                return 1;
            else if(a.score < b.score)
                return -1;
            else 
                return 0;
        });
        return students;
    }

    public static getStudents(): Student[] {
        let students: Student[] = [];
        if(JSON.parse(localStorage.getItem('students'))){
            console.log('true');
            let stnds = JSON.parse(localStorage.getItem('students'));
            for(let stdn of stnds) {
                students.push(new Student({id: stdn.id, name: stdn.name, score: stdn.score }))
            }
        }
        else {
            console.log('false');
            localStorage.setItem('students', null);
        }
        return students;
    }
}