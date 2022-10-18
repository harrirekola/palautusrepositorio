interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

interface CourseNormalPart extends CourseDescriptionPart {
    type: "normal";
  }

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

interface CourseSubmissionPart extends CourseDescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
  }

interface CourseDescriptionPart extends CoursePartBase {
    description: string
}

interface CourseRequirementPart extends CourseDescriptionPart {
    type: "special",
    requirements: Array<string>

}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart;