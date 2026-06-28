# std::char_traits&lt;char&gt;::not_eof, std::char_traits&lt;wchar_t&gt;::not_eof, std::char_traits&lt;char8_t&gt;::not_eof, std::char_traits&lt;char16_t&gt;::not_eof, std::char_traits&lt;char32_t&gt;::not_eof

static int_type not_eof( int_type e ); |  |  (constexpr desde C++11)  
(noexcept desde C++11)  

  
Dado `e`, produz um valor adequado que não é equivalente a `_eof_`.

Esta função é tipicamente usada quando um valor diferente de `_eof_` precisa ser retornado, como em implementações de [std::basic_streambuf::overflow()](<#/doc/io/basic_streambuf/overflow>).

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre *character traits* para `X::not_eof`.

### Parâmetros

e  |  \-  |  valor a ser analisado   
  
### Valor de retorno

`e` se `e` e o valor `_eof_` não forem equivalentes, ou algum outro valor não-eof caso contrário.

### Complexidade

Constante.

### Veja também

[ eof](<#/doc/string/char_traits/eof>)[static] |  retorna um valor `_eof_`   
(função membro estática pública)  