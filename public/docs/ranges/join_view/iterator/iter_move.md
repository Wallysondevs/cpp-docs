# iter_move(ranges::join_view::iterator)

```cpp
friend constexpr decltype(auto) iter_move( const /*iterator*/& i )
noexcept( /*ver abaixo*/ );  // (desde C++20)
```

  
Converte o resultado da desreferenciação do iterator subjacente i.[`_inner__`](<#/doc/ranges/join_view/iterator>) para seu tipo de referência rvalue associado.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `join_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

Equivalente a: [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.inner_).

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.inner_)))

### Ver também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  