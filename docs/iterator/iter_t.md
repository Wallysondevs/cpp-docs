# std::iter_value_t, std::iter_reference_t, std::iter_const_reference_t, std::iter_difference_t, std::iter_rvalue_reference_t, std::iter_common_reference_t

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class T >
using iter_value_t = /* see below */;
template< /*dereferenceable*/ T >
using iter_reference_t = decltype(*std::declval<T&>());
template< std::indirectly_readable T >
using iter_const_reference_t =
std::common_reference_t<const std::iter_value_t<T>&&,
std::iter_reference_t<T>>;
template< class T >
using iter_difference_t = /* see below */;
template< /*dereferenceable*/ T>
requires /* see below */
using iter_rvalue_reference_t =
decltype(ranges::iter_move(std::declval<T&>()));
template< std::indirectly_readable T >
using iter_common_reference_t =
std::common_reference_t<std::iter_reference_t<T>,
/*indirect-value-t*/<T>>;
Templates auxiliares
template< class T >
concept /*dereferenceable*/ = /* see below */;
template< std::indirectly_readable T >
using /*indirect-value-t*/ = /* see below */;
```

Calcula os tipos associados de um iterador.

1) Calcula o [tipo de valor](<#/doc/iterator>) de `T`.

  * Se [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;> não for especializado, então std::iter_value_t&lt;T&gt; é [std::indirectly_readable_traits](<#/doc/iterator/indirectly_readable_traits>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;>::value_type.
  * Caso contrário, é [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;>::value_type.

2) Calcula o _tipo de referência_ de `T`.

3) Calcula o _tipo de referência const_ de `T`.

4) Calcula o [tipo de diferença](<#/doc/iterator>) de `T`.

  * Se [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;> não for especializado, então std::iter_difference_t&lt;T&gt; é [std::incrementable_traits](<#/doc/iterator/incrementable_traits>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;>::difference_type.
  * Caso contrário, é [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;T&gt;>::difference_type.

5) Calcula o _tipo de referência rvalue_ de `T`. A restrição neste alias template é satisfeita se e somente se a expressão [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)([std::declval](<#/doc/utility/declval>)<T&>()) for válida e tiver um tipo referenciável.

6) Calcula o _tipo de referência comum_ de `T`. Este é o tipo de referência comum entre seu tipo de referência e uma referência lvalue para seu tipo de valor.

7) O concept _dereferenceable_ (apenas para exposição) é satisfeito se e somente se a expressão *[std::declval](<#/doc/utility/declval>)<T&>() for válida e tiver um [tipo referenciável](<#/doc/meta>).

8) O alias template _indirect-value-t_ (apenas para exposição) denota o seguinte:

  * [std::invoke_result_t](<#/doc/types/result_of>)<Proj&, /*indirect-value-t*/&lt;I&gt;> se `T` for o mesmo que std::[projected](<#/doc/iterator/projected>)<I, Proj> para alguns tipos `I` e `Proj`.
  * Caso contrário, std::iter_value_t&lt;T&gt;&.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[P2609R3](<https://wg21.link/P2609R3>) | C++20 | `std::iter_common_reference_t` foi definido em termos
de std::iter_value_t&lt;T&gt;&, o que lidava incorretamente com
tipos [std::projected](<#/doc/iterator/projected>) que projetam em tipos de referência rvalue | definido em termos de
/*indirect-value-t*/&lt;T&gt;
para lidar com tais casos

### Ver também

```cpp
 indirectly_readable(C++20) | especifica que um tipo é indiretamente legível aplicando o operador `*`
(concept)
 weakly_incrementable(C++20) | especifica que um tipo `semiregular` pode ser incrementado com operadores de pré e pós-incremento
(concept)
 indirectly_readable_traits(C++20) | calcula o tipo de valor de um tipo `indirectly_readable`
(class template)
 incrementable_traits(C++20) | calcula o tipo de diferença de um tipo `weakly_incrementable`
(class template)
 iterator_traits | fornece uma interface uniforme para as propriedades de um iterador
(class template)
 ranges::iterator_tranges::const_iterator_tranges::sentinel_tranges::const_sentinel_t(C++20)(C++23)(C++20)(C++23) | obtém tipos de iterador e sentinela de um range
(alias template)
 ranges::range_reference_tranges::range_const_reference_tranges::range_rvalue_reference_tranges::range_common_reference_t(C++20)(C++23)(C++20)(C++20) | obtém tipos de referência de um range
(alias template)
 ranges::range_difference_tranges::range_size_tranges::range_value_t(C++20)(C++20)(C++20) | obtém tipos de tamanho, diferença e valor de um range
(alias template)
```