

import { LoadingService } from './loading/loading.service';
import { ApiBase } from './api/api-base.service';

import { ErrorHandlerService } from './error-handler/error-handler.service';
import { AuthService } from './auth/auth.service';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import {FuncionarioService} from "./funcionarios/funcionario.service";
import {RolesService} from "./funcionarios/roles.service";
import {DependenciesService} from "./funcionarios/dependencies.service";
import {ConstantesServices} from "./funcionarios/constantes.services";
import {MenuServices} from "./menu/menu.services";

export const SERVICES: any[] = [
    LoadingService,
    ApiBase,
    BreadcrumbService,
    ErrorHandlerService,
    AuthService,
    FuncionarioService,
    RolesService,
    DependenciesService,
    ConstantesServices,
    MenuServices
];
