import { transformSchemaToRules } from 'shared/src/utils/schema';
import { Schema } from 'shared/types/schema';

export function createSchema(schemas: Record<string, Schema>) {
  return transformSchemaToRules(schemas);
}
