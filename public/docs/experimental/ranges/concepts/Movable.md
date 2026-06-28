# std::experimental::ranges::Movable

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Movable =
std::is_object<T>::value &&
MoveConstructible<T> &&
Assignable<T&, T> &&
Swappable<T>;
```

O concept `Movable<T>` especifica que `T` é um tipo de objeto que pode ser movido (isto é, pode ser construído por movimento, atribuído por movimento, e lvalues do tipo `T` podem ser trocados).

Não é necessário que exista qualquer relação de subsunção entre `Movable<T>` e `[std::is_object](<#/doc/types/is_object>)<T>::value`.

### Veja também

[ Copyable](<#/doc/experimental/ranges/concepts/Copyable>) | especifica que um objeto de um tipo pode ser copiado, movido e trocado
(concept)