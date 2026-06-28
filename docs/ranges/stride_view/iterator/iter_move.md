# iter_move(ranges::stride_view::iterator)

```cpp
friend constexpr ranges::range_rvalue_reference_t<Base>
iter_move( const /*iterator*/& i ) noexcept(/* see below */);  // (desde C++23)
```

  
Retorna o resultado da aplicação de [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator subjacente [`_current__`](<#/doc/ranges/stride_view/iterator>). 

Equivalente a return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.current_);. 

Esta função não é visível para pesquisa comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `stride_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i  |  \-  |  [iterator](<#/doc/ranges/stride_view/iterator>)  
  
### Valor de retorno

O resultado da aplicação de [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator armazenado. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.current_)))

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) |  converte o resultado da desreferência de um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  