cancelUnless(me, "You must be logged in to access messages", 401);

if (me.id !== this.userId) {
  cancel();
}