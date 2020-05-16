import User from '../models/User';

class UserService {
  async store(name, email) {
    try {
      const user = await User.create({ name, email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(data) {
    try {
      const { id, name, email } = data;
      const user = await User.findById(id);
      if (!user) return false;
      if (name) user.set('name', name);
      if (email) user.set('email', email);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async destroy(id) {
    try {
      const user = await User.findById(id);
      if (!user) return false;
      await user.remove();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UserService();
