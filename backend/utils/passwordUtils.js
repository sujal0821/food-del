/**
 * This utility file handles password hashing and comparison
 * It tries to use bcrypt first, and falls back to bcryptjs if bcrypt is not available
 */

let bcrypt;
try {
  // Try to require bcrypt
  bcrypt = await import('bcrypt');
} catch (e) {
  // Fall back to bcryptjs if bcrypt fails
  console.log('Using bcryptjs as fallback for bcrypt');
  bcrypt = await import('bcryptjs');
}

/**
 * Hash a password
 * @param {string} password - The password to hash
 * @param {number} saltRounds - The number of salt rounds
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

/**
 * Compare a password with a hash
 * @param {string} password - The password to compare
 * @param {string} hash - The hash to compare against
 * @returns {Promise<boolean>} - Whether the password matches the hash
 */
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export default {
  hashPassword,
  comparePassword
}; 