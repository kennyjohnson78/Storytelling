export { AuthenticationStateModule } from './src/authentication-state.module';
import * as fromAuthentication from './src/+state/actions/authentication-state.actions';
export { fromAuthentication };
export {
  selectUser,
  selectIsLoggedIn,
  selectTokenExpiresIn,
  selectLoginPagePending,
  selectLoginPageError
} from './src/+state/selectors/authentication-state.selectors';
export { AuthenticationState } from './src/+state/states/authentication-state.state';
