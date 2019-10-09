package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.impl;


import co.com.soaint.toolbox.portal.services.adapter.manager.impl.EndpointManagerAbstract;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.CorrespondenciaApiCliente;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.endpoints.TaskApiEndpoints;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.DependenciaDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.DependenciaFuncionarioDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioBuscarResponseDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.infrastructure.EndpointConfig;
import co.com.soaint.toolbox.portal.services.commons.converter.FuncionarioConverter;
import co.com.soaint.toolbox.portal.services.commons.converter.RolConverter;
import co.com.soaint.toolbox.portal.services.commons.converter.UsuarioConverter;
import co.com.soaint.toolbox.portal.services.commons.converter.UsuarioDependenciaConverter;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import co.com.soaint.toolbox.portal.services.commons.exception.business.NoUpdatedException;
import co.com.soaint.toolbox.portal.services.commons.exception.business.ResponseNotFoundException;
import co.com.soaint.toolbox.portal.services.commons.exception.generic.BaseRuntimeException;
import co.com.soaint.toolbox.portal.services.commons.exception.system.SystemException;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import java.math.BigInteger;
import java.util.List;

@Log4j2
@Component
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
public class CorrespondenciaApiImpl extends EndpointManagerAbstract implements CorrespondenciaApiCliente {

    @Autowired
    private TaskApiEndpoints taskApiEndpoints;

    @Autowired
    private FuncionarioConverter funcionarioConverter;

    @Autowired
    private UsuarioConverter usuarioConverter;

    @Autowired
    private RolConverter rolConverter;

    @Autowired
    private UsuarioDependenciaConverter usuarioDependenciaConverter;

    @Autowired
    private ObjectMapper mapper;

    public CorrespondenciaApiImpl(EndpointConfig endpointConfig)  {
        super(endpointConfig);
    }

    @Override
    public List<UserDTO> listarFuncionarioByRol(String rol) {
        log.info("listando funcionarios por rol: " + rol);
        try {
            ResponseEntity<Object> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_CORRESPONDENCIA_LISTARUSUARIOPORROL + rol, Object.class, HttpMethod.GET);
            if (response.getStatusCode() == HttpStatus.OK) {
                List<FuncionarioDTO> lista = mapper.convertValue(response.getBody(), new TypeReference<List<FuncionarioDTO>>(){});
                return funcionarioConverter.convertToUserDTO(lista);
            }
            throw new ResponseNotFoundException();
        } catch (BaseRuntimeException ex) {
            throw ex;
        } catch (Exception ex) {
            SystemException exep = new SystemException();
            exep.setEx(ex);
            throw exep;
        }
    }
    @Override
    public List<RoleDTO> actualizarRolesFuncionario(BigInteger id, List<RoleDTO> roles) {
        log.info("Actualizando roles funcionario: " + id);
        try {
            FuncionarioDTO funcionarioDTO = FuncionarioDTO.builder()
                    .ideFunci(id)
                    .roles(rolConverter.convertToRolDTO(roles))
                    .build();
            ResponseEntity<Boolean> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_FUNCIONARIO_ACTUALIZAR_ROL,
                    Boolean.class, HttpMethod.PUT, funcionarioDTO);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody())
                return roles;
            throw new NoUpdatedException();
        } catch (BaseRuntimeException ex) {
            throw ex;
        } catch (Exception ex) {
            SystemException exep = new SystemException();
            exep.setEx(ex);
            throw exep;
        }
    }

    @Override
    public UserDTO actualizarUsuarioById(UserDTO userDTO) {
        log.info("Actualizando usuario: " + userDTO);
        try {
            FuncionarioDTO funcionarioDTO = usuarioConverter.convertToFuncionarioDTO(userDTO);

            ResponseEntity<Object> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_CORRESPONDENCIA_ACTUALIZAR_USUARIO,
                    Object.class, HttpMethod.PUT, funcionarioDTO);
            if (response.getStatusCode() == HttpStatus.OK) {
                return userDTO;
            }
            throw new NoUpdatedException();
        } catch (BaseRuntimeException ex) {
            throw ex;
        } catch (Exception ex) {
            SystemException exep = new SystemException();
            exep.setEx(ex);
            throw exep;
        }
    }

    @Override
    public Boolean actualizarDependenciaFuncionario(UserDTO userDTO) {
        log.info("Actualizando usuario: " + userDTO);
        try {

            DependenciaFuncionarioDTO dependenciaFuncionarioDTO  = usuarioDependenciaConverter.convertToDependenciaFuncionarioDTO(userDTO);

            ResponseEntity<Boolean> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_CORRESPONDENCIA_DEPENDENCIA_CODIGO,
                    Boolean.class, HttpMethod.PUT, dependenciaFuncionarioDTO);
            if (response.getStatusCode() == HttpStatus.OK) {
                return true;
            }
            throw new NoUpdatedException();
        } catch (BaseRuntimeException ex) {
            throw ex;
        } catch (Exception ex) {
            SystemException exep = new SystemException();
            exep.setEx(ex);
            throw exep;
        }
    }
}
