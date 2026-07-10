import { getQuery } from './dbAsync.js';

export const findProfessorByCode = (code) => getQuery(
  'SELECT id, name, code FROM professors WHERE code = ?',
  [code]
);
