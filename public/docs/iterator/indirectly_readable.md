# std::indirectly_readable

Definido no header `[<iterator>](<#/doc/header/iterator>)`

```cpp
template< class In >
concept __IndirectlyReadableImpl =
requires(const In in) {
typename std::iter_value_t<In>;
typename std::iter_reference_t<In>;
typename std::iter_rvalue_reference_t<In>;
{ *in } -> std::same_as<std::iter_reference_t<In>>;
{ ranges::iter_move(in) } -> std::same_as<std::iter_rvalue_reference_t<In>>;
} &&
std::common_reference_with<
std::iter_reference_t<In>&&, std::iter_value_t<In>&
> &&
std::common_reference_with<
std::iter_reference_t<In>&&, std::iter_rvalue_reference_t<In>&&
> &&
std::common_reference_with<
std::iter_rvalue_reference_t<In>&&, const std::iter_value_t<In>&
>;
template< class In >
concept indirectly_readable =
__IndirectlyReadableImpl<std::remove_cvref_t<In>>;  // (desde C++20)
```

O concept `indirectly_readable` é modelado por tipos que são legíveis aplicando o operator*, como ponteiros, smart pointers e input iterators.

### Requisitos semânticos

Dado um valor `i` do tipo `I`, `I` modela `indirectly_readable` apenas se todos os concepts que ele subsume forem modelados e a expressão `*i` for [equality-preserving](<#/doc/concepts>).

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [equality-preserving](<#/doc/concepts>) (exceto onde indicado de outra forma).