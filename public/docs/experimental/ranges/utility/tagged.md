# std::experimental::ranges::tagged

Definido no cabeçalho `[<experimental/ranges/utility>](<#/doc/header/experimental/ranges/utility>)`

```c
template< class Base, TagSpecifier... Tags >
requires sizeof...(Tags) <= std::tuple_size<Base>::value
struct tagged;
```

  
O template de classe `tagged` aumenta um tipo de classe semelhante a tupla `Base`, do qual ele deriva publicamente, com um conjunto de acessadores nomeados especificados pelos especificadores de tag `Tags...`. As tags são aplicadas em ordem: o i-ésimo especificador de tag em `Tags...` corresponde ao i-ésimo elemento da tupla.

Os especificadores de tag em `Tags...` devem ser únicos. Caso contrário, o comportamento é indefinido.

Não é possível deletar uma instância de `tagged` através de um ponteiro para qualquer base diferente de `Base`.

### Funções membro

[ (constructor)](<#/doc/experimental/ranges/utility/tagged/tagged>) | constrói um objeto `tagged`   
(função membro pública)  
[ operator=](<#/>) | atribui um objeto `tagged`   
(função membro pública)  
[ swap](<#/doc/experimental/ranges/utility/tagged/swap>) | troca o conteúdo de dois objetos `tagged`   
(função membro pública)  
  
#### Acessadores de elemento nomeados

Para o _N_ -ésimo especificador de tag em `Tags...` cujo nome de elemento correspondente é _name_ , `tagged` fornece acessadores nomeados _name_ da seguinte forma: 
```cpp
    constexpr decltype(auto) name() &       { return std::get<N>(*this); }
    constexpr decltype(auto) name() const & { return std::get<N>(*this); }
    constexpr decltype(auto) name() &&      { return std::get<N>(std::move(*this)); }
```

### Funções não-membro

[ ranges::swap(ranges::tagged)](<#/doc/experimental/ranges/utility/tagged/swap2>) | especializa `swap` para objetos `tagged`   
(função)  
  
### Acesso semelhante a tupla

[ std::tuple_size<std::experimental::ranges::tagged>](<#/doc/experimental/ranges/utility/tagged/tuple_size>) | obtém o tamanho de um `tagged`   
(especialização de template de classe)  
[ std::tuple_element<std::experimental::ranges::tagged>](<#/doc/experimental/ranges/utility/tagged/tuple_element>) | obtém os tipos dos elementos de um `tagged`   
(especialização de template de classe)  
  
### Veja também

[ TagSpecifier](<#/doc/experimental/ranges/utility/TagSpecifier>) | especifica que um tipo é um especificador de tag   
(concept)  
[ tagged_pair](<#/doc/experimental/ranges/utility/tagged_pair>) | alias template para um [std::pair](<#/doc/utility/pair>) com tag  
(alias template)  
[ make_tagged_pair](<#/doc/experimental/ranges/utility/make_tagged_pair>) | função de conveniência para criar um `tagged_pair`   
(function template)  
[ tagged_tuple](<#/doc/experimental/ranges/utility/tagged_tuple>) | alias template para um [std::tuple](<#/doc/utility/tuple>) com tag  
(alias template)  
[ make_tagged_tuple](<#/doc/experimental/ranges/utility/make_tagged_tuple>) | função de conveniência para criar um `tagged_tuple`   
(function template)  
[ inin1in2outout1out2funminmaxbeginend](<#/doc/experimental/ranges/algorithm/tags>) | especificadores de tag para uso com ranges::tagged   
(classe)