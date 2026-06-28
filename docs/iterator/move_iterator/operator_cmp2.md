# operator==(std::move_iterator&lt;Iter&gt;, std::move_sentinel)

```cpp
template< std::sentinel_for<Iter> S >
friend constexpr bool
operator==( const move_iterator& i, const std::move_sentinel<S>& s );  // (desde C++20)
```

  
Compara um `move_iterator` e um `move_sentinel`.

Esta sobrecarga participa da resolução de sobrecarga somente se i.base() == s.base() for bem-formado e conversível para bool.

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando [std::move_iterator](<#/doc/iterator/move_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

i  |  \-  |  o move iterator a comparar   
---|---|---
s  |  \-  |  o move sentinel a comparar   
  
### Valor de retorno

i.base() == s.base()

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/move_iterator/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) |  compara os iterators subjacentes   
(template de função)  