import {RolDTO} from "../../../../../../shared/domain/rolesDTO";

export interface UserProfile {
  id?:any;
  name: string;
  email: string;
  username:string;
  password: string;
  roles: Array<RolDTO>;
}
