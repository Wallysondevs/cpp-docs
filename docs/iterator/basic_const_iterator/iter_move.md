# iter_move(std::basic_const_iterator&lt;Iter&gt;)

```cpp
friend constexpr /*rvalue-reference*/
iter_move( const basic_const_iterator& i ) noexcept(/* see below */);  // (desde C++23)
```

  
Converte o resultado da desreferenciação do iterator subjacente para o seu tipo de referência rvalue const associado.

O tipo de retorno /*rvalue-reference*/ é [std::common_reference_t](<#/doc/types/common_reference>)<const [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;&&, [std::iter_rvalue_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;>.

O corpo da função é equivalente a  
return static_cast</*rvalue-reference*/>(std::[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.base()));.

Esta função não é visível para a [busca não qualificada](<#/doc/language/unqualified_lookup>) ou [busca qualificada](<#/doc/language/qualified_lookup>) ordinária, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando [std::basic_const_iterator](<#/doc/iterator/basic_const_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos.

### Parâmetro

i  |  \-  |  um `basic_const_iterator`  
  
### Valor de retorno

Uma referência rvalue para const, ou um prvalue.

### Exceções

Especificação `noexcept`:

noexcept(noexcept(static_cast</*rvalue-reference*/>(std::[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.base()))))

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(desde C++20) | converte o resultado da desreferenciação de um objeto para o seu tipo de referência rvalue associado  
(objeto de ponto de customização)  