# boolean-testable

```cpp
template< class B >
concept __boolean_testable_impl = std::convertible_to<B, bool>;  // (1) (desde C++20)
(apenas para exposição*)
template< class B >
concept boolean-testable =
__boolean_testable_impl<B> &&
requires (B&& b) {
{ !std::forward<B>(b) } -> __boolean_testable_impl;
};  // (2) (desde C++20)
```

  
O concept apenas para exposição `_boolean-testable_` especifica os requisitos para expressões que são conversíveis para `bool` e para as quais os operadores lógicos têm o comportamento usual (incluindo [avaliação de curto-circuito](<https://en.wikipedia.org/wiki/Short-circuit_evaluation> "enwiki:Short-circuit evaluation")), mesmo para dois tipos `_boolean-testable_` diferentes. 

Formalmente, para modelar o concept apenas para exposição `___boolean_testable_impl_`, o tipo não deve definir nenhum operador membro `operator&&` e `operator||`, e nenhum operador não-membro `operator&&` e `operator||` viável pode ser visível por [argument-dependent lookup](<#/doc/language/adl>). Adicionalmente, dada uma expressão `e` tal que `decltype((e))` é `B`, `_boolean-testable_` é modelado apenas se `bool(e) == !bool(!e)`. 

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [preservadoras de igualdade](<#/doc/concepts>) (exceto onde indicado de outra forma). 

### Notas

Exemplos de tipos `_boolean-testable_` incluem `bool`, [std::true_type](<#/doc/types/integral_constant>), [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;::[`reference`](<#/doc/utility/bitset/reference>), e `int*`. 

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 18.5.2 Testabilidade booleana [concept.booleantestable] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 18.5.2 Testabilidade booleana [concept.booleantestable] 
