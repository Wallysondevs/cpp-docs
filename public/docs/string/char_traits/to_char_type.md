# std::char_traits&lt;char&gt;::to_char_type, std::char_traits&lt;wchar_t&gt;::to_char_type, std::char_traits&lt;char8_t&gt;::to_char_type, std::char_traits&lt;char16_t&gt;::to_char_type, std::char_traits&lt;char32_t&gt;::to_char_type

static char_type to_char_type( int_type c ); |  |  (constexpr desde C++11)  
(noexcept desde C++11)  

  
Converte c para `char_type`. Se não houver um valor `char_type` equivalente (como quando c é uma cópia do valor [`eof()`](<#/doc/string/char_traits/eof>)), o resultado é não especificado.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caractere para `X::to_char_type`.

### Parâmetros

c  |  \-  |  valor a converter   
  
### Valor de retorno

Um valor equivalente a c.

### Complexidade

Constante.