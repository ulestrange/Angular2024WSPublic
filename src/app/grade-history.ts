export interface GradeHistory {
    _id?: string;
    student_id: number;  // Integer student ID
    class_id: number;    // Integer class ID
    scores: Score[];     // Array of scores
}

interface Score {
    type: 'exam' | 'quiz' | 'homework';  
    score: number;  
}
