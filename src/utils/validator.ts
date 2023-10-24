export const checkEnvironment = (envNames: string[]): boolean => {
  for (const envName of envNames) {
    if (!_isValid(envName)) return false;
  }
  return true;
};

const _isValid = (envName: string): boolean => {
  const env = process.env[envName];
  return env !== undefined && env !== '';
};
