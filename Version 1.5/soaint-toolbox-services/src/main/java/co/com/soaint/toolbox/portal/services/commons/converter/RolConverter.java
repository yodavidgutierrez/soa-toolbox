package co.com.soaint.toolbox.portal.services.commons.converter;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.RolDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.RoleDTO;
import org.springframework.stereotype.Component;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.List;

@Component
public class RolConverter {
    public RolDTO convertToRolDTO(RoleDTO rolDTO) {

        return RolDTO.builder()
                .rol(rolDTO.getName())
                .build();
    }

    public List<RolDTO> convertToRolDTO(List<RoleDTO> roleDTO){
        List <RolDTO> roles = new ArrayList<>();

        for (RoleDTO rol: roleDTO) {
            roles.add(convertToRolDTO(rol));
        }

        return roles;
    }


}
