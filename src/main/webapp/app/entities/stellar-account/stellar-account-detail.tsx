import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stellar-account.reducer';
import { IStellarAccount } from 'app/shared/model/stellar-account.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStellarAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class StellarAccountDetail extends React.Component<IStellarAccountDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stellarAccountEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jbanksterApp.stellarAccount.detail.title">StellarAccount</Translate> [<b>{stellarAccountEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="jbanksterApp.stellarAccount.name">Name</Translate>
              </span>
            </dt>
            <dd>{stellarAccountEntity.name}</dd>
            <dt>
              <span id="accountId">
                <Translate contentKey="jbanksterApp.stellarAccount.accountId">Account Id</Translate>
              </span>
            </dt>
            <dd>{stellarAccountEntity.accountId}</dd>
            <dt>
              <span id="secretSeed">
                <Translate contentKey="jbanksterApp.stellarAccount.secretSeed">Secret Seed</Translate>
              </span>
            </dt>
            <dd>{stellarAccountEntity.secretSeed}</dd>
          </dl>
          <Button tag={Link} to="/entity/stellar-account" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/stellar-account/${stellarAccountEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ stellarAccount }: IRootState) => ({
  stellarAccountEntity: stellarAccount.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StellarAccountDetail);
