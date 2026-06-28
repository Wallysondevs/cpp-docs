# std::experimental::basic_string_view&lt;CharT,Traits&gt;::size, std::experimental::basic_string_view&lt;CharT,Traits&gt;::length

constexpr size_type size() const noexcept; |  |  (library fundamentals TS)  
---|---|---
constexpr size_type length() const noexcept; |  |  (library fundamentals TS)  

  
Retorna o número de elementos `CharT` na view, isto é, [std::distance](<#/doc/iterator/distance>)(begin(), end()).

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos `CharT` na view.

### Complexidade

Constante.

### Ver também

[ empty](<#/doc/experimental/basic_string_view/empty>) |  verifica se a view está vazia   
(função membro pública)  
[ max_size](<#/doc/experimental/basic_string_view/max_size>) |  retorna o número máximo de caracteres   
(função membro pública)