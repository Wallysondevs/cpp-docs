# std::char_traits&lt;char&gt;::copy, std::char_traits&lt;wchar_t&gt;::copy, std::char_traits&lt;char8_t&gt;::copy, std::char_traits&lt;char16_t&gt;::copy, std::char_traits&lt;char32_t&gt;::copy

static char_type*  
copy( char_type* dest, const char_type* src, [std::size_t](<#/doc/types/size_t>) count ); |  |  (constexpr desde C++20)  

  
Copia `count` caracteres da string de caracteres apontada por `src` para a string de caracteres apontada por `dest`.

Se `[`dest`, `dest + count`)` e `[`src`, `src + count`)` se sobrepuserem, o comportamento é indefinido.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caracteres para `X::copy`.

### Parâmetros

dest  |  \-  |  ponteiro para uma string de caracteres para copiar para   
---|---|---
src  |  \-  |  ponteiro para uma string de caracteres para copiar de   
count  |  \-  |  o número de caracteres a copiar   
  
### Valor de retorno

dest

### Exceções

Não lança exceções.

### Complexidade

Linear em `count`.

### Veja também

[ assign](<#/doc/string/char_traits/assign>)[static] |  atribui um caractere   
(função membro estática pública)  