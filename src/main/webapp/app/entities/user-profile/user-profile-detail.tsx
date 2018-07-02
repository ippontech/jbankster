import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table, Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import StellarSdk from 'stellar-sdk';
import { STELLAR_SERVER } from '../../config/constants';
export interface IUserProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class UserProfileDetail extends React.Component<IUserProfileDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userProfileEntity } = this.props;
    const stellarServer = new StellarSdk.Server(STELLAR_SERVER);
    StellarSdk.Network.useTestNetwork();
    const pair = StellarSdk.Keypair.random();
    const accountId = pair.publicKey();
    // tslint:disable-next-line
    console.log(`
      Congrats, you have a Stellar account in the test network!
      seed: ${pair.secret()}
      id: ${pair.publicKey()}
    `);
    const stellarAccount = stellarServer.loadAccount(pair.publicKey()).then(account => account);
    // .then(account => {
    //   const transaction = new StellarSdk.TransactionBuilder(account)
    //     // Add a payment operation to the transaction
    //     .addOperation(StellarSdk.Operation.payment({
    //       destination: pair.publicKey(),
    //       // The term native asset refers to lumens
    //       asset: StellarSdk.Asset.native(),
    //       // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
    //       // the decimal. They are represented in JS Stellar SDK in string format
    //       // to avoid errors from the use of the JavaScript Number data structure.
    //       amount: '350.1234567'
    //     }))
    //     // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
    //     // .addMemo(StellarSdk.Memo.text('Hello world!'))
    //     .build();

    //   // Sign this transaction with the secret key
    //   // NOTE: signing is transaction is network specific. Test network transactions
    //   // won't work in the public network. To switch networks, use the Network object
    //   // as explained above (look for StellarSdk.Network).
    //   transaction.sign(pair);

    //   // Submit the transaction to the Horizon server. The Horizon server will then
    //   // submit the transaction into the network for us.
    //   stellarServer.submitTransaction(transaction)
    //     .then(transactionResult => {
    //       // tslint:disable-next-line
    //       console.log(JSON.stringify(transactionResult, null, 2));
    //       // tslint:disable-next-line
    //       console.log('\nSuccess! View the transaction at: ');
    //       // tslint:disable-next-line
    //       console.log(transactionResult._links.transaction.href);
    //       transactions = stellarServer.transactions()
    //         .forAccount(accountId)
    //         .call()
    //         .then(page => page.records);
    //     })
    //     .catch(err => {
    //       // tslint:disable-next-line
    //       console.log('An error has occured:');
    //       // tslint:disable-next-line
    //       console.log(err);
    //     });
    // })
    // .catch(e => console.error(e));
    return (
      <Row>
        <Col md="4">
          <h2>
            <Translate contentKey="jbanksterApp.userProfile.detail.title">UserProfile</Translate> [<b>{userProfileEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="phone">
                <Translate contentKey="jbanksterApp.userProfile.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{userProfileEntity.phone}</dd>
            <dt>
              <Translate contentKey="jbanksterApp.userProfile.stellarAccount">Stellar Account</Translate>
            </dt>
            <dd>
              {/* {userProfileEntity.stellarAccounts
                ? userProfileEntity.stellarAccounts.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userProfileEntity.stellarAccounts.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null} */}
              {JSON.stringify(stellarAccount)}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/user-profile" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
        {/* <Col md="8">
          <Table bordered>
            <thead>
              <tr>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(transactions).map(
                (configPropKey, configPropIndex) =>
                  configPropKey !== 'status' ? (
                    <tr key={configPropIndex}>
                      <td>{configPropKey}</td>
                      <td>
                        <Badge color={data[configPropKey].status !== 'UP' ? 'danger' : 'success'}>{data[configPropKey].status}</Badge>
                      </td>
                      <td>
                        {data[configPropKey].details ? (
                          <a onClick={this.getSystemHealthInfo(configPropKey, data[configPropKey])}>
                            <FontAwesomeIcon icon="eye" />
                          </a>
                        ) : null}
                      </td>
                    </tr>
                  ) : null
              )}
              <tr>
                <td>{JSON.stringify(transactions)}</td>
              </tr>
            </tbody>
          </Table>
        </Col> */}
      </Row>
    );
  }
}

const mapStateToProps = ({ userProfile }: IRootState) => ({
  userProfileEntity: userProfile.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetail);
