package co.com.soaint.toolbox.portal.services.web.api.rest.user.v1;

import co.com.soaint.toolbox.portal.services.commons.domains.generic.CredencialesDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import org.springframework.http.ResponseEntity;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Response;
import java.math.BigInteger;
import java.util.List;

public interface UserApi {

    UserDTO findUserById(String loginName, HttpServletRequest request);
    public List<UserDTO> listUsers(HttpServletRequest request);
    public List<RoleDTO> updateUserRol(BigInteger id, List<RoleDTO> roles, HttpServletRequest request);
    public ResponseEntity<UserDTO> login(String loginName, CredencialesDTO credencialesDTO, HttpServletRequest request);
    public UserDTO actualizarUsuarioById(final String id, UserDTO user, HttpServletRequest request);
}
