package co.com.soaint.toolbox.portal.services.adapter.specific.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DependenciaDTO implements Serializable {
    @JsonProperty("id")
    private BigInteger ideDependencia;
    @JsonProperty("codigo")
    private String codDependencia;
    @JsonProperty("nombre")
    private String nomDependencia;
    private BigInteger ideSede;
    private String codSede;
    private String nomSede;
    private String estado;
    private boolean radicadora;
}
