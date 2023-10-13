import { Auth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';

import { login } from '../api';
import { auth } from '../firebase';

type TStoredUserData = {
  uid: string;
  name: string;
};

export class Authorization {
  auth: Auth;
  provider: GoogleAuthProvider;
  signInWithPopup: typeof signInWithPopup;
  user: TStoredUserData = { uid: "", name: "" };
  // class managing auth with firebase and logging in with popup
  constructor() {
    this.auth = auth;
    this.auth.useDeviceLanguage();
    this.provider = new GoogleAuthProvider();
    // this.provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    this.provider.setCustomParameters({
      login_hint: "name",
    });
    this.signInWithPopup = signInWithPopup;
    this.user = this.getUserFromLocalStorage();
  }

  playerData;

  loginUser = async (uid: string) => {
    const res = await login(uid);
    console.log("logging res: ", res);
    return res.data;
  };

  // sign in with popup
  async signIn(cb: (result: TStoredUserData) => void) {
    console.log("this.user: ", this.user);
    if (this.user.uid) {
      await this.loginUser(this.user.uid);
      cb(this.user);
      return;
    }
    const result_1 = await this.signInWithPopup(this.auth, this.provider);

    await this.loginUser(result_1.user?.uid as string);
    this.user = {
      uid: result_1.user?.uid as string,
      name: result_1.user?.displayName as string,
    };
    this.storeUserInLocalStorage();
    // this.uid = result_1.user?.uid;
    cb(this.user);
  }

  // sign out
  signOut() {
    localStorage.removeItem("uid");
    return this.auth.signOut();
  }

  // get current user
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // get current user id
  getCurrentUserId() {
    return this.user.uid;
  }

  // get current user email
  getCurrentUserEmail() {
    return this.auth.currentUser?.email;
  }

  storeUserInLocalStorage() {
    localStorage.setItem("uid", this.getCurrentUserId() as string);
    localStorage.setItem("name", this.user.name);
  }

  getUserFromLocalStorage(): TStoredUserData {
    const uid = localStorage.getItem("uid");
    const name = localStorage.getItem("name");
    return {
      uid: uid,
      name: name,
    };
  }
}
