# std::char_traits&lt;char&gt;::to_int_type, std::char_traits&lt;wchar_t&gt;::to_int_type, std::char_traits&lt;char8_t&gt;::to_int_type, std::char_traits&lt;char16_t&gt;::to_int_type, std::char_traits&lt;char32_t&gt;::to_int_type

static int_type to_int_type( char_type c ); | | (constexpr desde C++11)
(noexcept desde C++11)

Converte c para `int_type`.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre características de caracteres para `X::to_int_type`.

### Parâmetros

- **c** — valor a ser convertido

### Valor de retorno

Um valor equivalente a c.

### Complexidade

Constante.

### Observações

Para cada valor válido de `char_type`, deve haver um valor único de `int_type` distinto de [eof()](<#/doc/string/char_traits/eof>).