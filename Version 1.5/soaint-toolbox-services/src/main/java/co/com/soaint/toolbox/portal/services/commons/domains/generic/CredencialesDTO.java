package co.com.soaint.toolbox.portal.services.commons.domains.generic;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CredencialesDTO implements Serializable {


    private String loginName;
    private String password;
}
