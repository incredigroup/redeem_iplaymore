import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  wallet: { type: String },
  email: { type: String, unique: true },
  route: { type: String },
  created_at: { type: Date },
});
export default mongoose.models.User || mongoose.model('User', UserSchema);

export async function checkUserByWallet(db, wallet) {
  const res = await db.collection('user').findOne({
    wallet: wallet,
  }).then((user) => user || null);

  return res;
}


