package co.com.soaint.toolbox.portal.services.commons.domains.generic;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;
import java.math.BigInteger;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AplicacionDTO implements Serializable {

    @JsonProperty("idApplication")
    private Integer idApplication;
    @JsonProperty("visualizationName")
    private String visualizationName;
    @JsonProperty("Accesslink")
    private String Accesslink;
    @JsonProperty("defaultApplication")
    private Boolean defaultApplication;
    @JsonProperty("endpointRoles")
    private String endpointRoles;
    @JsonProperty("applicationOrder")
    private Integer applicationOrder;
    @JsonProperty("logo")
    private String logo;
}
