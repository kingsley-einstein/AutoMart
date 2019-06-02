/**
 *
 * @param {any} obj
 * @param {string[]} keys
 */
export const checkIfKeysArePresent = (obj, keys) => keys.every(
  value => Object.keys(obj).some(
    item => item === value
  )
);

export const showMissingKeysError = (obj, keys, res) => {
  const missingKeys = [];
  keys.forEach((key) => {
    if (!Object.keys(obj).some(value => value === key)) missingKeys.push(key);
  });

  res.status(400).json({
    status: 400,
    error: `Missing required parameters ${missingKeys}`
  });
};
