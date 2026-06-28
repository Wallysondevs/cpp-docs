# std::convertible_to

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class From, class To >
concept convertible_to =
std::is_convertible_v<From, To> &&
requires {
static_cast<To>(std::declval<From>());
};
```

  
O concept convertible_to<From, To> especifica que uma expressão do mesmo tipo e categoria de valor que as de [std::declval](<#/doc/utility/declval>)&lt;From&gt;() pode ser implicitamente e explicitamente convertida para o tipo `To`, e as duas formas de conversão produzem resultados iguais. 

### Requisitos semânticos

convertible_to<From, To> é modelado apenas se, dada uma função `fun` do tipo [std::add_rvalue_reference_t](<#/doc/types/add_reference>)&lt;From&gt;() tal que a expressão fun() seja [equality-preserving](<#/doc/concepts>), 

  * Ou 
    * `To` não é um tipo de objeto nem um tipo de referência a objeto, ou 
    * static_cast<To>(fun()) é igual a []() -> To { return fun(); }(), e 

  * Uma das seguintes afirmações é verdadeira: 
    * [std::add_rvalue_reference_t](<#/doc/types/add_reference>)<From> não é um tipo de referência a objeto, ou 
    * [std::add_rvalue_reference_t](<#/doc/types/add_reference>)<From> é uma rvalue reference para um tipo não qualificado como const, e o estado resultante do objeto referenciado por fun() é válido mas não especificado após qualquer uma das expressões acima; ou 
    * o objeto referenciado por fun() não é modificado por qualquer uma das expressões acima. 

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos standard library concepts são exigidas como sendo [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma). 

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 18.4.4 Concept `convertible_to` [concept.convertible] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 18.4.4 Concept `convertible_to` [concept.convertible] 

### Veja também

[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) |  verifica se um tipo pode ser convertido para o outro tipo   
(class template)  