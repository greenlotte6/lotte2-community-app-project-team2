package kr.co.LinkOn.config;

import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Getter
@Setter
@Configuration
@EnableAspectJAutoProxy
public class RootConfig {

    @Bean
    public ModelMapper modelMapper(){

        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE) // Entity의 @Setter 선언없이 바로 private 속성으로 초기화 설정
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setFieldMatchingEnabled(true);

        return modelMapper;
    }
}
