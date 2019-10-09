package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.impl;


import co.com.soaint.toolbox.portal.services.adapter.manager.impl.EndpointManagerAbstract;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.AplicacionApiCliente;
import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.endpoints.TaskApiEndpoints;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.RolDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.infrastructure.EndpointConfig;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.AplicacionDTO;
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
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Component
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NON_PRIVATE)
public class AplicacionApiImpl extends EndpointManagerAbstract implements AplicacionApiCliente {

    @Autowired
    private TaskApiEndpoints taskApiEndpoints;

    @Autowired
    private ObjectMapper mapper;

    public AplicacionApiImpl(EndpointConfig endpointConfig) {
        super(endpointConfig);
    }

    @Override
    public AplicacionDTO applicationById(Integer idApplication) {
            log.info("Buscando Aplicacion: " + idApplication);
        try {
            ResponseEntity<AplicacionDTO> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_APPLICATION_BUSCAR.concat(idApplication.toString()),
                    AplicacionDTO.class, HttpMethod.GET);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
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
    public List<AplicacionDTO> listarApplication() {
        log.info("listando application: " );
        try {
            ResponseEntity<Object> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_APPLICATION_LISTAR,
                    Object.class, HttpMethod.GET);

            if (response.getStatusCode() == HttpStatus.OK) {
                List<AplicacionDTO> lista = mapper.convertValue(response.getBody(), new TypeReference<List<AplicacionDTO>>(){});
                return lista;
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
    public AplicacionDTO actualizarApplication(AplicacionDTO aplicacionDTO) {
        log.info("Actualizando Aplicacion: " + aplicacionDTO);
        try {
            ResponseEntity<AplicacionDTO> response = endpointConsumerClient(taskApiEndpoints.ENDPOINT_APPLICATION_ACTUALIZAR.concat(aplicacionDTO.getIdApplication().toString()),
                    AplicacionDTO.class, HttpMethod.PUT, aplicacionDTO);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
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
