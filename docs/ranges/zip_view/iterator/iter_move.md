# iter_move(ranges::zip_view::iterator)

```cpp
friend constexpr auto iter_move( const iterator& i ) noexcept(/* see below */);  // (desde C++23)
```

  
Equivalente a: return /*tuple-transform*/([ranges::iter_move](<#/doc/iterator/ranges/iter_move>), i.current_);, onde [`_current__`](<#/doc/ranges/zip_view/iterator>) denota o objeto subjacente semelhante a tupla que mantém iteradores para elementos de views adaptadas.

Esta função não é visível para a pesquisa (lookup) comum [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>), e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `zip_view::_iterator_ <Const>` é uma classe associada dos argumentos.

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

std::move(*i) se *i for uma referência lvalue, caso contrário *i

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(  

(  
noexcept  
(  
[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)  
(  
declval<const [ranges::iterator_t](<#/doc/ranges/iterator_t>)</*maybe-const*/<Const, Views>>&>()  
)  
)  
and ...  
)  
and  
(  
[std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)  
<  
[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)</*maybe-const*/<Const, Views>>  
>  
and ...  
)  

)