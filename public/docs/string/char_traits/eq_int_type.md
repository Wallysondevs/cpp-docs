# std::char_traits&lt;char&gt;::eq_int_type, std::char_traits&lt;wchar_t&gt;::eq_int_type, std::char_traits&lt;char8_t&gt;::eq_int_type, std::char_traits&lt;char16_t&gt;::eq_int_type, std::char_traits&lt;char32_t&gt;::eq_int_type

static bool eq_int_type( int_type c1, int_type c2 ); |  |  (constexpr desde C++11)  
(noexcept desde C++11)  

  
Verifica se dois valores do tipo `int_type` são iguais.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caractere para `X::eq_int_type`.

### Parâmetros

c1, c2  |  \-  |  valores para comparar   
  
### Valor de retorno

true se c1 for igual a c2, false caso contrário.

### Complexidade

Constante.