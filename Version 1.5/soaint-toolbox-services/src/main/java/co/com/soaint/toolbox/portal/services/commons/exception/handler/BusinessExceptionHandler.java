package co.com.soaint.toolbox.portal.services.commons.exception.handler;

import co.com.soaint.toolbox.portal.services.commons.domains.response.ErrorResponse;
import co.com.soaint.toolbox.portal.services.commons.exception.business.NoCreatedException;
import co.com.soaint.toolbox.portal.services.commons.exception.business.NoUpdatedException;
import co.com.soaint.toolbox.portal.services.commons.exception.business.ResponseNotFoundException;
import co.com.soaint.toolbox.portal.services.commons.exception.business.UnAuthorizedException;
import co.com.soaint.toolbox.portal.services.commons.exception.system.SystemException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

@Log4j2
@ControllerAdvice
public class BusinessExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler({ResponseNotFoundException.class})
    public ResponseEntity<Object> notFoundHandler(Exception ex, WebRequest request, HttpServletRequest req){
        String trace = UUID.randomUUID().toString();
        log.error("Error " + trace  + ": " + ex);
        ErrorResponse response = ErrorResponse.builder()
                .code("TB-DB101")
                .devMessage("No se pudo encontrar la entidad.")
                .userMessage("No se pudo encontrar el elemento.")
                .exceptionType("ResponseNotFoundException")
                .traceID(trace)
                .build();
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.NO_CONTENT, request);

    }

    @ExceptionHandler({NoCreatedException.class})
    public ResponseEntity<Object> noCreateHandler(Exception ex, WebRequest request, HttpServletRequest req){
        String trace = UUID.randomUUID().toString();
        log.error("Error " + trace  + ": " + ex);
        ErrorResponse response = ErrorResponse.builder()
                .code("TB-DB102")
                .devMessage("No se pudo insertar la entidad e la base de datos.")
                .userMessage("No se pudo crear el elemento.")
                .exceptionType("NoCreatedException")
                .traceID(trace)
                .build();
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.NO_CONTENT, request);

    }

    @ExceptionHandler({NoUpdatedException.class})
    public ResponseEntity<Object> noUpdateHandler(Exception ex, WebRequest request, HttpServletRequest req){
        String trace = UUID.randomUUID().toString();
        log.error("Error " + trace  + ": " + ex);
        ErrorResponse response = ErrorResponse.builder()
                .code("TB-DB103")
                .devMessage("No se pudo actualizar la entidad e la base de datos.")
                .userMessage("No se pudo actualizar el elemento.")
                .exceptionType("NoUpdatedException")
                .traceID(trace)
                .build();
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.NO_CONTENT, request);

    }

    @ExceptionHandler({SystemException.class})
    public ResponseEntity<Object> systemException(Exception ex, WebRequest request, HttpServletRequest req){
        String trace = UUID.randomUUID().toString();
        log.error("Error " + trace  + ": ", ex);
        ErrorResponse response = ErrorResponse.builder()
                .code("TB-SYS201")
                .devMessage("Ocurrió un error interno en la API.")
                .userMessage("Ha ocurrido un error interno.")
                .exceptionType("SystemException")
                .traceID(trace)
                .build();
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);

    }

    @ExceptionHandler({UnAuthorizedException.class})
    public ResponseEntity<Object> unAuthorizedHandler(Exception ex, WebRequest request, HttpServletRequest req){
        String trace = UUID.randomUUID().toString();
        log.error("Error " + trace  + ": " + ex);
        ErrorResponse response = ErrorResponse.builder()
                .code("TB-SECURITY301")
                .devMessage("No se pudo realizar el login.")
                .userMessage("No se pudo realizar el login.")
                .exceptionType("UnAuthorizedException")
                .traceID(trace)
                .build();
        return handleExceptionInternal(ex, response, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);

    }
}
