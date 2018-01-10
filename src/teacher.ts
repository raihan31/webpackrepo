import {Person} from './person';

export class Teacher implements Person {
    name: string;
    constructor(data: Person){
        this.name = data.name
    }
}