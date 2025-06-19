package kr.co.LinkOn.repository.membership;

import kr.co.LinkOn.entity.membership.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
}
