# iter_swap(ranges::zip_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept(/* veja abaixo */)
requires (std::indirectly_swappable<ranges::iterator_t<
/*maybe-const*/<Const, Views>>> && ...);  // (desde C++23)
```

  
Executa [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(std::get<i>(x.current_), std::get<i>(y.current_)) para cada inteiro `i` em `[`​0​`, `sizeof...(Views)`)`, onde `_current__` denota o objeto subjacente tipo tupla que contém iterators para elementos de views adaptadas.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `zip_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  iterators para os elementos a serem trocados   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(  

(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(  
declval<const [ranges::iterator_t](<#/doc/ranges/iterator_t>)</*maybe-const*/<Const, Views>>&>(),  

declval<const [ranges::iterator_t](<#/doc/ranges/iterator_t>)</*maybe-const*/<Const, Views>>&>())) &&...))