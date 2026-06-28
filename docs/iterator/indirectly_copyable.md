# std::indirectly_copyable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class In, class Out >
concept indirectly_copyable =
std::indirectly_readable<In> &&
std::indirectly_writable<Out, std::iter_reference_t<In>>;
```

O concept `indirectly_copyable` especifica a relação entre um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) e um tipo que é [`indirectly_writable`](<#/doc/iterator/indirectly_writable>). O tipo `indirectly_writable` deve ser capaz de copiar diretamente o objeto que o tipo `indirectly_readable` referencia.

### Veja também

[ indirectly_movable](<#/doc/iterator/indirectly_movable>)(C++20) | especifica que valores podem ser movidos de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>)
(concept)
[ indirectly_copyable_storable](<#/doc/iterator/indirectly_copyable_storable>)(C++20) | especifica que valores podem ser copiados de um tipo [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) para um tipo [`indirectly_writable`](<#/doc/iterator/indirectly_writable>) e que a cópia pode ser realizada através de um objeto intermediário
(concept)