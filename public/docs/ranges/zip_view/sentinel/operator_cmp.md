# operator==(ranges::zip_view::iterator, ranges::zip_view::sentinel)

```cpp
template< bool OtherConst >
requires (std::sentinel_for<
ranges::sentinel_t</*maybe-const*/<Const, Views>>,
ranges::iterator_t</*maybe-const*/<OtherConst, Views>>> && ...)
friend constexpr bool operator==( const /*iterator*/<OtherConst>& x,
const /*sentinel*/& y );  // (desde C++23)
```

  
Compara a tupla subjacente de iteradores de x com a tupla subjacente de sentinelas de y.

Esta função não é visível para pesquisa comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `zip_view::_sentinel_ <Const>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

x  |  \-  |  [iterator](<#/doc/ranges/zip_view/iterator>) a comparar   
---|---|---
y  |  \-  |  [sentinel](<#/doc/ranges/zip_view/sentinel>) a comparar   
  
### Valor de retorno

Seja x.current_ denotando a tupla subjacente de iteradores, e y.end_ denotando a tupla subjacente de sentinelas.

Retorna

  * `true` se pelo menos um iterador subjacente, obtido por uma expressão equivalente a `std::get<i>(x.current_)`, avalia como igual (usando um `operator==` apropriado) a alguma sentinela subjacente, obtida por uma expressão equivalente a `std::get<i>(y.end_)`, para algum índice `i` nos intervalos `0 <= i < sizeof...(Views)`,
  * `false` caso contrário.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   