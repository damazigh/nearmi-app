import { Auth, Hub } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { anonymous, userAuthenticated } from './action/account.action';

export default class AmplifyBridge {
  constructor(store) {
    this.store = store;

    this.onHubCapsule = this.onHubCapsule.bind(this);
    Hub.listen('auth', this, 'AmplifyBridge'); // Add this component as a listener of auth events.

    this.checkUser(); // first check
  }

  onHubCapsule(capsule) {
    this.checkUser(); // triggered every time user sign in / out
  }

  checkUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.store.dispatch(userAuthenticated(user));
      })
      .catch((err) => {
        this.store.dispatch(anonymous());
      });
  }
}
