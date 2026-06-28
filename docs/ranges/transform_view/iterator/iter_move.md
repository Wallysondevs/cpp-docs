# iter_move(ranges::transform_view::iterator)

```cpp
friend constexpr decltype(auto) iter_move( const /*iterator*/& i )
noexcept(/* see below */);  // (desde C++20)
```

  
Se *i for uma lvalue reference, retorna [`std::move`](<#/doc/utility/move>)(*i); caso contrário, retorna *i.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `transform_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  [iterator](<#/doc/ranges/transform_view/iterator>)  
  
### Valor de retorno

std::move(*i) se *i for uma lvalue reference, caso contrário *i

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([std::invoke](<#/doc/utility/functional/invoke>)(*i.parent_->fun_, *i.current_)))

onde *i.parent_->fun_ denota a função de transformação, i.current_ denota o iterator subjacente.