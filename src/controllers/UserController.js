const Yup = require('yup');
const User = require('../models/User');
const UserService = require('../services/UserService');

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
      if (!id) return res.status(403).json({ error: 'Id não enviado' });

      if (!User.isValid(id))
        return res.status(403).json({ error: 'Esse id não é válido' });

      const user = await User.findById(id);
      if (!user)
        return res.status(404).json({ error: 'Usuário não encontrado.' });

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
      return res.status(400).json({ error: 'A validação falhou.' });
    }
    const { name, email } = req.body;
    const user_exists = await User.findOne({ email: req.body.email });

    if (user_exists)
      return res
        .status(401)
        .json({ error: 'Esse usuário já existe no nosso banco de dados.' });

    const { _id } = await UserService.store(name, email);
    return res.status(201).json({ _id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'A validação falhou.' });
    }

    const { id } = req.params;
    if (!id) return res.status(403).json({ error: 'Id não enviado' });

    if (!User.isValid(id))
      return res.status(403).json({ error: 'Esse id não é válido' });
    const { name, email } = req.body;
    const { _id } = await UserService.update({ id, name, email });
    return res.json({ _id, name, email });
  }

  async destroy(req, res) {
    const { id } = req.params;
    if (!id) return res.status(403).json({ error: 'Id não enviado' });

    if (!User.isValid(id))
      return res.status(403).json({ error: 'Esse id não é válido' });
    const user_exists = await User.findById(id);
    if (!user_exists)
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    const deleted = UserService.destroy(id);
    if (deleted)
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    else return res.status(500).json({ message: 'Error' });
  }
}

module.exports = new UserController();
