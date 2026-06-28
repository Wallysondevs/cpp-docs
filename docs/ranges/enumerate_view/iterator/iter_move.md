# iter_move(ranges::enumerate_view::iterator)

```cpp
friend constexpr auto iter_move( const /*iterator*/& i ) noexcept(/* see below */)  // (desde C++23)
```

  
Seja [`_current__`](<#/doc/ranges/enumerate_view/iterator>) o iterator subjacente, [`_pos__`](<#/doc/ranges/enumerate_view/iterator>) o índice subjacente, e [`_Base_`](<#/doc/ranges/enumerate_view/iterator>) o tipo (possivelmente cv-qualificado) da sequência subjacente. 

Equivalente a: 
```cpp
    template<class D, class B>
    using tuple = std::tuple<D, ranges::range_rvalue_reference_t<B>>;
    
    return tuple<difference_type, Base>(i.pos_, ranges::iter_move(i.current_));
```

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `enumerate_view::_iterator_ <Const>` é uma classe associada dos argumentos. 

### Parâmetros

i  |  \-  |  iterator   
  
### Valor de retorno

Uma tupla que contém um índice e o resultado de aplicar [ranges::iter_move](<#/doc/iterator/ranges/iter_move>) ao iterator armazenado. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

```cpp
noexcept(  

noexcept(ranges::iter_move(i.current_)) and  
std::is_nothrow_move_constructible_v<  
ranges::range_rvalue_reference_t<Base>>  

)
```

### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado de desreferenciar um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  