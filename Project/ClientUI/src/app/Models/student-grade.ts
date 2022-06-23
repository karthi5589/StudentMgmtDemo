export interface GradeData{
  id: number,
  name: string,
  subjects: SubjectData[]
}

export interface SubjectData{
  id: number,
  name: string
}

export interface ScoreData{
  gradeId: number,
  gradeName: string,
  subjectId: number,
  subjectName: string,
  score: string
}

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
