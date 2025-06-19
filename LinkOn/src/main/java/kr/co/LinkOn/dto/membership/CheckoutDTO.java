package kr.co.LinkOn.dto.membership;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CheckoutDTO {

    Long no;

    @JsonProperty("user_Uid")
    String user_Uid;

    @JsonProperty("membership_No")
    Integer membership_No;

    String name;
    String email;
    String hp;

    String cardName;
    String cardNumber;
    String expiryDate;

    Integer amount;
    LocalDateTime paymentDate;
    String status;



}
