# std::experimental::source_location::source_location

constexpr source_location() noexcept; | (1) | (library fundamentals TS v2)
---|---|---
source_location( const source_location& other ) = default; | (2) | (library fundamentals TS v2)
(implicitly declared)
source_location( source_location&& other ) = default; | (3) | (library fundamentals TS v2)
(implicitly declared)

1) Constrói um objeto `source_location` cujos valores são definidos pela implementação.

2,3) Construtores de cópia e de movimento declarados implicitamente.

### Parâmetros

- **other** — outro `source_location` para copiar

### Ver também

[ current](<#/doc/experimental/source_location/current>)[static] | constrói um novo `source_location`
(função membro estática pública)