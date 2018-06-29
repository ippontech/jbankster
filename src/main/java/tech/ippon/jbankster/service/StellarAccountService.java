package tech.ippon.jbankster.service;

import tech.ippon.jbankster.domain.StellarAccount;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing StellarAccount.
 */
public interface StellarAccountService {

    /**
     * Save a stellarAccount.
     *
     * @param stellarAccount the entity to save
     * @return the persisted entity
     */
    StellarAccount save(StellarAccount stellarAccount);

    /**
     * Get all the stellarAccounts.
     *
     * @return the list of entities
     */
    List<StellarAccount> findAll();


    /**
     * Get the "id" stellarAccount.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<StellarAccount> findOne(Long id);

    /**
     * Delete the "id" stellarAccount.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
