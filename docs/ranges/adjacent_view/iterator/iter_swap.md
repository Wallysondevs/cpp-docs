# iter_swap(ranges::adjacent_view::iterator)

```cpp
friend constexpr void iter_swap( const /*iterator*/& x, const /*iterator*/& y )
noexcept( /*see below*/ )
requires std::indirectly_swappable<ranges::iterator_t<Base>>;  // (desde C++23)
```

  
Troca os objetos apontados por dois arrays subjacentes de iterators (denotados como [`_current__`](<#/doc/ranges/adjacent_view/iterator>)). 

Equivalente a: 
```
    for (std::size_t i{}; i != N; ++i)
    {
        std::ranges::iter_swap(x.current_[i], y.current_[i]);
    }
```

O comportamento é indefinido se antes da operação nenhum dos iterators em x.current_ for igual a um iterator em y.current_. 

Esta função não é visível para pesquisa [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `adjacent_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  iterators   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação `noexcept`: 

noexcept(std::[ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(declval<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;>(),  
declval<[ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;>()))

### Veja também

[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos desreferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators   
(modelo de função)