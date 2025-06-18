package kr.co.LinkOn.repository.membership;

import kr.co.LinkOn.entity.membership.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Integer> {
    Optional<Membership> findByNo(int no);

    int no(int no);
}
