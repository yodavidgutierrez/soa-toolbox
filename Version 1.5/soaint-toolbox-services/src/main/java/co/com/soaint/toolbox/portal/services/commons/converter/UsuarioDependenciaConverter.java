package co.com.soaint.toolbox.portal.services.commons.converter;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.DependenciaDTO;
import co.com.soaint.toolbox.portal.services.adapter.specific.domain.DependenciaFuncionarioDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class UsuarioDependenciaConverter {

    @Autowired
    private ObjectMapper mapper;

    public DependenciaFuncionarioDTO convertToDependenciaFuncionarioDTO(UserDTO userDTO) {

        return DependenciaFuncionarioDTO.builder()
                .idFuncionario(userDTO.getProperties().get("ideFunci").toString())
                .codigos(convertToCodigo(mapper.convertValue(userDTO.getProperties().get("dependencias"), new TypeReference<List<DependenciaDTO>>(){})))
                .build();
    }

    public List<String> convertToCodigo(List<DependenciaDTO> dependencias) {

        List<String> codigos = new ArrayList<>();

        for (DependenciaDTO dependencia : dependencias) {
            codigos.add(dependencia.getCodDependencia());
        }

        return codigos;
    }
}
