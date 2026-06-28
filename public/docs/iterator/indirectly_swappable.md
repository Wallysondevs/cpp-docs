# std::indirectly_swappable

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I1, class I2 = I1 >
concept indirectly_swappable =
std::indirectly_readable<I1> &&
std::indirectly_readable<I2> &&
requires( const I1 i1, const I2 i2 )
{
ranges::iter_swap(i1, i1);
ranges::iter_swap(i1, i2);
ranges::iter_swap(i2, i1);
ranges::iter_swap(i2, i2);
};
```

O concept `indirectly_swappable` especifica uma relação entre dois tipos que modelam, respectivamente, [std::indirectly_readable](<#/doc/iterator/indirectly_readable>), onde seus tipos referenciados podem ser trocados.

### Requisitos semânticos

`I1` e `I2` modelam `indirectly_swappable` apenas se todos os concepts que ele subsume forem modelados.

### Preservação de igualdade

Expressões declaradas em [requires expressions](<#/doc/language/requires>) dos concepts da standard library são exigidas como [equality-preserving](<#/doc/concepts>) (exceto onde declarado de outra forma).

### Veja também

[ indirectly_readable](<#/doc/iterator/indirectly_readable>)(C++20) | especifica que um tipo é indiretamente legível aplicando o operador `*`
(concept)
[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) | troca os valores referenciados por dois objetos dereferenciáveis
(objeto de ponto de customização)