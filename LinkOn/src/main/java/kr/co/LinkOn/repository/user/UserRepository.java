package kr.co.LinkOn.repository.user;

import kr.co.LinkOn.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    long countByEmail(String email);

    long countByUid(String uid);

    long countByHp(String hp);

    Optional<User> findByUid(String userId);


    String uid(String uid);


    Optional<User> findByNameAndEmail(String name, String email);

    Optional<User> findByUidAndEmail(String uid, String email);

}
