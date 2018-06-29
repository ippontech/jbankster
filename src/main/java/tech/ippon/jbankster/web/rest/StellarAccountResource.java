package tech.ippon.jbankster.web.rest;

import com.codahale.metrics.annotation.Timed;
import tech.ippon.jbankster.domain.StellarAccount;
import tech.ippon.jbankster.service.StellarAccountService;
import tech.ippon.jbankster.web.rest.errors.BadRequestAlertException;
import tech.ippon.jbankster.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StellarAccount.
 */
@RestController
@RequestMapping("/api")
public class StellarAccountResource {

    private final Logger log = LoggerFactory.getLogger(StellarAccountResource.class);

    private static final String ENTITY_NAME = "stellarAccount";

    private final StellarAccountService stellarAccountService;

    public StellarAccountResource(StellarAccountService stellarAccountService) {
        this.stellarAccountService = stellarAccountService;
    }

    /**
     * POST  /stellar-accounts : Create a new stellarAccount.
     *
     * @param stellarAccount the stellarAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stellarAccount, or with status 400 (Bad Request) if the stellarAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stellar-accounts")
    @Timed
    public ResponseEntity<StellarAccount> createStellarAccount(@Valid @RequestBody StellarAccount stellarAccount) throws URISyntaxException {
        log.debug("REST request to save StellarAccount : {}", stellarAccount);
        if (stellarAccount.getId() != null) {
            throw new BadRequestAlertException("A new stellarAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StellarAccount result = stellarAccountService.save(stellarAccount);
        return ResponseEntity.created(new URI("/api/stellar-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stellar-accounts : Updates an existing stellarAccount.
     *
     * @param stellarAccount the stellarAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stellarAccount,
     * or with status 400 (Bad Request) if the stellarAccount is not valid,
     * or with status 500 (Internal Server Error) if the stellarAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stellar-accounts")
    @Timed
    public ResponseEntity<StellarAccount> updateStellarAccount(@Valid @RequestBody StellarAccount stellarAccount) throws URISyntaxException {
        log.debug("REST request to update StellarAccount : {}", stellarAccount);
        if (stellarAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StellarAccount result = stellarAccountService.save(stellarAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stellarAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stellar-accounts : get all the stellarAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of stellarAccounts in body
     */
    @GetMapping("/stellar-accounts")
    @Timed
    public List<StellarAccount> getAllStellarAccounts() {
        log.debug("REST request to get all StellarAccounts");
        return stellarAccountService.findAll();
    }

    /**
     * GET  /stellar-accounts/:id : get the "id" stellarAccount.
     *
     * @param id the id of the stellarAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stellarAccount, or with status 404 (Not Found)
     */
    @GetMapping("/stellar-accounts/{id}")
    @Timed
    public ResponseEntity<StellarAccount> getStellarAccount(@PathVariable Long id) {
        log.debug("REST request to get StellarAccount : {}", id);
        Optional<StellarAccount> stellarAccount = stellarAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stellarAccount);
    }

    /**
     * DELETE  /stellar-accounts/:id : delete the "id" stellarAccount.
     *
     * @param id the id of the stellarAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stellar-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteStellarAccount(@PathVariable Long id) {
        log.debug("REST request to delete StellarAccount : {}", id);
        stellarAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
