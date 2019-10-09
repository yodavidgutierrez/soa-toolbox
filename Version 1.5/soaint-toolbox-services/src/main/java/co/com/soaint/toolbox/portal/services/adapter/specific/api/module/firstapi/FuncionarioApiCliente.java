package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.CredencialesDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigInteger;
import java.util.List;

public interface FuncionarioApiCliente {

    List<UserDTO> buscarFuncionarios(FuncionarioDTO funcionarioDTO);
    Boolean verificarCredenciales(CredencialesDTO credencialesDTO);


}
