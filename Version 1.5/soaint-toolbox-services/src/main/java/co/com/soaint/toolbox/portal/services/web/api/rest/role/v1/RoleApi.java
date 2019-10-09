package co.com.soaint.toolbox.portal.services.web.api.rest.role.v1;

import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.math.BigInteger;

public interface RoleApi {

    Object findUsersByRole(String id, HttpServletRequest request);
}
