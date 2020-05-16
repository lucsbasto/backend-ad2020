class RaffleService {
  async init(users) {
    var matched = this.raffle(users);
    var isMatched = matched.every(this.isMatched);
    while (!isMatched) {
      matched = this.raffle(users);
      var isMatched = matched.every(this.isMatched);
    }
    try {
      matched.map(async user => await user.save());
      return matched;
    } catch (error) {
      throw new Error();
    }
  }

  raffle(users) {
    const shuffled = this.shuffle([...users]);
    const matched = this.match(users, shuffled);
    return matched;
  }

  shuffle(users) {
    var i, t, j;
    for (i = users.length - 1; i > 0; i -= 1) {
      t = users[i];
      j = Math.floor(Math.random() * (i + 1));
      users[i] = users[j];
      users[j] = t;
    }
    return users;
  }

  match(users, shuffled) {
    users.map((user, index) => {
      user.friend = shuffled[index].name;
    });
    return users;
  }

  isMatched(user) {
    return user.name !== user.friend;
  }
}

export default new RaffleService();
