# std::common_with

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T, class U >
concept common_with =
std::same_as<std::common_type_t<T, U>, std::common_type_t<U, T>> &&
requires {
static_cast<std::common_type_t<T, U>>(std::declval<T>());
static_cast<std::common_type_t<T, U>>(std::declval<U>());
} &&
std::common_reference_with<
std::add_lvalue_reference_t<const T>,
std::add_lvalue_reference_t<const U>> &&
std::common_reference_with<
std::add_lvalue_reference_t<std::common_type_t<T, U>>,
std::common_reference_t<
std::add_lvalue_reference_t<const T>,
std::add_lvalue_reference_t<const U>>>;
```

O concept `common_with<T, U>` especifica que dois tipos `T` e `U` compartilham um _tipo comum_ (conforme calculado por [std::common_type_t](<#/doc/types/common_type>)) ao qual ambos podem ser convertidos.

### Requisitos semânticos

T e U modelam std::common_with<T, U> somente se, dadas expressões [que preservam a igualdade](<#/doc/concepts>) `t1`, `t2`, `u1` e `u2` tais que decltype((t1)) e decltype((t2)) são ambos `T` e decltype((u1)) e decltype((u2)) são ambos `U`,

  * [std::common_type_t](<#/doc/types/common_type>)<T, U>(t1) é igual a [std::common_type_t](<#/doc/types/common_type>)<T, U>(t2) se e somente se `t1` for igual a `t2`; e
  * [std::common_type_t](<#/doc/types/common_type>)<T, U>(u1) é igual a [std::common_type_t](<#/doc/types/common_type>)<T, U>(u2) se e somente se `u1` for igual a `u2`.

Em outras palavras, a conversão para o tipo comum deve [preservar a igualdade](<#/doc/concepts>).

### Preservação da igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library devem [preservar a igualdade](<#/doc/concepts>) (exceto onde indicado de outra forma).

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 18.4.6 Concept `common_with` [concept.common]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 18.4.6 Concept `common_with` [concept.common]

### Veja também

[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos
(modelo de classe)
[ common_referencebasic_common_reference](<#/doc/types/common_reference>)(C++20) | determina o tipo de referência comum de um grupo de tipos
(modelo de classe)
[ common_reference_with](<#/doc/concepts/common_reference_with>)(C++20) | especifica que dois tipos compartilham um tipo de referência comum
(concept)