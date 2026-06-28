# std::regex_iterator&lt;BidirIt,CharT,Traits&gt;::operator==,operator!=

```cpp
bool operator==( const regex_iterator& rhs ) const;  // (1) (desde C++11)
bool operator!=( const regex_iterator& rhs ) const;  // (2) (desde C++11)
(até C++20)
```

  
Compara dois `regex_iterator`s. 

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

rhs  |  \-  |  um `regex_iterator` para comparar   
  
### Valor de retorno

Para fins de exposição, assuma que `regex_iterator` contém os seguintes membros: 

  * `BidirIt begin`; 
  * `BidirIt end`; 
  * const regex_type *pregex;
  * [std::regex_constants::match_flag_type](<#/doc/regex/match_flag_type>) flags;
  * [std::match_results](<#/doc/regex/match_results>)&lt;BidirIt&gt; match;

1) Retorna `true` se `*this` e `rhs` são ambos iteradores de fim de sequência, ou se todas as seguintes condições são verdadeiras: 

  * begin == rhs.begin
  * end == rhs.end
  * pregex == rhs.pregex
  * flags == rhs.flags
  * match[0] == rhs.match[0]

2) Retorna !(*this == rhs).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   