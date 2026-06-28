# std::indirectly_comparable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I1, class I2, class Comp,
class Proj1 = std::identity, class Proj2 = std::identity >
concept indirectly_comparable =
std::indirect_binary_predicate<Comp, std::projected<I1, Proj1>, std::projected<I2, Proj2>>;
```

O concept `indirectly_comparable` especifica o requisito fundamental de algoritmo para comparar valores entre dois ranges independentes.

### Requisitos semânticos

`indirectly_comparable` é modelado apenas se todos os concepts que ele subsume forem modelados.

### Veja também

[ indirect_binary_predicate](<#/doc/iterator/indirect_binary_predicate>)(C++20) | especifica que um tipo invocável, quando invocado com o resultado da desreferenciação de dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), satisfaz [`predicate`](<#/doc/concepts/predicate>)
(concept)