<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:zod-v4-rules -->

# Zod v4 Conventions

This project uses Zod 4 (`zod: ^4.x`). Many string validation methods from Zod 3 are deprecated in favor of top-level schema constructors:

- Use `z.email()` instead of `z.string().email()`
- Use `z.uuid()` instead of `z.string().uuid()`
- Use `z.url()` or `z.httpUrl()` instead of `z.string().url()`
- Use `z.emoji()` instead of `z.string().emoji()`
- Use `z.nanoid()` instead of `z.string().nanoid()`
- Use `z.cuid()` instead of `z.string().cuid()` for existing CUID contracts; use `z.cuid2()` for fields explicitly representing CUID2 identifiers
- Use `z.ulid()` instead of `z.string().ulid()`
- Use `z.ipv4()`, `z.ipv6()`, `z.cidrv4()`, `z.cidrv6()` instead of `z.string().ip()`
- Use `z.iso.datetime()`, `z.iso.date()`, `z.iso.time()` instead of `z.string().datetime()`
- Use `z.e164()` for E.164 phone formats where applicable
- Use `z.enum(EnumObject)` instead of `z.nativeEnum(EnumObject)` (`z.nativeEnum` is merged into `z.enum`)

<!-- END:zod-v4-rules -->
