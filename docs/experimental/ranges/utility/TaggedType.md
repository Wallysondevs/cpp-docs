# std::experimental::ranges::TaggedType

Definido no cabeçalho `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```c
template< class T >
concept bool TaggedType = /* implementation-defined */;
```

O concept `TaggedType<T>` é satisfeito se e somente se `T` é um tipo de função unária da forma `R(A)`, onde `R` é um [`TagSpecifier`](<#/doc/experimental/ranges/utility/TagSpecifier>).

Tais tipos são usados com os alias templates de conveniência `tagged_tuple` e `tagged_pair`.

### Veja também

[ tagged_tuple](<#/doc/experimental/ranges/utility/tagged_tuple>) | alias template para uma [std::tuple](<#/doc/utility/tuple>) marcada
(alias template)
[ tagged_pair](<#/doc/experimental/ranges/utility/tagged_pair>) | alias template para um [std::pair](<#/doc/utility/pair>) marcado
(alias template)
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged
(class)