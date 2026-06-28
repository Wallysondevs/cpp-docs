# std::movable

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept movable =
std::is_object_v<T> &&
std::move_constructible<T> &&
std::assignable_from<T&, T> &&
std::swappable<T>;
```

O concept `movable<T>` especifica que `T` é um tipo de objeto que pode ser movido (isto é, pode ser construído por movimento, atribuído por movimento, e lvalues do tipo `T` podem ser trocados).

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 18.6 Object concepts [concepts.object]

* Padrão C++20 (ISO/IEC 14882:2020):

* 18.6 Object concepts [concepts.object]

### Veja também

[ copyable](<#/doc/concepts/copyable>)(C++20) | especifica que um objeto de um tipo pode ser copiado, movido e trocado
(concept)