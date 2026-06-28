# std::experimental::ranges::reference_t, std::experimental::ranges::rvalue_reference_t, std::experimental::ranges::iter_common_reference_t

Definido no cabeçalho `[<experimental/ranges/iterator>](<#/doc/header/experimental/ranges/iterator>)`

```c
template< class T >
concept bool /*dereferenceable*/ = requires(T& t) { {*t} -> auto&&; };
template< /*dereferenceable*/ T >
using reference_t = decltype(*declval<T&>());
template< /*dereferenceable*/ T >
requires requires(T& t) { { ranges::iter_move(t) } -> auto&&; }
using rvalue_reference_t = decltype(ranges::iter_move(declval<T&>()));
template< Readable T >
using iter_common_reference_t = ranges::common_reference_t<ranges::reference_t<T>,
ranges::value_type_t<T>&>;
```

1) Obtém o _tipo de referência_ de um tipo `T` desreferenciável.

2) Obtém o _tipo de referência rvalue_ de um tipo `T` desreferenciável, ou seja, o tipo de retorno de [ranges::iter_move](<#/doc/iterator/ranges/iter_move>).

3) Calcula o _tipo de referência comum_ de um tipo [`Readable`](<#/doc/experimental/ranges/iterator/Readable>). Este é o tipo de referência comum de seu tipo de referência e uma referência lvalue para seu tipo de valor.

### Notas

A restrição `-> auto&&` verifica que o tipo da expressão não é `void`.