# std::char_traits&lt;char&gt;::compare, std::char_traits&lt;wchar_t&gt;::compare, std::char_traits&lt;char8_t&gt;::compare, std::char_traits&lt;char16_t&gt;::compare, std::char_traits&lt;char32_t&gt;::compare

static int compare( const char_type* s1, const char_type* s2,  
[std::size_t](<#/doc/types/size_t>) count ); |  |  (constexpr desde C++17)  

  
Compara os primeiros count caracteres das cadeias de caracteres s1 e s2. A comparação é feita lexicograficamente.

Se count for zero, as cadeias são consideradas iguais.

Veja [CharTraits](<#/doc/named_req/CharTraits>) para os requisitos gerais sobre traits de caracteres para `X::compare`.

### Parâmetros

s1, s2  |  \-  |  ponteiros para cadeias de caracteres a comparar   
---|---|---
count  |  \-  |  o número de caracteres a comparar de cada cadeia de caracteres   
  
### Valor de retorno

Valor negativo se s1 for _menor que_ s2.

​0​ se s1 for _igual a_ s2.

Valor positivo se s1 for _maior que_ s2.

### Complexidade

Linear em count.