const User = require('../models/User');
const RaffleService = require('../services/RaffleService');
const EmailService = require('../services/EmailService');

class RaffleController {
  async raffle(_req, res) {
    const users = await User.find({});
    if (users.length <= 1)
      return res.status(403).json({
        error: 'It is not possible to raffle with just one person registered',
      });

    const raffled = await RaffleService.init(users);

    raffled.map(async user => {
      await EmailService.send(user.name, user.email, user.friend);
    });

    return res.status(200).json({
      message: 'users Raffled and sent by email',
    });
  }
}

module.exports = new RaffleController();
