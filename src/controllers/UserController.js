import * as Yup from 'yup';
import User from '../models/User';
import UserService from '../services/UserService';

class UserController {
  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const users = await User.find({})
        .select('name email friend')
        .limit(limit * 1)
        .skip((page - 1) * limit);
      const count = await User.countDocuments();

      return res.status(200).json({
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        total: count,
        users,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(403).json({ error: 'Id not sent' });

      if (!User.isValid(id))
        return res.status(403).json({ error: 'This id is not valid' });

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: 'User not found.' });

      return res.json({ user });
    } catch (error) {
      throw new Error(error);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { name, email } = req.body;
    const user_exists = await User.findOne({ email: req.body.email });

    if (user_exists)
      return res.status(401).json({ error: 'User already exists !' });

    const { _id } = await UserService.store(name, email);
    return res.status(201).json({ _id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    if (!id) return res.status(403).json({ error: 'Id not sent' });

    if (!User.isValid(id))
      return res.status(403).json({ error: 'This id is not valid' });
    const { name, email } = req.body;
    const { _id } = await UserService.update({ id, name, email });
    return res.json({ _id, name, email });
  }

  async destroy(req, res) {
    const { id } = req.params;
    if (!id) return res.status(403).json({ error: 'Id not sent' });

    if (!User.isValid(id))
      return res.status(403).json({ error: 'This id is not valid' });
    const user_exists = await User.findById(id);
    if (!user_exists)
      return res.status(404).json({ error: 'User not found !' });
    const deleted = UserService.destroy(id);
    if (deleted) return res.status(200).json({ message: 'User deleted' });
    else return res.status(500).json({ message: 'Error' });
  }
}

export default new UserController();
