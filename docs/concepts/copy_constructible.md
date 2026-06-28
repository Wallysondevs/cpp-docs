# std::copy_constructible

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept copy_constructible =
std::move_constructible<T> &&
std::constructible_from<T, T&> && std::convertible_to<T&, T> &&
std::constructible_from<T, const T&> && std::convertible_to<const T&, T> &&
std::constructible_from<T, const T> && std::convertible_to<const T, T>;
```

O concept `copy_constructible` é satisfeito se T é um tipo de referência lvalue, ou se é um tipo de objeto [`move_constructible`](<#/doc/concepts/move_constructible>) onde um objeto desse tipo pode ser construído a partir de um lvalue (possivelmente const) ou rvalue const desse tipo em ambos os contextos de inicialização direta e por cópia com a semântica usual (uma cópia é construída com a origem inalterada).

### Requisitos semânticos

Se T é um tipo de objeto, então `copy_constructible<T>` é modelado apenas se, dado

  * v, um lvalue do tipo T (possivelmente const) ou um rvalue do tipo const T,

o seguinte for verdadeiro:

  * Após a definição T u = v;, u é igual a v e v não é modificado;
  * T(v) é igual a v e não modifica v.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 18.4.14 Concept `copy_constructible` [concept.copyconstructible]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 18.4.14 Concept `copy_constructible` [concept.copyconstructible]

### Veja também

[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor de cópia
(class template)