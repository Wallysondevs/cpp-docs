# std::unexpect_t, std::unexpect

Definido no cabeçalho `[<expected>](<#/doc/header/expected>)`

```c
struct unexpect_t { explicit unexpect_t() = default; };
inline constexpr std::unexpect_t unexpect{};
```

1) Um tipo de tag para construção in-place de um valor inesperado em um objeto `std::expected`.

2) Uma constante do tipo const std::unexpect_t que é geralmente passada diretamente para um construtor de `std::expected` para construir um valor inesperado.

### Notas

Assim como outros tipos de tag de construção, `unexpect_t` é uma classe trivial e vazia com um construtor padrão explícito.

### Veja também

[ (constructor)](<#/doc/utility/expected/expected>) | constrói o objeto `expected`
(função membro pública)
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) | tag de construção in-place
(tag)