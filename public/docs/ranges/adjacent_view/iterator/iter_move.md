# iter_move(ranges::adjacent_view::iterator)

```cpp
friend constexpr auto iter_move( const /*iterator*/& i )
noexcept(/* see description */);  // (desde C++23)
```

  
Retorna o resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) aos iterators subjacentes.

Equivalente a: `return /*tuple-transform*/([ranges::iter_move](<#/doc/iterator/ranges/iter_move>), i.current_);`, onde [`_current__`](<#/doc/ranges/adjacent_view/iterator>) é um array subjacente de iterators.

Esta função não é visível para [unqualified lookup](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `adjacent_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

O resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) aos iterators subjacentes.

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(  

noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(declval<const [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;&>()))  
&&  
[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)&lt;Base&gt;>  

)

### Ver também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  