const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Signup = async ({ Firstname, Lastname, email, password }) => {
  try {
    if (!Firstname || !Lastname || !email || !password) {
      return {
        status: 400,
        body: {
          success: false,
          message: "All fields are required",
        },
      };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: 400,
        body: {
          success: false,
          message: "User already exists",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      Firstname,
      Lastname,
      email,
      password: hashedPassword,
    });

    return {
      status: 201,
      body: {
        success: true,
        message: "User registered successfully",
        data: user,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: {
        success: false,
        message: "There was an error during signup",
      },
    };
  }
};exports.Login = async ({ email, password }) => {
  try {
    if (!email || !password) {
      return {
        status: 400,
        body: {
          success: false,
          message: "All fields are required",
        },
      };
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return {
        status: 401,
        body: {
          success: false,
          message: "User does not exist or password missing",
        },
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: 401,
        body: {
          success: false,
          message: "Invalid credentials",
        },
      };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return {
      status: 200,
      body: {
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: {
        success: false,
        message: "There was an error during login",
      },
    };
  }
};