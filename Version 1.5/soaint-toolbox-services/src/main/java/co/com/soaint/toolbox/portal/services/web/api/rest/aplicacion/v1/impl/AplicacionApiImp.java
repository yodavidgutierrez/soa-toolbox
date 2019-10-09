package co.com.soaint.toolbox.portal.services.web.api.rest.aplicacion.v1.impl;

import co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi.AplicacionApiCliente;
import co.com.soaint.toolbox.portal.services.commons.constants.api.aplicacion.EndpointAplicacionApi;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.AplicacionDTO;
import co.com.soaint.toolbox.portal.services.web.api.rest.aplicacion.v1.AplicacionApi;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Log4j2
@RestController
@RequestMapping(value = EndpointAplicacionApi.API)
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class AplicacionApiImp implements AplicacionApi {


    final private AplicacionApiCliente aplicacionApiCliente;

    @Autowired
    public AplicacionApiImp(AplicacionApiCliente aplicacionApiCliente) {
        this.aplicacionApiCliente = aplicacionApiCliente;
    }

    @GetMapping(EndpointAplicacionApi.FIND_BY_ID)
    public AplicacionDTO findById(@PathVariable("idApplication") final Integer idAplicacion, HttpServletRequest request) {
        log.info("Buscando Aplicacion por id: " + idAplicacion);
        return aplicacionApiCliente.applicationById(idAplicacion);
    }

    @GetMapping(EndpointAplicacionApi.LIST)
    public List<AplicacionDTO> list(HttpServletRequest request) {
        log.info("Listando Aplicaciones.");
        return aplicacionApiCliente.listarApplication();
    }

    @PutMapping(EndpointAplicacionApi.SAVE)
    public AplicacionDTO actualizar(@PathVariable("idApplication") Integer id, @RequestBody AplicacionDTO aplicacionDTO, HttpServletRequest request) {
        aplicacionDTO.setIdApplication(id);
        log.info("Actualizando la Aplicacion: " + aplicacionDTO);
        return aplicacionApiCliente.actualizarApplication(aplicacionDTO);

    }
}
