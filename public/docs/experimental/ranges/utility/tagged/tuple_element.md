# std::tuple_element&lt;std::experimental::ranges::tagged&gt;

template< [std::size_t](<#/doc/types/size_t>) N, class Base, class... Tags >  
struct tuple_element<N, std::experimental::[ranges::tagged](<#/doc/experimental/ranges/utility/tagged>)<Base, Tags...>>  
: [std::tuple_element](<#/doc/utility/tuple_element>)<N, Base> {}; |  |  (ranges TS)  

  
A especialização parcial de [std::tuple_element](<#/doc/utility/tuple_element>) para `tagged` fornece acesso em tempo de compilação aos tipos dos elementos de `tagged`, usando sintaxe similar a tuplas. Ela simplesmente encaminha para [std::tuple_element](<#/doc/utility/tuple_element>)<N, Base>. 

### Tipos-membro

Tipo de membro  |  Definição   
---|---
`type` |  [std::tuple_element_t](<#/doc/utility/tuple_element>)<N, Base>  
  
### Veja também

[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(desde C++11) |  obtém o tipo do elemento especificado   
(especialização de modelo de classe)  
[ std::tuple_element<std::array>](<#/doc/container/array/tuple_element>)(desde C++11) |  obtém o tipo dos elementos de `array`   
(especialização de modelo de classe)  
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(desde C++11) |  obtém o tipo dos elementos de `pair`   
(especialização de modelo de classe)  
[ std::tuple_size<std::experimental::ranges::tagged>](<#/doc/experimental/ranges/utility/tagged/tuple_size>) |  obtém o tamanho de um `tagged`   
(especialização de modelo de classe)