package tech.ippon.jbankster.repository;

import tech.ippon.jbankster.domain.UserProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query(value = "select distinct user_profile from UserProfile user_profile left join fetch user_profile.stellarAccounts",
        countQuery = "select count(distinct user_profile) from UserProfile user_profile")
    Page<UserProfile> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct user_profile from UserProfile user_profile left join fetch user_profile.stellarAccounts")
    List<UserProfile> findAllWithEagerRelationships();

    @Query("select user_profile from UserProfile user_profile left join fetch user_profile.stellarAccounts where user_profile.id =:id")
    Optional<UserProfile> findOneWithEagerRelationships(@Param("id") Long id);

}
