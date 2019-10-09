package co.com.soaint.toolbox.portal.services.web.api.rest.user.v1.impl;

import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.CorrespondenciaApiCliente;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.FuncionarioApiCliente;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.commons.constants.api.user.EndpointUserApi;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.CredencialesDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import co.com.soaint.toolbox.portal.services.configuration.KeyManagerConfiguration;
import co.com.soaint.toolbox.portal.services.web.api.rest.user.v1.UserApi;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.HttpHeaders;
import java.math.BigInteger;
import java.util.List;
import static javax.ws.rs.core.HttpHeaders.AUTHORIZATION;

@Log4j2
@RestController
@RequestMapping(value = EndpointUserApi.USER_API)
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class SoadocUserApiImp implements UserApi {


    final private FuncionarioApiCliente funcionarioApiCliente;

    final private CorrespondenciaApiCliente correspondenciaApiCliente;

    @Autowired
    public SoadocUserApiImp(FuncionarioApiCliente funcionarioApiCliente, CorrespondenciaApiCliente correspondenciaApiCliente) {
        this.funcionarioApiCliente = funcionarioApiCliente;
        this.correspondenciaApiCliente = correspondenciaApiCliente;

    }

    @GetMapping(EndpointUserApi.FIND_USER_BY_ID)
    public UserDTO findUserById(@PathVariable("id_user") final String loginName, HttpServletRequest request) {
        log.info("Buscando User por id: " + loginName);
        List<UserDTO> lista = funcionarioApiCliente.buscarFuncionarios(FuncionarioDTO.builder().loginName(loginName).build());
        return lista.size() == 0 ? UserDTO.builder().build() : lista.get(0);

    }

    @GetMapping(EndpointUserApi.LIST_USERS)
    public List<UserDTO> listUsers(HttpServletRequest request) {
        log.info("Listando Users.");
        List<UserDTO> userDTO = funcionarioApiCliente.buscarFuncionarios(FuncionarioDTO.builder().build());
        return userDTO;

    }

    @PutMapping(EndpointUserApi.UPDATE_USER_ROLES)
    public List<RoleDTO> updateUserRol(@PathVariable("id_user") final BigInteger id, @RequestBody List<RoleDTO> roles,
                                       HttpServletRequest request) {
        log.info("Actualizando Rol de usuario: " + id);
        List<RoleDTO> roleDTO = correspondenciaApiCliente.actualizarRolesFuncionario(id, roles);
        return roleDTO;
    }

    @PostMapping(EndpointUserApi.LOGIN)
    public ResponseEntity<UserDTO> login(@PathVariable("login_name") final String loginName, @RequestBody CredencialesDTO credencialesDTO,
                         HttpServletRequest request) {
        log.info("Login: " + loginName);
        credencialesDTO.setLoginName(loginName);
        funcionarioApiCliente.verificarCredenciales(credencialesDTO);
        UserDTO userDTO = funcionarioApiCliente.buscarFuncionarios(FuncionarioDTO.builder().loginName(loginName).build()).get(0);
        KeyManagerConfiguration km = KeyManagerConfiguration.getInstance();
        String token = km.issueToken(loginName,request.getRequestURI());
        userDTO.getProperties().put("token", token);

        return ResponseEntity.ok().header(AUTHORIZATION, "Bearer " + token).body(userDTO);
    }

    @PutMapping(EndpointUserApi.UPDATE_USER)
    public UserDTO actualizarUsuarioById(@PathVariable("id_user") final String id, @RequestBody UserDTO user,
                                         HttpServletRequest request) {
        log.info("Actualizando usuario: " + id);
        correspondenciaApiCliente.actualizarUsuarioById(user);
        correspondenciaApiCliente.actualizarDependenciaFuncionario(user);
        return user;

    }
}
