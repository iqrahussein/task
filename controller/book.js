// import books from "../model/user.js";
import User from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";

export const createbook = async (req, res) => {
  try {
    console.log("body data", req.body);
    const book = new User(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).send(err);
  }
};
export const getbook = async (req, res) => {
  const book = await User.find();
  res.json(book);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedbook = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true }, // returns updated document
    );
    if (!updatedbook) {
      return res.status(404).send("User not found");
    }
    res.json(updatedbook);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
export const deletedbook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedbook = await User.findByIdAndDelete(id);
    if (!deletedbook) {
      return res.status(404).send("User not found");
    }
    res.send(`User with id ${id} deleted`);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

