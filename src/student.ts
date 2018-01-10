import { Person } from './person'

export class Student implements Person {
    name: string;
    score: number;
    constructor(data: Person){
        this.name = data.name;
        this.score = data.score;
    }
}