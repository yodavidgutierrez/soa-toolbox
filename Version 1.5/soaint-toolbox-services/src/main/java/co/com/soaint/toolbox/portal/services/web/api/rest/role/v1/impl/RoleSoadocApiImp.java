package co.com.soaint.toolbox.portal.services.web.api.rest.role.v1.impl;

import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.CorrespondenciaApiCliente;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.FuncionarioApiCliente;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.commons.constants.api.role.EndpointRoleApi;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import co.com.soaint.toolbox.portal.services.commons.enums.TransactionState;
import co.com.soaint.toolbox.portal.services.web.api.rest.role.v1.RoleApi;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequestMapping(value = EndpointRoleApi.ROLE_API)
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class RoleSoadocApiImp implements RoleApi {

    final private CorrespondenciaApiCliente correspondenciaApiCliente;

    @Value("${roles.soadoc}")
    public String ROL_SOADOC;

    @Value("${roles.digitalizacion}")
    public String ROL_DIGITALIZACION;

    @Value("${roles.kpi}")
    public String ROL_KPI;

    @Value("${roles.toolbox}")
    public String ROL_TOOLBOX;

    @Value("${roles.gaf}")
    public String ROL_GAF;

    @Value("${roles.instrumentos}")
    public String ROL_INSTRUMENTOS;

    @Autowired
    public RoleSoadocApiImp(CorrespondenciaApiCliente correspondenciaApiCliente) {
        this.correspondenciaApiCliente = correspondenciaApiCliente;
    }

    @GetMapping(EndpointRoleApi.FIND_USERS_BY_ROLE)
    public Object findUsersByRole(@PathVariable("id_role") final String id, HttpServletRequest request) {
        log.info("Buscando Users por id de Rol: " + id);
        List<UserDTO> userDTO = correspondenciaApiCliente.listarFuncionarioByRol(id);
        return userDTO;

    }

    @GetMapping(EndpointRoleApi.LISTA_ROLES_BY_APPLICATION)
    public List<RoleDTO> ListaRoleByApplication(@PathVariable("id_app") final String id, HttpServletRequest request){
        log.info("listar role por id: " + id);
        String roles ="";
        switch (id){
            case "1":
                 roles = ROL_SOADOC;
                 break;
            case "2":
                 roles = ROL_DIGITALIZACION;
                 break;
            case "3":
                 roles = ROL_KPI;
                 break;
            case "4":
                roles = ROL_TOOLBOX;
                break;
            case "5":
                roles = ROL_GAF;
                break;
            case "6":
                roles = ROL_INSTRUMENTOS;
                break;

        }

        List<RoleDTO> lista = new ArrayList<>();
        if(!StringUtils.isEmpty(roles))
        for(String role: roles.split(",")){
          lista.add(RoleDTO.builder()
                  .name(role)
                  .idApplication(id)
                  .build());
        }
        return lista;
    }
}
