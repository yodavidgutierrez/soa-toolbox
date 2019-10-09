package co.com.soaint.toolbox.portal.services.commons.converter;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioBuscarResponseDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.RolDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import org.apache.catalina.Role;
import org.apache.tomcat.jni.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.*;

@Component
public class FuncionarioConverter {
    @Value("${roles.soadoc}")
    public String ROLES_SOADOC;

    @Value("${roles.digitalizacion}")
    public String ROLES_DIGITALIZACION;

    @Value("${roles.kpi}")
    public String ROLES_KPI;

    @Value("${roles.toolbox}")
    public String ROLES_TOOLBOX;

    @Value("${roles.gaf}")
    public String ROLES_GAF;

    @Value("${roles.instrumentos}")
    public String ROLES_INSTRUMENTOS;


    public List<UserDTO> convertToUserDTO(FuncionarioBuscarResponseDTO funcionarioBuscarResponseDTO) {

        if (CollectionUtils.isEmpty(funcionarioBuscarResponseDTO.getFuncionarios()))
            return new ArrayList<>();

        List<UserDTO> lista = new ArrayList<>();
        for (FuncionarioDTO funcionarioDTO : funcionarioBuscarResponseDTO.getFuncionarios()) {
            lista.add(convertToUserDTO(funcionarioDTO));
        }

        return lista;
    }

    public UserDTO convertToUserDTO(FuncionarioDTO funcionarioDTO) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("estado", funcionarioDTO.getEstado());
        properties.put("dependencias", funcionarioDTO.getDependencias());
        properties.put("cargo",funcionarioDTO.getCargo());
        properties.put("codTipoDocIdent",funcionarioDTO.getCodTipDocIdent());
        properties.put("esJefe",funcionarioDTO.getEsJefe().equals("true") ? true : false);
        properties.put("idFunci",funcionarioDTO.getIdeFunci().toString());
        properties.put("nomFuncionario",funcionarioDTO.getNomFuncionario());
        properties.put("valApellido1",funcionarioDTO.getValApellido1());
        properties.put("valApellido2",funcionarioDTO.getValApellido2());
        properties.put("usuarioCrea",funcionarioDTO.getUsuarioCrea());
        properties.put("firmaPolitica",funcionarioDTO.getFirmaPolitica());
        properties.put("nroIdentificacion",funcionarioDTO.getNroIdentificacion());

        List<RoleDTO> roleDTO = new ArrayList<>();
        for (RolDTO rolDTO : funcionarioDTO.getRoles()) {
            if (Arrays.asList(ROLES_SOADOC.split(",")).contains(rolDTO.getRol())) {
                roleDTO.add(RoleDTO.builder()
                        .idApplication("1")
                        .name(rolDTO.getRol())
                        .build());
            }
            if(Arrays.asList(ROLES_DIGITALIZACION.split(",")).contains(rolDTO.getRol())){
                roleDTO.add(RoleDTO.builder()
                        .idApplication("2")
                        .name(rolDTO.getRol())
                        .build());
            }
           if(Arrays.asList(ROLES_KPI.split(",")).contains(rolDTO.getRol())){
                roleDTO.add(RoleDTO.builder()
                        .idApplication("3")
                        .name(rolDTO.getRol())
                        .build());
            }
            if(Arrays.asList(ROLES_TOOLBOX.split(",")).contains(rolDTO.getRol())){
                roleDTO.add(RoleDTO.builder()
                        .idApplication("4")
                        .name(rolDTO.getRol())
                        .build());
            }
            if(Arrays.asList(ROLES_GAF.split(",")).contains(rolDTO.getRol())){
                roleDTO.add(RoleDTO.builder()
                        .idApplication("5")
                        .name(rolDTO.getRol())
                        .build());
            }
            if(Arrays.asList(ROLES_INSTRUMENTOS.split(",")).contains(rolDTO.getRol())){
                roleDTO.add(RoleDTO.builder()
                        .idApplication("6")
                        .name(rolDTO.getRol())
                        .build());
            }

        }

        properties.put("roles", roleDTO);

        return UserDTO.builder()
                .id(funcionarioDTO.getIdeFunci().toString())
                .email(funcionarioDTO.getCorrElectronico())
                .password(funcionarioDTO.getPassword())
                .name(funcionarioDTO.getNomFuncionario())
                .loginName(funcionarioDTO.getLoginName())
                .properties(properties)
                .build();
    }

    public List<UserDTO>  convertToUserDTO(List<FuncionarioDTO> funcionarios) {

        List<UserDTO> usuarios = new ArrayList<>();

        for (FuncionarioDTO usuario : funcionarios) {
            usuarios.add(convertToUserDTO(usuario));
        }

        return usuarios;
    }

}
