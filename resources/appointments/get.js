cancelUnless(me || isRoot, "You must be logged in to access appointments", 401);

if (me.id !== this.userId) {
  cancel();
}
