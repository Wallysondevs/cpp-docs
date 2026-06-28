# std::experimental::ranges::tagged_tuple

Definido no cabeçalho `[<experimental/ranges/tuple>](<#/doc/header/experimental/ranges/tuple>)`

```c
template< TaggedType... Types >
using tagged_tuple = /* veja abaixo */;
```

Alias template de conveniência para nomear um `ranges::tagged` que envolve um [std::tuple](<#/doc/utility/tuple>).

Um [`TaggedType`](<#/doc/experimental/ranges/utility/TaggedType>) é um tipo de função `S(T)`, onde `S` é um [`TagSpecifier`](<#/doc/experimental/ranges/utility/TagSpecifier>) e `T` é o tipo do elemento.

tagged_tuple<S1(T1), ..., SN(TN)> é um alias para [ranges::tagged](<#/doc/experimental/ranges/utility/tagged>)<[std::tuple](<#/doc/utility/tuple>)<T1, ..., TN>, S1, ..., SN>.

### Notas

Como um tipo de função é usado para "unir" o especificador de tag e o tipo de elemento correspondente, os ajustes usuais de tipo de parâmetro se aplicam. Em particular, qualificadores cv de nível superior são removidos e tipos de array são ajustados para ponteiros: tagged_tuple<[tag::in](<#/doc/experimental/ranges/algorithm/tags>)(const int* const), [tag::out](<#/doc/experimental/ranges/algorithm/tags>)(int[])> é [ranges::tagged](<#/doc/experimental/ranges/utility/tagged>)<[std::tuple](<#/doc/utility/tuple>)&lt;const int*, int*&gt;, [tag::in](<#/doc/experimental/ranges/algorithm/tags>), [tag::out](<#/doc/experimental/ranges/algorithm/tags>)>.

### Veja também

[ TaggedType](<#/doc/experimental/ranges/utility/TaggedType>) | especifica que um tipo representa um especificador de tag e seu tipo de elemento
(concept)
[ tagged](<#/doc/experimental/ranges/utility/tagged>) | aumenta um tipo semelhante a tupla com acessadores nomeados
(class template)
[ tagged_pair](<#/doc/experimental/ranges/utility/tagged_pair>) | alias template para um [std::pair](<#/doc/utility/pair>) com tag
(alias template)
[ make_tagged_pair](<#/doc/experimental/ranges/utility/make_tagged_pair>) | função de conveniência para criar um `tagged_pair`
(function template)
[ make_tagged_tuple](<#/doc/experimental/ranges/utility/make_tagged_tuple>) | função de conveniência para criar um `tagged_tuple`
(function template)
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged
(class)