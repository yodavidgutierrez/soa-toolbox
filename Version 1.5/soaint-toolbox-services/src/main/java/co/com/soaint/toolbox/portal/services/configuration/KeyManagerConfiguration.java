package co.com.soaint.toolbox.portal.services.configuration;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class KeyManagerConfiguration {

    private static KeyManagerConfiguration SINGLETON = new KeyManagerConfiguration();
    private Key key;
    private final Long expirationTime = 4800L;

    private KeyManagerConfiguration() {
        super();
        key = generateKey();
    }

    public static KeyManagerConfiguration getInstance() {
        return SINGLETON;
    }

    public String issueToken(String login, String issuer) {

        return Jwts.builder()
                .setSubject(login)
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(generateExpirationForKey())
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public Key getKey() {
        return key;
    }

    private Key generateKey() {
        //TODO: key should be read from fyle system and not generated by system
        String keyString = "simplekey";
        return new SecretKeySpec(keyString.getBytes(), 0, keyString.getBytes().length, "DES");
    }

    private Date generateExpirationForKey() {
        LocalDateTime localDateTime = LocalDateTime.now().plusMinutes(expirationTime);
        log.info("*******FECHA DE EXPIRACIÓN******* " + localDateTime);
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    private void extendingExpirationTime() {


    }

}
