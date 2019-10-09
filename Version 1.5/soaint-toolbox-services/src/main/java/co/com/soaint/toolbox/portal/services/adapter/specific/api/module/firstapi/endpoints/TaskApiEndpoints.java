package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.endpoints;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TaskApiEndpoints {

    @Value("${soadoc.funcionario.servicio.buscar}")
    public String ENDPOINT_FUNCIONARIO_BUSCAR;

    @Value("${soadoc.funcionario.servicio.actualizarRolFuncionario}")
    public String ENDPOINT_FUNCIONARIO_ACTUALIZAR_ROL;

    @Value("${soadoc.correspondencia.servicio.listarUsuarioPorRol}")
    public String ENDPOINT_CORRESPONDENCIA_LISTARUSUARIOPORROL;

    @Value("${soadoc.correspondencia.servicio.actualizarusuario}")
    public String ENDPOINT_CORRESPONDENCIA_ACTUALIZAR_USUARIO;

    @Value("${soadoc.correspondencia.servicio.asociarDependencia}")
    public String ENDPOINT_CORRESPONDENCIA_DEPENDENCIA_CODIGO;

    @Value("${soadoc.funcionario.servicio.verificarCredenciales}")
    public String ENDPOINT_FUNCIONARIO_VERIFICAR_CREDENCIALES;

    @Value("${soadoc.application.servicio.buscar}")
    public String ENDPOINT_APPLICATION_BUSCAR;

    @Value("${soadoc.application.servicio.listar}")
    public String ENDPOINT_APPLICATION_LISTAR;

    @Value("${soadoc.application.servicio.actualizar}")
    public String ENDPOINT_APPLICATION_ACTUALIZAR;

    @Value("${roles.soadoc}")
    public String ENDPOINT_APPLICATION_LISTARROLPORIDAPPLICATION;

}
