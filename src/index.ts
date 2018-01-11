import { Person } from './person';
import { Teacher } from './teacher';
import { Student } from './student';

export class Main {
    constructor(){
        
    }

    createStudent(student: Student) {
        let students = Student.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    studentRowGenerator(student: Student): string {
        let tmp = `<tr class="studentRow" id="${student.id}">
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.score}</td>
            </tr>`
            console.log(tmp);
        return tmp;
    } 

    studentTableGenerator(students: Student[]): string {
        let rows: string = "";
        if (students && students.length > 0){
            students.forEach((student) => {
                rows += this.studentRowGenerator(student);
            });
        }
        else {
            rows = 'No Student Found. Please Add Some Students';
        }
        console.log(rows);
        return rows;
    } 

    guid(): string {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    populateData(element:any, students?: Student[]) {
        students = students || Student.getStudents(); 
        element.innerHTML = this.studentTableGenerator(students);
    }
}

window.onload = () => {
    let mainContent = document.querySelector("#mainContent");
    let studentRows = mainContent.querySelector(".studentRows");
    let students = Student.getStudents();
    let mainObj = new Main();
    mainObj.populateData(studentRows);
    let addStudent = mainContent.querySelector("#addStudent");
    addStudent.addEventListener('click', function(){
        (<HTMLInputElement>mainContent.querySelector('#name')).value = "";
        (<HTMLInputElement>mainContent.querySelector('#score')).value = null;
        mainContent.querySelector("#studentTable").className = "row hide";
        mainContent.querySelector("#formContent").className = "row show";
    });

    let formSubmitId = mainContent.querySelector("#formSubmit");

    formSubmitId.addEventListener('click', function(){
        let name = (<HTMLInputElement>mainContent.querySelector('#name')).value;
        let score = +(<HTMLInputElement>mainContent.querySelector('#score')).value;
        mainObj.createStudent(new Student({id: mainObj.guid(), name: name, score: score}));
        mainObj.populateData(studentRows);
        mainContent.querySelector("#studentTable").className = "row show";
        mainContent.querySelector("#formContent").className = "row hide";
    });

    let sortStudent = mainContent.querySelector("#sortStudent");

    sortStudent.addEventListener('click', function(){
        mainObj.populateData(studentRows, Student.sortStudents(Student.getStudents()));
    });

};
