package co.com.soaint.toolbox.portal.services.commons.constants.api.user;

public interface EndpointUserApi {

    String USER_API = "/users";
    String FIND_USER_BY_ID = "/{id_user}";
    String LIST_USERS = "";
    String LOGIN = "/{login_name}";
    String UPDATE_USER = "/{id_user}";
    String UPDATE_USER_ROLES = "/{id_user}/roles";
}
