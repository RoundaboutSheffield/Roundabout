cancelUnless(me, "You must be logged in to access contacts", 401);

// if (me.id !== this.userId) {
//   cancel();
// }

this.fullName = `${this.firstName} ${this.lastName}`;