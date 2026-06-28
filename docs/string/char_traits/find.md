# std::char_traits&lt;char&gt;::find, std::char_traits&lt;wchar_t&gt;::find, std::char_traits&lt;char8_t&gt;::find, std::char_traits&lt;char16_t&gt;::find, std::char_traits&lt;char32_t&gt;::find

static const char_type*  
find( const char_type* ptr, [std::size_t](<#/doc/types/size_t>) count, const char_type& ch ); |  |  (constexpr desde C++17)  

  
Procura pelo caractere `ch` dentro dos primeiros `count` caracteres da sequência apontada por `ptr`.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre `character traits` para `X::find`.

### Parâmetros

ptr  |  \-  |  ponteiro para uma string de caracteres a ser pesquisada   
---|---|---
count  |  \-  |  o número de caracteres a serem analisados   
ch  |  \-  |  o caractere a ser procurado   
  
### Valor de retorno

Um ponteiro para o primeiro caractere no `range` especificado por `[`ptr`, `ptr + count`)` que se compara como igual a `ch`, ou um ponteiro nulo se não for encontrado.

### Complexidade

Linear em `count`.