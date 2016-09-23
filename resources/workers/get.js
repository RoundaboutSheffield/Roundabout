cancelUnless(me, "You must be logged in to access workers", 401);

if (me.id !== this.userId) {
  cancel();
}
