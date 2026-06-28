# std::experimental::ranges::make_tagged_tuple

Definido no cabeçalho `[<experimental/ranges/tuple>](<#/doc/header/experimental/ranges/tuple>)`

```c
template< TagSpecifier... Tags, class... Types >
requires sizeof...(Tags) == sizeof...(Types)
constexpr ranges::tagged</*veja abaixo*/, Tags...> make_tagged_tuple( Types&&... t );
```

Função de conveniência para criar uma tupla marcada (tagged tuple), deduzindo os tipos dos elementos a partir dos argumentos (os especificadores de tag devem ser explicitamente especificados).

A parte _veja abaixo_ do tipo de retorno é decltype([std::make_tuple](<#/doc/utility/tuple/make_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Types&gt;(t)...)).

### Valor de retorno

R([std::forward](<#/doc/utility/forward>)&lt;Types&gt;(t)...), onde `R` é o tipo de retorno.

### Veja também

[ TaggedType](<#/doc/experimental/ranges/utility/TaggedType>) | especifica que um tipo representa um especificador de tag e seu tipo de elemento
(concept)
[ tagged](<#/doc/experimental/ranges/utility/tagged>) | aumenta um tipo semelhante a tupla com acessadores nomeados
(class template)
[ tagged_pair](<#/doc/experimental/ranges/utility/tagged_pair>) | alias template para um [std::pair](<#/doc/utility/pair>) marcado
(alias template)
[ make_tagged_pair](<#/doc/experimental/ranges/utility/make_tagged_pair>) | função de conveniência para criar um `tagged_pair`
(function template)
[ tagged_tuple](<#/doc/experimental/ranges/utility/tagged_tuple>) | alias template para um [std::tuple](<#/doc/utility/tuple>) marcado
(alias template)
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged
(class)