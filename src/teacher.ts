import {Person} from './person';

export class Teacher implements Person {
    id: string;
    name: string;
    constructor(data: Person){
        this.name = data.name
    }
}