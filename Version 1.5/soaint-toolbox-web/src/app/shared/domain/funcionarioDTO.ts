export interface FuncionarioDTO {
  id: string;
  email?: string;
  loginName:string;
  name:string;
  password?: string;
  change_date?:string;
  creation_date?:string;
  properties: any;
}


