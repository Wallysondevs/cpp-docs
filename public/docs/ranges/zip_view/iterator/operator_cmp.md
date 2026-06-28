# operator==,&lt;=&gt;(ranges::zip_view::iterator)

```cpp
friend constexpr bool operator==( const /*iterator*/& x, const /*iterator*/& y )
requires (std::equality_comparable<
ranges::iterator_t</*maybe-const*/<Const, Views>>> && ...);  // (1) (desde C++23)
friend constexpr auto operator<=>( const /*iterator*/& x, const /*iterator*/& y )
requires ranges::random_access_range<Base>;  // (2) (desde C++23)
```

  
Compara os iteradores subjacentes.

Seja `_current__` o objeto _tuple-like_ subjacente de iteradores para elementos de views adaptadas.

1) Retorna:

  * x.current_ == y.current_ se /*all-bidirectional*/<Const, Views...> for verdadeiro.
  * Caso contrário, verdadeiro se existir um inteiro 0 <= i < sizeof...(Views) tal que bool(std::get<i>(x.current_) == std::get<i>(y.current_)) seja verdadeiro.
  * Caso contrário, falso.

2) Equivalente a return x.current_ <=> y.current_;.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::ranges::zip_view::_iterator_ <Const>` é uma classe associada dos argumentos.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Parâmetros

x, y  |  \-  |  iteradores a serem comparados   
  
### Valor de retorno

O resultado da comparação

### Veja também

[ operator==](<#/doc/ranges/zip_view/sentinel/operator_cmp>)(C++23) |  compara um sentinel com um iterator retornado de [`zip_view::begin`](<#/doc/ranges/zip_view/begin>)   
(função)  