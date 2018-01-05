export class m_addUniversity {
    constructor(FullWord:string,Abbreviation:string) {
        this.FullWord = FullWord;
        this.Abbreviation  = Abbreviation;
    }
    FullWord: string;
    Abbreviation: string;
}
export class m_addFaculty {
    constructor(FullWord:string,Abbreviation:string) {
        this.FullWord = FullWord;
        this.Abbreviation  = Abbreviation;
    }
    FullWord: string;
    Abbreviation: string;
}
export class m_addMajor {
    constructor(FullWord:string,Abbreviation:string,Faculty:string) {
        this.FullWord = FullWord;
        this.Abbreviation  = Abbreviation;
        this.Faculty = Faculty;
    }
    FullWord: string;
    Abbreviation: string;
    Faculty:string;
}