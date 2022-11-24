export async function updateUserById(db, id, update) {
  return db.collection('users').findOneAndUpdate(
    { _id: id },
    { $set: update },
    { returnOriginal: false },
  ).then(({ value }) => value);
}


export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db.collection('users').findOne({
    email,
  }).then((user) => user || null);
}

export async function findUserById(db, userId) {
  const res = await db.collection('users').findOne({
    _id: userId,
  }).then((user) => user || null);

  return res;
}