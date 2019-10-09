package co.com.soaint.toolbox.portal.services.adapter.specific.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class FuncionarioDTO implements Serializable {

    @JsonProperty("id")
    private BigInteger ideFunci;
    private String codTipDocIdent;
    private String nroIdentificacion;
    @JsonProperty("nombre")
    private String nomFuncionario;
    private String valApellido1;
    private String valApellido2;
    private String corrElectronico;
    private String loginName;
    private String estado;
    private List<DependenciaDTO> dependencias;
    private List<RolDTO> roles;
    private String password;
    private String usuarioCrea;
    private String cargo;
    private String firmaPolitica;
    private String esJefe;
}
