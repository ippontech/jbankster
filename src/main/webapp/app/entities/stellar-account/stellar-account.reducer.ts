import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IStellarAccount, defaultValue } from 'app/shared/model/stellar-account.model';

export const ACTION_TYPES = {
  FETCH_STELLARACCOUNT_LIST: 'stellarAccount/FETCH_STELLARACCOUNT_LIST',
  FETCH_STELLARACCOUNT: 'stellarAccount/FETCH_STELLARACCOUNT',
  CREATE_STELLARACCOUNT: 'stellarAccount/CREATE_STELLARACCOUNT',
  UPDATE_STELLARACCOUNT: 'stellarAccount/UPDATE_STELLARACCOUNT',
  DELETE_STELLARACCOUNT: 'stellarAccount/DELETE_STELLARACCOUNT',
  RESET: 'stellarAccount/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStellarAccount>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StellarAccountState = Readonly<typeof initialState>;

// Reducer

export default (state: StellarAccountState = initialState, action): StellarAccountState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STELLARACCOUNT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STELLARACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STELLARACCOUNT):
    case REQUEST(ACTION_TYPES.UPDATE_STELLARACCOUNT):
    case REQUEST(ACTION_TYPES.DELETE_STELLARACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STELLARACCOUNT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STELLARACCOUNT):
    case FAILURE(ACTION_TYPES.CREATE_STELLARACCOUNT):
    case FAILURE(ACTION_TYPES.UPDATE_STELLARACCOUNT):
    case FAILURE(ACTION_TYPES.DELETE_STELLARACCOUNT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STELLARACCOUNT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STELLARACCOUNT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STELLARACCOUNT):
    case SUCCESS(ACTION_TYPES.UPDATE_STELLARACCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STELLARACCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/stellar-accounts';

// Actions

export const getEntities: ICrudGetAllAction<IStellarAccount> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STELLARACCOUNT_LIST,
  payload: axios.get<IStellarAccount>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStellarAccount> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STELLARACCOUNT,
    payload: axios.get<IStellarAccount>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStellarAccount> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STELLARACCOUNT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStellarAccount> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STELLARACCOUNT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStellarAccount> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STELLARACCOUNT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
