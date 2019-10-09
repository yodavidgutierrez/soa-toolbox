package co.com.soaint.toolbox.portal.services.commons.converter;

import co.com.soaint.toolbox.portal.services.adapter.specific.domain.FuncionarioDTO;
import co.com.soaint.toolbox.portal.services.commons.domains.generic.UserDTO;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;
import java.util.prefs.Preferences;

@Component
public class UsuarioConverter {

    public FuncionarioDTO convertToFuncionarioDTO(UserDTO userDTO) {

        return FuncionarioDTO.builder()
                .loginName(userDTO.getId())
                .corrElectronico(userDTO.getEmail())
                .password(userDTO.getPassword())



                .ideFunci(!userDTO.getProperties().containsKey("ideFunci") ? null :
                        new BigInteger(userDTO.getProperties().get("ideFunci").toString()))

                .codTipDocIdent(!userDTO.getProperties().containsKey("codTipoDocIdent") ? null :
                        userDTO.getProperties().get("codTipoDocIdent").toString())

                .nroIdentificacion(!userDTO.getProperties().containsKey("nroIdentificacion") ? null :
                        userDTO.getProperties().get("nroIdentificacion").toString())

                .nomFuncionario(StringUtils.isEmpty(userDTO.getName()) ? userDTO.getProperties().get("nomFuncionario").toString() : userDTO.getName())

                .valApellido1(!userDTO.getProperties().containsKey("valApellido1") ? null :
                        userDTO.getProperties().get("valApellido1").toString())

                .valApellido2(!userDTO.getProperties().containsKey("valApellido2") ? null :
                        userDTO.getProperties().get("valApellido2").toString())

                .estado(!userDTO.getProperties().containsKey("estado") ? null :
                        userDTO.getProperties().get("estado").toString())

                .usuarioCrea(!userDTO.getProperties().containsKey("usuarioCrea") ? null :
                        userDTO.getProperties().get("usuarioCrea").toString())

                .cargo(!userDTO.getProperties().containsKey("cargo") ? null :
                        userDTO.getProperties().get("cargo").toString())

                .firmaPolitica(!userDTO.getProperties().containsKey("firmaPolitica") ? null :
                        userDTO.getProperties().get("firmaPolitica").toString())

                .esJefe(!userDTO.getProperties().containsKey("esJefe") ? null :
                        userDTO.getProperties().get("esJefe").toString())

                .build();
    }


}
