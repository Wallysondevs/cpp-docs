# std::incrementable_traits

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
struct incrementable_traits {};
template< class T >
requires std::is_object_v<T>
struct incrementable_traits<T*>;
template< class T >
struct incrementable_traits<const T>
: incrementable_traits<T> {};
template< class T >
requires requires { typename T::difference_type; }
struct incrementable_traits<T>;
template< class T >
requires (!requires { typename T::difference_type; }) &&
requires(const T& a, const T& b) { { a - b } -> std::integral; }
struct incrementable_traits<T>;
```

Calcula o tipo de diferença associado do tipo `I`, se houver. Um programa pode especializar `incrementable_traits` para um [tipo definido pelo programa](<#/doc/language/type-id>).

1) O template primário é uma struct vazia.

2) Especialização para ponteiros.

Fornece um tipo membro `difference_type` igual a [std::ptrdiff_t](<#/doc/types/ptrdiff_t>).

3) Especialização para tipos qualificados com const.

4) Especialização para tipos que definem um tipo membro `difference_type` público e acessível.

Fornece um tipo membro `difference_type` igual a `T::difference_type`.

5) Especialização para tipos que não definem um tipo membro `difference_type` público e acessível, mas suportam subtração.

Fornece um tipo membro `difference_type` igual a [std::make_signed_t](<#/doc/types/make_signed>)<decltype([std::declval](<#/doc/utility/declval>)&lt;T&gt;() - [std::declval](<#/doc/utility/declval>)&lt;T&gt;())>. A regra de variações de expressão implícitas (veja abaixo) se aplica à expressão `a - b`.

### Variações de expressão implícitas

Uma [requires expression](<#/doc/language/requires>) que usa uma expressão não modificadora para algum operando lvalue constante também requer [variações de expressão implícitas](<#/doc/concepts>).

### Exemplo

| Esta seção está incompleta
---|---
Razão: sem exemplo |

### Veja também

[ weakly_incrementable](<#/doc/iterator/weakly_incrementable>)(C++20) | especifica que um tipo [`semiregular`](<#/doc/concepts/semiregular>) pode ser incrementado com operadores de pré e pós-incremento
(concept)
[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterator
(alias template)
[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece uma interface uniforme para as propriedades de um iterator
(class template)