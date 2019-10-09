package co.com.soaint.toolbox.portal.services.adapter.specific.api.module.firstapi;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.DependenciaFuncionarioDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;

import java.math.BigInteger;
import java.util.List;

public interface CorrespondenciaApiCliente {

    List<UserDTO> listarFuncionarioByRol(String rol);

    List<RoleDTO> actualizarRolesFuncionario(BigInteger id, List<RoleDTO> roles);

    UserDTO actualizarUsuarioById ( UserDTO userDTO);

    Boolean actualizarDependenciaFuncionario (UserDTO userDTO);

}
