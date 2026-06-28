# std::common_reference_with

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T, class U >
concept common_reference_with =
std::same_as<std::common_reference_t<T, U>, std::common_reference_t<U, T>> &&
std::convertible_to<T, std::common_reference_t<T, U>> &&
std::convertible_to<U, std::common_reference_t<T, U>>;
```

  
O concept `common_reference_with<T, U>` especifica que dois tipos `T` e `U` compartilham um _tipo de referência comum_ (como calculado por std::common_reference_t) para o qual ambos podem ser convertidos. 

### Requisitos semânticos

T e U modelam std::common_reference_with<T, U> somente se, dadas expressões que [preservam a igualdade](<#/doc/concepts>) `t1`, `t2`, `u1` e `u2` tais que decltype((t1)) e decltype((t2)) são ambos `T` e decltype((u1)) e decltype((u2)) são ambos `U`, 

  * [std::common_reference_t](<#/doc/types/common_reference>)<T, U>(t1) é igual a [std::common_reference_t](<#/doc/types/common_reference>)<T, U>(t2) se e somente se `t1` é igual a `t2`; e 
  * [std::common_reference_t](<#/doc/types/common_reference>)<T, U>(u1) é igual a [std::common_reference_t](<#/doc/types/common_reference>)<T, U>(u2) se e somente se `u1` é igual a `u2`. 

Em outras palavras, a conversão para o tipo de referência comum deve [preservar a igualdade](<#/doc/concepts>). 

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 18.4.5 Concept `common_reference_with` [concept.commonref] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 18.4.5 Concept `common_reference_with` [concept.commonref] 

### Veja também

[ common_referencebasic_common_reference](<#/doc/types/common_reference>)(C++20) |  determina o tipo de referência comum de um grupo de tipos   
(modelo de classe)  
[ common_with](<#/doc/concepts/common_with>)(C++20) |  especifica que dois tipos compartilham um tipo comum   
(concept)  
[ common_type](<#/doc/types/common_type>)(C++11) |  determina o tipo comum de um grupo de tipos   
(modelo de classe)