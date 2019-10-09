import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UsuarioDto } from 'src/app/shared/domain/usuarioDto';


// tslint:disable-next-line: no-empty-interface
export interface LoginState extends EntityState<any> { }

export const loginAdapter: EntityAdapter<any> = createEntityAdapter<UsuarioDto>();

