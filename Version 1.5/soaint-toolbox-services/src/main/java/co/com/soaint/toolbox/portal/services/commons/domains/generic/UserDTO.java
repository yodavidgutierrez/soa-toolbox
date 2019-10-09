package co.com.soaint.toolbox.portal.services.commons.domains.generic;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserDTO  implements Serializable {

    @JsonProperty("id")
    private String id;
    @JsonProperty("change_date")
    private String changeDate;
    @JsonProperty("creation_date")
    private String creationDate;
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
    @JsonProperty("name")
    private String name;
    @JsonProperty("loginName")
    private String loginName;
    @JsonProperty("properties")
    private Map<String, Object> properties = new HashMap<>();
}
