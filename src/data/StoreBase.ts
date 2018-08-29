import * as React from 'react';
import * as _ from 'lodash';
import { connect } from "react-redux";

export type ActionsManifest<T> = {
  [actionName in keyof T]: object;
};

type WrappedPayload<T> = {
  type: any;
  payload: T;
}
type AvailableActionsBundle<ManifestT extends ActionsManifest<ManifestT>, Keys extends string | number | symbol> =
{
  [key in Keys]: ManifestT[key] & {type: key}
}
type AvailableActions<ManifestT extends ActionsManifest<ManifestT>> =
  AvailableActionsBundle<ManifestT, keyof ManifestT>[keyof ManifestT];
type ReducerFn<StateT, ActionT> = (state: StateT, action: WrappedPayload<ActionT>) => StateT

export type Reducers<StateT, ManifestT extends ActionsManifest<ManifestT>> = {
  [action in keyof ManifestT]: ReducerFn<StateT, ManifestT[action]>;
}

export type ActTypeGenerator<ManifestT extends ActionsManifest<ManifestT>> = (action: AvailableActions<ManifestT>) => void;

export abstract class ReduxBase<StateT, ManifestT extends ActionsManifest<ManifestT>>
{
  constructor(private namespace: string, private createDefaultstate: (... args: any[]) => StateT)
  {

  }

  public abstract reducers: Reducers<StateT, ManifestT>;

  public reducer(state: StateT = this.createDefaultstate(), action): StateT
  {
    if (action.namespace !== this.namespace || this.reducers[action.type] === undefined)
    {
      return state;
    }
    else
    {
      return this.reducers[action.type](state, action);
    }
  }

  public exportReducer(): (state, action) => void
  {
    return this.reducer.bind(this);
  }
}

export function BaseConnect(component, stateMap: object, dispatchMap: object)
{
  const mapProps = (state, ownProps) => 
  {
    const resultMap = { };
    for (const key of Object.keys(stateMap)) // no ES2017
    {
      const value = stateMap[key];
      resultMap[key] = state[value];
    }
    return resultMap;
  }

  const mapDispatch = (dispatch) =>
  {
    const resultMap = { };
    for (const key of Object.keys(dispatchMap))
    {
      const value = dispatchMap[key];
      const injectNamespace = (action) => {
        return {
          type: action.type,
          namespace: value,
          payload: action,
        };
      }
      resultMap[key] = (action) => dispatch(injectNamespace(action));
    }
    return resultMap;
  }
  return connect(mapProps, mapDispatch)(component);
}
