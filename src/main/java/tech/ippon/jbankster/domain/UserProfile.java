package tech.ippon.jbankster.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone")
    private String phone;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_profile_stellar_account",
               joinColumns = @JoinColumn(name = "user_profiles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "stellar_accounts_id", referencedColumnName = "id"))
    private Set<StellarAccount> stellarAccounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public UserProfile phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Set<StellarAccount> getStellarAccounts() {
        return stellarAccounts;
    }

    public UserProfile stellarAccounts(Set<StellarAccount> stellarAccounts) {
        this.stellarAccounts = stellarAccounts;
        return this;
    }

    public UserProfile addStellarAccount(StellarAccount stellarAccount) {
        this.stellarAccounts.add(stellarAccount);
        stellarAccount.getUserProfiles().add(this);
        return this;
    }

    public UserProfile removeStellarAccount(StellarAccount stellarAccount) {
        this.stellarAccounts.remove(stellarAccount);
        stellarAccount.getUserProfiles().remove(this);
        return this;
    }

    public void setStellarAccounts(Set<StellarAccount> stellarAccounts) {
        this.stellarAccounts = stellarAccounts;
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
        UserProfile userProfile = (UserProfile) o;
        if (userProfile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", phone='" + getPhone() + "'" +
            "}";
    }
}
