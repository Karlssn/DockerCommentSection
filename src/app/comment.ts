export class Comment{
    Text:string;
    Person:string;
    Timestamp:string;
    constructor(Text,Person,time){
        this.Text = Text;
        this.Person = Person;
        this.Timestamp = time;
    }
}