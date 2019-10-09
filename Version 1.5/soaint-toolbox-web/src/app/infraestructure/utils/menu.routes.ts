import {ExternalComponent} from "../../ui/components/pages/external/external.component";
import {Routes} from "@angular/router";

export const menuRoutes:Routes = [
  {
    path:'megaf',
    component: ExternalComponent,
    data:{
      url: 'http://localhost:8080/soaint-sgd-web_war',
      label:'Megaf',
      origin: 'http://localhost:8080',
      //rolesAllowed:[''], /* Definir roles para ver este link sino lo podrá ver cualquiera
    }
  },
  {
    path:'digitalizacion',
    component: ExternalComponent,
    data:{
      url: 'http://localhost:8080/soaint-sgd-web_war',
      label:'Digitalización',
      origin: 'http://localhost:8080',
      //rolesAllowed:[''], /* Definir roles para ver este link sino lo podrá ver cualquier
    }
  },
  {
    path:'instrumento',
    component: ExternalComponent,
    data:{
      url: 'http://localhost:8080/soaint-sgd-web_war',
      label:'Instrumentos',
      origin: 'http://localhost:8080',
      //rolesAllowed:[''], /* Definir roles para ver este link sino lo podrá ver cualquier
    }
  }
];
