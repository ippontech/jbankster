package tech.ippon.jbankster.service.impl;

import tech.ippon.jbankster.service.StellarAccountService;
import tech.ippon.jbankster.domain.StellarAccount;
import tech.ippon.jbankster.repository.StellarAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing StellarAccount.
 */
@Service
@Transactional
public class StellarAccountServiceImpl implements StellarAccountService {

    private final Logger log = LoggerFactory.getLogger(StellarAccountServiceImpl.class);

    private final StellarAccountRepository stellarAccountRepository;

    public StellarAccountServiceImpl(StellarAccountRepository stellarAccountRepository) {
        this.stellarAccountRepository = stellarAccountRepository;
    }

    /**
     * Save a stellarAccount.
     *
     * @param stellarAccount the entity to save
     * @return the persisted entity
     */
    @Override
    public StellarAccount save(StellarAccount stellarAccount) {
        log.debug("Request to save StellarAccount : {}", stellarAccount);        return stellarAccountRepository.save(stellarAccount);
    }

    /**
     * Get all the stellarAccounts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<StellarAccount> findAll() {
        log.debug("Request to get all StellarAccounts");
        return stellarAccountRepository.findAll();
    }


    /**
     * Get one stellarAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StellarAccount> findOne(Long id) {
        log.debug("Request to get StellarAccount : {}", id);
        return stellarAccountRepository.findById(id);
    }

    /**
     * Delete the stellarAccount by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete StellarAccount : {}", id);
        stellarAccountRepository.deleteById(id);
    }
}
