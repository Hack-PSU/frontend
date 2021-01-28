export class ProjectModel {
  public categories: string[];
  public projectId: string;
  public projectName: string;
  public tableNumber: number;

  static parseFromJSON(json) {
    if (JSON.stringify(json) === '{}') {
      return null;
    }
    const project = new ProjectModel();
    project.categories = json.categoryName;
    project.projectId = json.projectID;
    project.tableNumber = json.tableNumber;
    project.projectName = json.projectName;
    return project;
  }
}
