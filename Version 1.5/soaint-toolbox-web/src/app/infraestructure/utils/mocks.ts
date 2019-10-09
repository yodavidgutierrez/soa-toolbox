import {isNullOrUndefined} from "util";

const usersList = [
  {
    id: 'soaint1',
    password: 'soaint1@',
    email: 'pepe@gmail.com',
    name: 'Pepe',
    "change_date": "2019-08-21T15:02:01.993Z",
    "creation_date": "2019-08-21T15:02:01.993Z",
    properties:{
        dependencias: [
          {
            codigo: '0020',
            nombre:'OTI',
            radicadora: false
          },
          {
            codigo: '0141',
            nombre:'Gestión Documental',
            radicadora: true
          }
        ]
     ,
        roles: [
          {
            id: 1,
            name: 'Administrador',
            idApplication:1
          },
          {
            id:2,
            name: 'Radicador',
            idApplication:1
          },
          {
            id:3,
            name: 'Archivista',
            idApplication:1
          },
          {
            id: 4,
            name: 'Proyector',
            idApplication:1
          },
          {
            id: 5,
            name: 'Revisor',
            idApplication:1
          },
          {
            id: 6,
            name: 'Aprobador',
            idApplication:1
          },
          {
            id: 7,
            name: 'Consultor',
            idApplication:1
          },
          {
            id: 8,
            name: 'Megaf',
            idApplication:2
          },
          {
            id: 9,
            name: 'Instrumento',
            idApplication:3
          },
          {
            id: 10,
            name: 'Digitalizador',
            idApplication:4
          },
        ]
      }

  },
  {
    id: 'soaint2',
    password: 'soaint2@',
    email: 'pepe@gmail.com',
    name: 'Pepe',
    "change_date": "2019-08-21T15:02:01.993Z",
    "creation_date": "2019-08-21T15:02:01.993Z",
    properties:{
      dependencias: [
        {
          codigo: '0020',
          nombre:'OTI',
          radicadora: false
        },
        {
          codigo: '0141',
          nombre:'Gestión Documental',
          radicadora: true
        }
      ]
      ,
      roles: [
        {
          id: 1,
          name: 'Administrador',
          idApplication:1
        },
        {
          id:2,
          name: 'Radicador',
          idApplication:1
        },
        {
          id:3,
          name: 'Archivista',
          idApplication:1
        },
        {
          id: 4,
          name: 'Proyector',
          idApplication:1
        },
        {
          id: 5,
          name: 'Revisor',
          idApplication:1
        },
        {
          id: 6,
          name: 'Aprobador',
          idApplication:1
        },
        {
          id: 7,
          name: 'Consultor',
          idApplication:1
        },
        {
          id: 8,
          name: 'Megaf',
          idApplication:2
        },
        {
          id: 9,
          name: 'Instrumento',
          idApplication:3
        },
        {
          id: 10,
          name: 'Digitalizador',
          idApplication:4
        },
      ]
    }
  },
  {
    id: 'soaint3',
    password: 'soaint3@',
    email: 'pepe@gmail.com',
    name: 'Pepe',
    "change_date": "2019-08-21T15:02:01.993Z",
    "creation_date": "2019-08-21T15:02:01.993Z",
    properties:{
      dependencias: [
        {
          codigo: '0020',
          nombre:'OTI',
          radicadora: false
        },
        {
          codigo: '0141',
          nombre:'Gestión Documental',
          radicadora: true
        }
      ]
      ,
      roles: [
        {
          id: 1,
          name: 'Administrador',
          idApplication:1
        },
        {
          id:2,
          name: 'Radicador',
          idApplication:1
        },
        {
          id:3,
          name: 'Archivista',
          idApplication:1
        },
        {
          id: 4,
          name: 'Proyector',
          idApplication:1
        },
        {
          id: 5,
          name: 'Revisor',
          idApplication:1
        },
        {
          id: 6,
          name: 'Aprobador',
          idApplication:1
        },
        {
          id: 7,
          name: 'Consultor',
          idApplication:1
        },
        {
          id: 8,
          name: 'Megaf',
          idApplication:2
        },
        {
          id: 9,
          name: 'Instrumento',
          idApplication:3
        },
        {
          id: 10,
          name: 'Digitalizador',
          idApplication:4
        },
      ]
    }
  },
  {
    id: 'soaint4',
    password: 'soaint4@',
    email: 'pepe@gmail.com',
    name: 'Pepe',
    "change_date": "2019-08-21T15:02:01.993Z",
    "creation_date": "2019-08-21T15:02:01.993Z",
    properties:{
      dependencias: [
        {
          codigo: '0020',
          nombre:'OTI',
          radicadora: false
        },
        {
          codigo: '0141',
          nombre:'Gestión Documental',
          radicadora: true
        }
      ]
      ,
      roles: [
        {
          id: 1,
          name: 'Administrador',
          idApplication:1
        },
        {
          id:2,
          name: 'Radicador',
          idApplication:1
        },
        {
          id:3,
          name: 'Archivista',
          idApplication:1
        },
        {
          id: 4,
          name: 'Proyector',
          idApplication:1
        },
        {
          id: 5,
          name: 'Revisor',
          idApplication:1
        },
        {
          id: 6,
          name: 'Aprobador',
          idApplication:1
        },
        {
          id: 7,
          name: 'Consultor',
          idApplication:1
        },
        {
          id: 8,
          name: 'Megaf',
          idApplication:2
        },
        {
          id: 9,
          name: 'Instrumento',
          idApplication:3
        },
        {
          id: 10,
          name: 'Digitalizador',
          idApplication:4
        },
      ]
    }
  },

];

