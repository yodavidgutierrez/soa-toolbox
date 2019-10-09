package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.impl;

import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.endpoints.TaskApiEndpoints;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioBuscarResponseDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.infrastructure.EndpointConfig;
import co.com.soaint.toolbox.portal.services.commons.converter.FuncionarioConverter;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.CredencialesDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import co.com.soaint.toolbox.portal.services.commons.exception.business.NoUpdatedException;
import co.com.soaint.toolbox.portal.services.commons.exception.business.UnAuthorizedException;
import co.com.soaint.toolbox.portal.services.commons.exception.generic.BaseRuntimeException;
import co.com.soaint.toolbox.portal.services.commons.exception.system.SystemException;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.ObjectMapper;
import co.com.soaint.toolbox.portal.services.adapter.manager.impl.EndpointManagerAbstract;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.FuncionarioApiCliente;
import co.com.soaint.toolbox.portal.services.commons.exception.business.ResponseNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.xml.ws.Response;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Component
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
public class FuncionarioApiImpl extends EndpointManagerAbstract implements FuncionarioApiCliente {

    @Autowired
    private TaskApiEndpoints taskApiEndpoints;

    @Autowired
    private FuncionarioConverter funcionarioConverter;

    public FuncionarioApiImpl(EndpointConfig endpointConfig) {
        super(endpointConfig);
    }

    @Override
    public List<UserDTO> buscarFuncionarios(FuncionarioDTO funcionarioDTO) {
        log.info("Buscando funcionarios: " + funcionarioDTO);
        try {
            ResponseEntity<FuncionarioBuscarResponseDTO> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_FUNCIONARIO_BUSCAR, FuncionarioBuscarResponseDTO.class, HttpMethod.POST, funcionarioDTO);
            if (response.getStatusCode() == HttpStatus.OK)
                return funcionarioConverter.convertToUserDTO(response.getBody());
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
    public Boolean verificarCredenciales(CredencialesDTO credencialesDTO) {
        log.info("Verificando credenciales: " + credencialesDTO);
        try {

            ResponseEntity<Object> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_FUNCIONARIO_VERIFICAR_CREDENCIALES,
                    Object.class, HttpMethod.POST, credencialesDTO);
            if (response.getStatusCode() == HttpStatus.OK)
                return true;
            throw new UnAuthorizedException();
        } catch (BaseRuntimeException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new UnAuthorizedException();
        }
    }


}
