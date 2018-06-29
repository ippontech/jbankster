import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStellarAccount } from 'app/shared/model/stellar-account.model';
import { getEntities as getStellarAccounts } from 'app/entities/stellar-account/stellar-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IUserProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IUserProfileUpdateState {
  isNew: boolean;
  idsstellarAccount: any[];
}

export class UserProfileUpdate extends React.Component<IUserProfileUpdateProps, IUserProfileUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsstellarAccount: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStellarAccounts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userProfileEntity } = this.props;
      const entity = {
        ...userProfileEntity,
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
    this.props.history.push('/entity/user-profile');
  };

  stellarAccountUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsstellarAccount: keysToValues(selected, this.props.stellarAccounts, 'id')
    });
  };

  displaystellarAccount(value: any) {
    if (this.state.idsstellarAccount && this.state.idsstellarAccount.length !== 0) {
      const list = [];
      for (const i in this.state.idsstellarAccount) {
        if (this.state.idsstellarAccount[i]) {
          list.push(this.state.idsstellarAccount[i].id);
        }
      }
      return list;
    }
    if (value.stellarAccounts && value.stellarAccounts.length !== 0) {
      const list = [];
      for (const i in value.stellarAccounts) {
        if (value.stellarAccounts[i]) {
          list.push(value.stellarAccounts[i].id);
        }
      }
      this.setState({
        idsstellarAccount: keysToValues(list, this.props.stellarAccounts, 'id')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { userProfileEntity, stellarAccounts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jbanksterApp.userProfile.home.createOrEditLabel">
              <Translate contentKey="jbanksterApp.userProfile.home.createOrEditLabel">Create or edit a UserProfile</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userProfileEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-profile-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="jbanksterApp.userProfile.phone">Phone</Translate>
                  </Label>
                  <AvField id="user-profile-phone" type="text" name="phone" />
                </AvGroup>
                <AvGroup>
                  <Label for="stellarAccounts">
                    <Translate contentKey="jbanksterApp.userProfile.stellarAccount">Stellar Account</Translate>
                  </Label>
                  <AvInput
                    id="user-profile-stellarAccount"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakestellarAccounts"
                    value={this.displaystellarAccount(userProfileEntity)}
                    onChange={this.stellarAccountUpdate}
                  >
                    <option value="" key="0" />
                    {stellarAccounts
                      ? stellarAccounts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="user-profile-stellarAccount" type="hidden" name="stellarAccounts" value={this.state.idsstellarAccount} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-profile" replace color="info">
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
  stellarAccounts: storeState.stellarAccount.entities,
  userProfileEntity: storeState.userProfile.entity,
  loading: storeState.userProfile.loading,
  updating: storeState.userProfile.updating
});

const mapDispatchToProps = {
  getStellarAccounts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileUpdate);
