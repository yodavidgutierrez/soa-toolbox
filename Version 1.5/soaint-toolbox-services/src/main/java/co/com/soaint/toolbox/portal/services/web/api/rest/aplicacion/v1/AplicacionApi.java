package co.com.soaint.toolbox.portal.services.web.api.rest.aplicacion.v1;

import co.com.soaint.toolbox.portal.services.commons.domains.generic.AplicacionDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.CredencialesDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;
import java.util.List;

public interface AplicacionApi {

    AplicacionDTO findById(Integer idAplicacion, HttpServletRequest request);
    List<AplicacionDTO> list(HttpServletRequest request);
    AplicacionDTO actualizar(Integer id, AplicacionDTO aplicacionDTO, HttpServletRequest request);
}
