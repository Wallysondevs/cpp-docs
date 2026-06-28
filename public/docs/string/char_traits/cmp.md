# std::char_traits&lt;char&gt;::eq/lt, std::char_traits&lt;wchar_t&gt;::eq/lt, std::char_traits&lt;char8_t&gt;::eq/lt, std::char_traits&lt;char16_t&gt;::eq/lt, std::char_traits&lt;char32_t&gt;::eq/lt

static bool eq( char_type a, char_type b ); |  (1)  |  (constexpr desde C++11)  
(noexcept desde C++11)  
static bool lt( char_type a, char_type b ); |  (2)  |  (constexpr desde C++11)  
(noexcept desde C++11)  

  
Compara dois caracteres.

1) Compara a e b por igualdade, comporta-se identicamente a

  * static_cast&lt;unsigned char&gt;(a) == static_cast&lt;unsigned char&gt;(b), se `char_type` for char,
  * a == b caso contrário.

2) Compara a e b de tal forma que eles são totalmente ordenados, comporta-se identicamente a

  * static_cast&lt;unsigned char&gt;(a) < static_cast&lt;unsigned char&gt;(b), se `char_type` for char,
  * a < b caso contrário.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caracteres para `X::eq` e `X::lt`.

### Parâmetros

a, b  |  \-  |  valores de caracteres para comparar   
  
### Valor de retorno

1) true se a e b forem iguais, false caso contrário.

2) true se a for menor que b, false caso contrário.

### Complexidade

Constante.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 467](<https://cplusplus.github.io/LWG/issue467>) | C++98  | para [std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;, a semântica de `eq()` e `lt()` é a mesma que os operadores embutidos == e < em char, respectivamente[1](<#/doc/string/char_traits/cmp>) | alterado para os operadores embutidos == e < em unsigned char  
  
  1. [↑](<#/doc/string/char_traits/cmp>) A maioria das implementações chama [std::memcmp()](<#/doc/string/byte/memcmp>) para eficiência, o que interpreta os dados como arrays de unsigned char. Se char [for assinado](<#/doc/language/types>) em tais implementações, [std::char_traits](<#/doc/string/char_traits>)&lt;char&gt; falha em satisfazer os requisitos de [CharTraits](<#/doc/named_req/CharTraits>).
