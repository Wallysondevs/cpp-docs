# std::char_traits&lt;char&gt;::eof, std::char_traits&lt;wchar_t&gt;::eof, std::char_traits&lt;char8_t&gt;::eof, std::char_traits&lt;char16_t&gt;::eof, std::char_traits&lt;char32_t&gt;::eof

static int_type eof(); |  |  (constexpr desde C++11)  
(noexcept desde C++11)  

  
Retorna um valor não equivalente a qualquer valor válido do tipo `char_type`.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caracteres para `X::eof`.

### Parâmetros

(nenhum)

### Valor de retorno

`char_type` | eof()  
---|---
char | [EOF](<#/doc/io/c>)  
wchar_t | WEOF  
char8_t | uma constante definida pela implementação que  
não pode aparecer como uma unidade de código UTF-8 válida   
char16_t | uma constante definida pela implementação que  
não pode aparecer como uma unidade de código UTF-16 válida   
char32_t | uma constante definida pela implementação que  
não pode aparecer como um ponto de código Unicode   
  
### Complexidade

Constante.

### Veja também

[ not_eof](<#/doc/string/char_traits/not_eof>)[static] | verifica se um caractere é o valor _eof_   
(função membro estática pública)  