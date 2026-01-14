# Schemas

Esta carpeta centraliza todos los JSON Schemas del proyecto.

## Archivos

### `appearance.schema.json`
- **Generado desde:** `src/embeds/appearance/types.ts`
- **Tipo:** `SoyioAppearance`
- **Uso:** 
  - Exportado públicamente para validación de configuraciones de apariencia
  - Útil para usuarios que solo necesitan validar appearance sin el config completo
- **Script:** `yarn generate-schema:appearance`

### `config.schema.json`
- **Generado desde:** `src/schema-types.ts`
- **Tipo:** `SoyioWidgetConfig`
- **Uso:** 
  - Exportado públicamente para validación completa de configuración del widget
  - Usado por el smoke test para validación en Monaco Editor
  - Contiene las definiciones de `SoyioAppearance` (hay duplicación intencional)
- **Script:** `yarn generate-schema:config`

## Regeneración

Para regenerar todos los schemas:

```bash
yarn generate-schema
```

O individualmente:

```bash
yarn generate-schema:appearance
yarn generate-schema:config
```

## Validación en CI

El workflow `schema-validation.yaml` verifica automáticamente que:

1. ✅ Los schemas generados coinciden con los commiteados
2. ✅ No hay cambios en tipos sin regenerar schemas
3. ✅ Todos los archivos de schema requeridos existen

**Si el CI falla:** Ejecuta `yarn generate-schema` y commitea los cambios.

## Notas

- Los schemas se generan automáticamente desde los tipos TypeScript usando `ts-json-schema-generator`
- **No editar manualmente** estos archivos, ya que serán sobrescritos
- Los schemas se regeneran automáticamente al ejecutar `yarn smoke`
- Hay duplicación intencional entre `appearance.schema.json` y las definiciones en `config.schema.json`
  - Esto permite que usuarios externos validen solo appearance si lo necesitan
  - `config.schema.json` es la fuente completa que incluye todo
