export interface IParent {
  born: number,
  died: number,
  fatherName?: string,
  motherName?: string,
  name: string,
  sex: string,
  slug: string,
}

export interface ITable {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName?: string,
  motherName?: string,
  father?: IParent,
  mother?: IParent,
  slug: string,
  localeCompare(person: ITable): number;
}
