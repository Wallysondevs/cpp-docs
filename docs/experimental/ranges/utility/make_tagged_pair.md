# std::experimental::ranges::make_tagged_pair

Definido no cabeçalho `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```c
template< TagSpecifier Tag1, TagSpecifier Tag2, class T1, class T2 >
constexpr ranges::tagged</*veja abaixo*/, Tag1, Tag2> make_tagged_pair( T1&& x, T2&& y );
```

Função de conveniência para criar um par marcado (tagged pair), deduzindo os tipos dos elementos a partir dos argumentos (os especificadores de tag devem ser explicitamente especificados).

A parte _veja abaixo_ do tipo de retorno é decltype([std::make_pair](<#/doc/utility/pair/make_pair>)([std::forward](<#/doc/utility/forward>)&lt;T1&gt;(x), [std::forward](<#/doc/utility/forward>)&lt;T2&gt;(y))).

### Valor de retorno

R([std::forward](<#/doc/utility/forward>)&lt;T1&gt;(x), [std::forward](<#/doc/utility/forward>)&lt;T2&gt;(y)), onde `R` é o tipo de retorno.

### Ver também

[ TaggedType](<#/doc/experimental/ranges/utility/TaggedType>) | especifica que um tipo representa um especificador de tag e seu tipo de elemento
(concept)
[ tagged](<#/doc/experimental/ranges/utility/tagged>) | aumenta um tipo semelhante a tupla com acessadores nomeados
(class template)
[ tagged_pair](<#/doc/experimental/ranges/utility/tagged_pair>) | alias template para um [std::pair](<#/doc/utility/pair>) marcado
(alias template)
[ tagged_tuple](<#/doc/experimental/ranges/utility/tagged_tuple>) | alias template para um [std::tuple](<#/doc/utility/tuple>) marcado
(alias template)
[ make_tagged_tuple](<#/doc/experimental/ranges/utility/make_tagged_tuple>) | função de conveniência para criar um `tagged_tuple`
(function template)
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged
(class)