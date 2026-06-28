# std::experimental::ranges::CopyConstructible

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool CopyConstructible =
MoveConstructible<T> &&
Constructible<T, T&> && ConvertibleTo<T&, T> &&
Constructible<T, const T&> && ConvertibleTo<const T&, T> &&
Constructible<T, const T> && ConvertibleTo<const T, T>;
```

O concept `CopyConstructible` é satisfeito se `T` é um tipo de referência lvalue, ou se é um tipo de objeto [`MoveConstructible`](<#/doc/experimental/ranges/concepts/MoveConstructible>) onde um objeto desse tipo pode ser construído a partir de um lvalue (possivelmente const) ou rvalue const desse tipo em contextos de inicialização direta e por cópia com a semântica usual (uma cópia é construída com a origem inalterada).

Mais precisamente, se `T` é um tipo de objeto, então `CopyConstructible<T>` é satisfeito apenas se, dado

  * `v`, um lvalue do tipo (possivelmente const) `T` ou um rvalue do tipo const T,

o seguinte é verdadeiro:

  * Após a definição T u = v;, `u` é igual a `v`;
  * T{v} é igual a `v`.

### Veja também

[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor de cópia
(modelo de classe)