package co.com.soaint.toolbox.portal.services.commons.exception.system;

import lombok.*;

@Data
@ToString
public class SystemException extends RuntimeException {

    private Exception ex;

    public SystemException() {
    }
}

