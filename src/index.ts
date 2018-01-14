import { Person } from './person';
import { Teacher } from './teacher';
import { Student } from './student';

export class Main {
    constructor(){
        
    }

    studentRowGenerator(student: Student): string {
        let tmp = `<tr class="studentRow">
                <td>${student.name}</td>
                <td>${student.score}</td>
                <td>
                    <button class="btn btn-danger deleteClass" data-id="${student.id}" id="student-${student.id}">Delete</button>
                </td>
            </tr>`;
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
        if(students && students.length > 0){
            students.forEach((student) => {
                this.generateEventListener(element ,student);
            })
        }
    }

    generateEventListener(mainContent: any, student: Student){
        let selectorId = "#student-" + student.id
        let element = mainContent.querySelector(selectorId);
        element.addEventListener('click', function(ev: Event){
            let dataId = this.getAttribute("data-id");
            let studentRows = document.querySelector(".studentRows");
            let success = Student.deleteStudent(dataId.toString());
            if(success) {
                let indexClass = new Main();
                indexClass.populateData(studentRows); 
            }
            else {
                alert("Couldn't be deleted");
            }
        }, false);
    }
}

window.onload = () => {
    let mainContent = document.querySelector("#mainContent");
    let studentRows = mainContent.querySelector(".studentRows");
    let students = Student.getStudents();
    let mainObj = new Main();
    let flag = false;
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
        let student:Student = new Student({id: mainObj.guid(), name: name, score: score})
        Student.createStudent(student);
        mainObj.populateData(studentRows);
        mainObj.generateEventListener(mainContent, student);
        mainContent.querySelector("#studentTable").className = "row show";
        mainContent.querySelector("#formContent").className = "row hide";
    });

    let formCancel = mainContent.querySelector("#formCancel");

    formCancel.addEventListener('click', function(){
        mainContent.querySelector("#studentTable").className = "row show";
        mainContent.querySelector("#formContent").className = "row hide";
    });

    let sortStudent = mainContent.querySelector("#sortStudent");

    sortStudent.addEventListener('click', function(){
        flag = !flag;
        mainObj.populateData(studentRows, Student.sortStudents(Student.getStudents(), flag));
    });


};
