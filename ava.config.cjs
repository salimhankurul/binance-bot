module.exports = {
  timeout: '180s',
  files: ['**/Tests/*.test.ts'],
  extensions: ['ts', 'js'],
  require: ['ts-node/register', 'tsconfig-paths/register', 'dotenv/config'],
}
