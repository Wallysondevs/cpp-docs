# std::experimental::ranges::TagSpecifier

Definido no cabeçalho `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```c
template< class T >
concept bool TagSpecifier = /* implementation-defined */;
```

O concept `TagSpecifier<T>` é satisfeito se e somente se `T` é um especificador de tag para uso com [`ranges::tagged`](<#/doc/experimental/ranges/utility/tagged>).

O Ranges TS fornece um conjunto de especificadores de tag em [`<experimental/ranges/algorithm>`](<#/doc/header/experimental/ranges/algorithm>). Usuários não podem definir seus próprios especificadores de tag.

### Veja também

[ tagged](<#/doc/experimental/ranges/utility/tagged>) | aumenta um tipo semelhante a tupla com acessadores nomeados
(modelo de classe)
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged
(classe)