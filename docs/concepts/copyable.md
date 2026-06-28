# std::copyable

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept copyable =
std::copy_constructible<T> &&
std::movable<T> &&
std::assignable_from<T&, T&> &&
std::assignable_from<T&, const T&> &&
std::assignable_from<T&, const T>;
```

O concept `copyable<T>` especifica que `T` é um tipo de objeto [`movable`](<#/doc/concepts/movable>) que também pode ser copiado (ou seja, ele suporta construção por cópia e atribuição por cópia).

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 18.6 Conceitos de objeto [concepts.object]

* Padrão C++20 (ISO/IEC 14882:2020):

* 18.6 Conceitos de objeto [concepts.object]

### Veja também

[ movable](<#/doc/concepts/movable>)(C++20) | especifica que um objeto de um tipo pode ser movido e trocado
(concept)