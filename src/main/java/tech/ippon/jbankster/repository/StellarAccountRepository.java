package tech.ippon.jbankster.repository;

import tech.ippon.jbankster.domain.StellarAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StellarAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StellarAccountRepository extends JpaRepository<StellarAccount, Long> {

}
