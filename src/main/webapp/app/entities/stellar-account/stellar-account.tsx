import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './stellar-account.reducer';
import { IStellarAccount } from 'app/shared/model/stellar-account.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStellarAccountProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class StellarAccount extends React.Component<IStellarAccountProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { stellarAccountList, match } = this.props;
    return (
      <div>
        <h2 id="stellar-account-heading">
          <Translate contentKey="jbanksterApp.stellarAccount.home.title">Stellar Accounts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="jbanksterApp.stellarAccount.home.createLabel">Create new Stellar Account</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jbanksterApp.stellarAccount.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jbanksterApp.stellarAccount.accountId">Account Id</Translate>
                </th>
                <th>
                  <Translate contentKey="jbanksterApp.stellarAccount.secretSeed">Secret Seed</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {stellarAccountList.map((stellarAccount, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${stellarAccount.id}`} color="link" size="sm">
                      {stellarAccount.id}
                    </Button>
                  </td>
                  <td>{stellarAccount.name}</td>
                  <td>{stellarAccount.accountId}</td>
                  <td>{stellarAccount.secretSeed}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${stellarAccount.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${stellarAccount.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${stellarAccount.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stellarAccount }: IRootState) => ({
  stellarAccountList: stellarAccount.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StellarAccount);
