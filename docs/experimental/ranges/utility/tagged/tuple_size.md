# std::tuple_size&lt;std::experimental::ranges::tagged&gt;

template< class Base, class... Tags >  
struct tuple_size<std::experimental::[ranges::tagged](<#/doc/experimental/ranges/utility/tagged>)<Base, Tags...>>  
: [std::tuple_size](<#/doc/utility/tuple_size>)&lt;Base&gt; {}; |  |  (ranges TS)  

  
A especialização parcial de [std::tuple_size](<#/doc/utility/tuple_size>) para `tagged` fornece a capacidade de obter o número de elementos em um objeto `tagged` usando sintaxe tipo tupla. Ela simplesmente encaminha para [std::tuple_size](<#/doc/utility/tuple_size>)&lt;Base&gt;.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  [std::tuple_size](<#/doc/utility/tuple_size>)&lt;Base&gt;::value   
(constante membro estática pública)  
  
### Funções membro

operator std::size_t |  converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
### Tipos membro

Type  |  Definition   
---|---
`value_type` |  [std::size_t](<#/doc/types/size_t>)  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>  
  
### Veja também

[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(desde C++11) |  obtém o tamanho de uma `tuple`   
(especialização de modelo de classe)  
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(desde C++11) |  obtém o tamanho de um `array`   
(especialização de modelo de classe)  
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(desde C++11) |  obtém o tamanho de um `pair`   
(especialização de modelo de classe)  
[ std::tuple_element<std::experimental::ranges::tagged>](<#/doc/experimental/ranges/utility/tagged/tuple_element>) |  obtém os tipos dos elementos de um `tagged`   
(especialização de modelo de classe)