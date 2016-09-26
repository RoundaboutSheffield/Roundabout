cancelUnless((me || isRoot), "You must be logged in to access appointments", 401);

if (!isRoot || (me && me.id !== this.userId)) {
  cancel();
}