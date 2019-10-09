package co.com.soaint.toolbox.portal.services.commons.domains.response;

import lombok.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ErrorResponse implements Serializable {

    private String code;
    private String devMessage;
    private String userMessage;
    private String exceptionType;
    private String traceID;
}
