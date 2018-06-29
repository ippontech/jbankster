import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './stellar-account.reducer';
import { IStellarAccount } from 'app/shared/model/stellar-account.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IStellarAccountUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IStellarAccountUpdateState {
  isNew: boolean;
  userProfileId: number;
}

export class StellarAccountUpdate extends React.Component<IStellarAccountUpdateProps, IStellarAccountUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userProfileId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUserProfiles();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { stellarAccountEntity } = this.props;
      const entity = {
        ...stellarAccountEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/stellar-account');
  };

  render() {
    const isInvalid = false;
    const { stellarAccountEntity, userProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jbanksterApp.stellarAccount.home.createOrEditLabel">
              <Translate contentKey="jbanksterApp.stellarAccount.home.createOrEditLabel">Create or edit a StellarAccount</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : stellarAccountEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="stellar-account-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="jbanksterApp.stellarAccount.name">Name</Translate>
                  </Label>
                  <AvField
                    id="stellar-account-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="accountIdLabel" for="accountId">
                    <Translate contentKey="jbanksterApp.stellarAccount.accountId">Account Id</Translate>
                  </Label>
                  <AvField
                    id="stellar-account-accountId"
                    type="text"
                    name="accountId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="secretSeedLabel" for="secretSeed">
                    <Translate contentKey="jbanksterApp.stellarAccount.secretSeed">Secret Seed</Translate>
                  </Label>
                  <AvField id="stellar-account-secretSeed" type="text" name="secretSeed" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/stellar-account" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  userProfiles: storeState.userProfile.entities,
  stellarAccountEntity: storeState.stellarAccount.entity,
  loading: storeState.stellarAccount.loading,
  updating: storeState.stellarAccount.updating
});

const mapDispatchToProps = {
  getUserProfiles,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StellarAccountUpdate);
