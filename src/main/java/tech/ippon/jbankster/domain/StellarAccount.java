package tech.ippon.jbankster.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A StellarAccount.
 */
@Entity
@Table(name = "stellar_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StellarAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "account_id", nullable = false)
    private String accountId;

    @Column(name = "secret_seed")
    private String secretSeed;

    @ManyToMany(mappedBy = "stellarAccounts")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserProfile> userProfiles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public StellarAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccountId() {
        return accountId;
    }

    public StellarAccount accountId(String accountId) {
        this.accountId = accountId;
        return this;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getSecretSeed() {
        return secretSeed;
    }

    public StellarAccount secretSeed(String secretSeed) {
        this.secretSeed = secretSeed;
        return this;
    }

    public void setSecretSeed(String secretSeed) {
        this.secretSeed = secretSeed;
    }

    public Set<UserProfile> getUserProfiles() {
        return userProfiles;
    }

    public StellarAccount userProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
        return this;
    }

    public StellarAccount addUserProfile(UserProfile userProfile) {
        this.userProfiles.add(userProfile);
        userProfile.getStellarAccounts().add(this);
        return this;
    }

    public StellarAccount removeUserProfile(UserProfile userProfile) {
        this.userProfiles.remove(userProfile);
        userProfile.getStellarAccounts().remove(this);
        return this;
    }

    public void setUserProfiles(Set<UserProfile> userProfiles) {
        this.userProfiles = userProfiles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StellarAccount stellarAccount = (StellarAccount) o;
        if (stellarAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stellarAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StellarAccount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", accountId='" + getAccountId() + "'" +
            ", secretSeed='" + getSecretSeed() + "'" +
            "}";
    }
}
