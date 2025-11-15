import { getUserById } from '../services/userService.js';

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
