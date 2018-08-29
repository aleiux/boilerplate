import { List, Map } from 'immutable';
import { ReduxBase, ActionsManifest, Reducers, ActTypeGenerator } from 'src/data/StoreBase';
import { RecordToSelf, CreateConstructor } from 'src/data/RecordUtil';

class AppStateC
{

}
export type AppState = RecordToSelf<AppStateC>;
export const _AppState = CreateConstructor(AppStateC); 


interface Manifest extends ActionsManifest<Manifest>
{
  placeholder: {

  }
}

class AppRedux extends ReduxBase<AppState, Manifest>
{
  public reducers: Reducers<AppState, Manifest> = {
    placeholder: (state, action) => {
      return state;
    }
  }
}

export const namespace = 'app';
export type AppActions = ActTypeGenerator<Manifest>;
export const AppReducer = (new AppRedux(namespace, _AppState)).exportReducer();