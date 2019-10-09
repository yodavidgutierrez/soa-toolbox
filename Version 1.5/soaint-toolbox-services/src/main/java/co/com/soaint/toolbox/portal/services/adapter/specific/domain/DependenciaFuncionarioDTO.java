package co.com.soaint.toolbox.portal.services.adapter.specific.domain;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DependenciaFuncionarioDTO implements Serializable {

    private String idFuncionario;
    private List<String> codigos;
}