const rolesList = [
  {
    id: 1,
    name: 'Administrador',
    idApplication:1
  },
  {
    id:2,
    name: 'Radicador',
    idApplication:1
  },
  {
    id:3,
    name: 'Archivista',
    idApplication:1
  },
  {
    id: 4,
    name: 'Proyector',
    idApplication:1
  },
  {
    id: 5,
    name: 'Revisor',
    idApplication:1
  },
  {
    id: 6,
    name: 'Aprobador',
    idApplication:1
  },
  {
    id: 7,
    name: 'Consultor',
    idApplication:1
  },
  {
    id: 8,
    name: 'Megaf',
    idApplication:2
  },
  {
    id: 9,
    name: 'Instrumento',
    idApplication:3
  },
  {
    id: 10,
    name: 'Digitalizador',
    idApplication:4
  },
];

export const dataSource = {
  login: params =>({
    id: params.login,
    password: params.password,
    email: 'pepe@gmail.com',
    name: 'Pepe',
    "change_date": "2019-08-21T15:02:01.993Z",
    "creation_date": "2019-08-21T15:02:01.993Z",
    properties:{
      token: 'wefewewfgtweew',
      dependencias: [
        {
          codigo: '0020',
          nombre:'OTI',
          radicadora: false
        },
        {
          codigo: '0141',
          nombre:'Gestión Documental',
          radicadora: true
        }
      ]
      ,
      roles: rolesList
    }
  }),
  users: (params?) => {

     return usersList.filter( u => {

        if(isNullOrUndefined(params))
           return true;

        if(!isNullOrUndefined(params.nombre) && u.name.indexOf(params.nombre.trim()) != 0 )
           return false;

       return true;
     });
  },
  update_user: params => params,
  roles:(payload) => rolesList.filter( r => !isNullOrUndefined(payload.idApplication) && r.idApplication == payload.idApplication),
  dependencias:[
    {
      codigo: '0020',
      nombre:'OTI',
      radicadora: false
    },
    {
      codigo: '0141',
      nombre:'Gestión Documental',
      radicadora: true
    },
    {
      codigo: '0021',
      nombre:'DEP1',
      radicadora: false
    },
  ],
  update_roles: params => params,
  update_dependencias: params => params,
  tiposDocIdent: {
    constantes:  [{
      codigo: 'TP-DOCC',
      codPadre: 'TP-DOC',
      nombre: 'Cédula de ciudadanía'
    },
      {
        codigo: 'TP-DOCE',
        codPadre: 'TP-DOC',
        nombre: 'Cédula de extranjería'
      },
      {
        codigo: 'TP-DOCP',
        codPadre: 'TP-DOC',
        nombre: 'Pasaporte'
      },
    ],
  },
  roles_user:params => {

    const user = usersList.find(u => u.id === params.id);

    if(isNullOrUndefined(user))
       return [];

    return user.properties.roles || [];


  },
  menus:[
    {
      idApplication: 1,
      visualizationName: "Soadoc",
      Accesslink: "link",
    },
    {
      idApplication: 2,
      visualizationName: "Digitlización",
      Accesslink: "link",
    },
    {
      idApplication: 3,
      visualizationName: "KPI",
      Accesslink: "link",
    },
    {
      idApplication: 4,
      visualizationName: "Toolbox",
      Accesslink: "link",
    }
  ],
  menu_edit:(payload) => payload
};
