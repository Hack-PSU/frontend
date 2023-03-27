export class ExtraCreditClassV3Model {
  public id: number;
  public name: string;

  static parseJSON(value: any): ExtraCreditClassV3Model {
    const model = new ExtraCreditClassV3Model();
    return Object.assign(model, value);
  }
}
