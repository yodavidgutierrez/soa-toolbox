// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const mockUrl = 'http://mock';

export const baseUrl = (<any> window).toolboxUrl;
export const host = (<any> window).host;

export const environment = {
  production: false,
   endPoints:{
    login:`${baseUrl}/login`,
    users:`${baseUrl}/users`,
    update_user:`${baseUrl}/users`,
    roles:`${baseUrl}/roles/roles`,
    update_roles:`${baseUrl}/users`,
    update_dependencias:`${mockUrl}/update_dependencias`,
    tiposDocIdent: `${host}/tipo-documento-gateway-api`,
    roles_user:`${baseUrl}/roles/roles`,
    dependencies:`${host}/dependencia-grupo-gateway-api/all-dependencias`,
    menu:`${baseUrl}/aplicaciones`,
    menu_edit:`${baseUrl}/aplicaciones`,
    application_user: `${mockUrl}/application_user`
  }


};
