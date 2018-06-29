package tech.ippon.jbankster.web.rest;

import tech.ippon.jbankster.JBanksterApp;

import tech.ippon.jbankster.domain.StellarAccount;
import tech.ippon.jbankster.repository.StellarAccountRepository;
import tech.ippon.jbankster.service.StellarAccountService;
import tech.ippon.jbankster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;


import static tech.ippon.jbankster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StellarAccountResource REST controller.
 *
 * @see StellarAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JBanksterApp.class)
public class StellarAccountResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SECRET_SEED = "AAAAAAAAAA";
    private static final String UPDATED_SECRET_SEED = "BBBBBBBBBB";

    @Autowired
    private StellarAccountRepository stellarAccountRepository;

    

    @Autowired
    private StellarAccountService stellarAccountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restStellarAccountMockMvc;

    private StellarAccount stellarAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StellarAccountResource stellarAccountResource = new StellarAccountResource(stellarAccountService);
        this.restStellarAccountMockMvc = MockMvcBuilders.standaloneSetup(stellarAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StellarAccount createEntity() {
        StellarAccount stellarAccount = new StellarAccount()
            .name(DEFAULT_NAME)
            .accountId(DEFAULT_ACCOUNT_ID)
            .secretSeed(DEFAULT_SECRET_SEED);
        return stellarAccount;
    }

    @Before
    public void initTest() {
        stellarAccount = createEntity();
    }

    @Test
    public void createStellarAccount() throws Exception {
        int databaseSizeBeforeCreate = stellarAccountRepository.findAll().size();

        // Create the StellarAccount
        restStellarAccountMockMvc.perform(post("/api/stellar-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stellarAccount)))
            .andExpect(status().isCreated());

        // Validate the StellarAccount in the database
        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeCreate + 1);
        StellarAccount testStellarAccount = stellarAccountList.get(stellarAccountList.size() - 1);
        assertThat(testStellarAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStellarAccount.getAccountId()).isEqualTo(DEFAULT_ACCOUNT_ID);
        assertThat(testStellarAccount.getSecretSeed()).isEqualTo(DEFAULT_SECRET_SEED);
    }

    @Test
    public void createStellarAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stellarAccountRepository.findAll().size();

        // Create the StellarAccount with an existing ID
        stellarAccount.setId();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStellarAccountMockMvc.perform(post("/api/stellar-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stellarAccount)))
            .andExpect(status().isBadRequest());

        // Validate the StellarAccount in the database
        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = stellarAccountRepository.findAll().size();
        // set the field null
        stellarAccount.setName(null);

        // Create the StellarAccount, which fails.

        restStellarAccountMockMvc.perform(post("/api/stellar-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stellarAccount)))
            .andExpect(status().isBadRequest());

        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAccountIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = stellarAccountRepository.findAll().size();
        // set the field null
        stellarAccount.setAccountId(null);

        // Create the StellarAccount, which fails.

        restStellarAccountMockMvc.perform(post("/api/stellar-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stellarAccount)))
            .andExpect(status().isBadRequest());

        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllStellarAccounts() throws Exception {
        // Initialize the database
        stellarAccountRepository.save(stellarAccount);

        // Get all the stellarAccountList
        restStellarAccountMockMvc.perform(get("/api/stellar-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].accountId").value(hasItem(DEFAULT_ACCOUNT_ID.toString())))
            .andExpect(jsonPath("$.[*].secretSeed").value(hasItem(DEFAULT_SECRET_SEED.toString())));
    }
    

    @Test
    public void getStellarAccount() throws Exception {
        // Initialize the database
        stellarAccountRepository.save(stellarAccount);

        // Get the stellarAccount
        restStellarAccountMockMvc.perform(get("/api/stellar-accounts/{id}", stellarAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.accountId").value(DEFAULT_ACCOUNT_ID.toString()))
            .andExpect(jsonPath("$.secretSeed").value(DEFAULT_SECRET_SEED.toString()));
    }
    @Test
    public void getNonExistingStellarAccount() throws Exception {
        // Get the stellarAccount
        restStellarAccountMockMvc.perform(get("/api/stellar-accounts/{id}", ))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateStellarAccount() throws Exception {
        // Initialize the database
        stellarAccountService.save(stellarAccount);

        int databaseSizeBeforeUpdate = stellarAccountRepository.findAll().size();

        // Update the stellarAccount
        StellarAccount updatedStellarAccount = stellarAccountRepository.findById(stellarAccount.getId()).get();
        updatedStellarAccount
            .name(UPDATED_NAME)
            .accountId(UPDATED_ACCOUNT_ID)
            .secretSeed(UPDATED_SECRET_SEED);

        restStellarAccountMockMvc.perform(put("/api/stellar-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStellarAccount)))
            .andExpect(status().isOk());

        // Validate the StellarAccount in the database
        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeUpdate);
        StellarAccount testStellarAccount = stellarAccountList.get(stellarAccountList.size() - 1);
        assertThat(testStellarAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStellarAccount.getAccountId()).isEqualTo(UPDATED_ACCOUNT_ID);
        assertThat(testStellarAccount.getSecretSeed()).isEqualTo(UPDATED_SECRET_SEED);
    }

    @Test
    public void updateNonExistingStellarAccount() throws Exception {
        int databaseSizeBeforeUpdate = stellarAccountRepository.findAll().size();

        // Create the StellarAccount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStellarAccountMockMvc.perform(put("/api/stellar-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stellarAccount)))
            .andExpect(status().isBadRequest());

        // Validate the StellarAccount in the database
        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteStellarAccount() throws Exception {
        // Initialize the database
        stellarAccountService.save(stellarAccount);

        int databaseSizeBeforeDelete = stellarAccountRepository.findAll().size();

        // Get the stellarAccount
        restStellarAccountMockMvc.perform(delete("/api/stellar-accounts/{id}", stellarAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StellarAccount> stellarAccountList = stellarAccountRepository.findAll();
        assertThat(stellarAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StellarAccount.class);
        StellarAccount stellarAccount1 = new StellarAccount();
        stellarAccount1.setId();
        StellarAccount stellarAccount2 = new StellarAccount();
        stellarAccount2.setId(stellarAccount1.getId());
        assertThat(stellarAccount1).isEqualTo(stellarAccount2);
        stellarAccount2.setId();
        assertThat(stellarAccount1).isNotEqualTo(stellarAccount2);
        stellarAccount1.setId(null);
        assertThat(stellarAccount1).isNotEqualTo(stellarAccount2);
    }
}
