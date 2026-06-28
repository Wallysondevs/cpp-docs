# std::experimental::ranges::Copyable

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Copyable =
CopyConstructible<T> &&
Movable<T> &&
Assignable<T&, const T&>;
```

O concept `Copyable<T>` especifica que `T` é um tipo de objeto [`Movable`](<#/doc/experimental/ranges/concepts/Movable>) que também pode ser copiado (isto é, ele suporta construção por cópia e atribuição por cópia).

### Notas

Pretende-se que `Copyable<T>` também exija que `Assignable<T&, const T>` (atribuição de rvalue const) e `Assignable<T&, T&>` (atribuição de lvalue não-const) sejam satisfeitas.

### Veja também

[ Movable](<#/doc/experimental/ranges/concepts/Movable>) | especifica que um objeto de um tipo pode ser movido e trocado
(concept)