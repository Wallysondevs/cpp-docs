# iter_move(ranges::cartesian_product_view::iterator)

```cpp
friend constexpr auto iter_move( const /*iterator*/& i ) noexcept(/* see below */)  // (desde C++23)
```

  
Seja [`_current__`](<#/doc/ranges/cartesian_product_view/iterator>) a tupla subjacente de iterators. 

Equivalente a: return /*tuple-transform*/([ranges::iter_move](<#/doc/iterator/ranges/iter_move>), i.current_);

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `cartesian_product_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

Uma tupla que contém o resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) aos iterators subjacentes armazenados convertidos para o tipo de retorno, conforme descrito acima. 

### Exceções

A especificação de exceção é equivalente ao AND lógico das seguintes expressões: 

  * noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(std::get&lt;N&gt;(i.current_))) para cada inteiro 0 ≤ N ≤ sizeof...(Vs), 
  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)</*maybe-const*/<Const, T>>> para cada tipo `T` em `First, Vs...`. 

### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) |  converte o resultado de desreferenciar um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  