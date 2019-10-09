package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.RolDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.AplicacionDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;

import java.math.BigInteger;
import java.util.List;

public interface AplicacionApiCliente {

    AplicacionDTO applicationById(Integer idApplication);
    List<AplicacionDTO> listarApplication();
    AplicacionDTO actualizarApplication(AplicacionDTO aplicacionDTO);
}
