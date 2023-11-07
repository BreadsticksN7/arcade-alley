"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');
const { sqlForPartialUpdate } = require('../helpers/sql');
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../middleware/expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');

// User functions
// Handles authentication of user accounts
// along with creating, finding, updating and deleting user accounts
class User {
  // Authenticates user with { username, password }
  // Throws unauthorized error if user isn't found or wrong password
  // Returns [{ username, first/last_name, email, is_admin }]
  static async authenticate(){
    const result = await db.query(
      `SELECT username,
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin
      FROM users
      Where username = $1`,
      [username]
    );
    const user = result.rows[0];
    if (user){
      // Compare password to hash
      const passValid = await bcrypt.compare(password, user.password);
      if (passValid === true){
        delete user.password;
        return user;
      }
    };
    throw new UnauthorizedError("Invalid username or password");
  };

  // Create new user account
  // Bcrypt hashs the password - complexitiy based on env
  static async regUser({
    username, password, firstName, lastName, email, isAdmin
  }){
    const duplicateCheck = await db.query(
      `SELECT username
      FROM users
      WHERE username = $1`,
      [username]
    );
    if (duplicateCheck.rows[0]){
      throw new BadRequestError(`Username already taken: ${username}`);
    };
    const hashPass = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users
      (username, password, first_name, last_name, email, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"`,
      [username, hashPass, firstName, lastName, email, isAdmin],
    );
    const user = result.rows[0];
    return user;
  };

  // Find all users
  // Returns [{ username, first/last_name, email, is_admin }]
  static async findAll(){
    const result = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin"
      FROM users
      ORDER BY username`,
    );
    return result.rows;
  };

  // Get specific user
  static async getUser(username){
    const [result] = await Promise.all([
      db.query(
        `SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin"
        FROM users
        WHERE username = $1`, [username]
      ),
    ]);
    const userContent = result.rows[0];
    if (!userContent) throw new NotFoundError(`No user found: ${username}`);
    return userContent;
  };

  // Update user
  static async updateUser(username, data){
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(
      data,
      { username: "username",
        firstName: "first_name",
        lastName: "last_name",
        email: "email",
        isAdmin: "is_admin"}
    );
    const usernameVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE users
                      SET ${setCols}
                      WHERE username = ${usernameVarIdx}
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];
    return user;
  };

  // Delete user
  static async delUser(username){
    let result = await db.query(
      `DELETE
      FROM users
      WHERE username = $1
      RETURNING username`,
      [username]
    );
    const user = result.rows[0];
    if (!user) throw new NotFoundError(`Unable to delete; user not found: ${username}`)
  };
};

module.exports = User;