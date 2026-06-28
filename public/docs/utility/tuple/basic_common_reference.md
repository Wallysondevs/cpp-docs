# std::basic_common_reference&lt;tuple-like&gt;

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< tuple-like TTuple, tuple-like UTuple,
template<class> class TQual, template<class> class UQual >
requires /* see below */
struct basic_common_reference<TTuple, UTuple, TQual, UQual>;
```

  
O tipo de referência comum de dois tipos [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) é um [std::tuple](<#/doc/utility/tuple>) que consiste nos tipos de referência comuns de todos os pares de tipos de elementos correspondentes de ambos os tipos, onde os qualificadores cv e de referência nos tipos `tuple-like` são aplicados aos seus tipos de elementos.

Dado 

  * `TTypes` como o pack formado pela sequência de [std::tuple_element_t](<#/doc/utility/tuple_element>)<i, TTuple> para cada inteiro `i` em `[`​0​`, `[std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;TTuple&gt;`)`, e 
  * `UTypes` como o pack formado pela sequência de [std::tuple_element_t](<#/doc/utility/tuple_element>)<i, UTuple> para cada inteiro `i` em `[`​0​`, `[std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;UTuple&gt;`)`, 

as seguintes restrições precisam ser satisfeitas: 

  * `TTuple` ou `UTuple` é uma especialização de [std::tuple](<#/doc/utility/tuple>). 
  * [std::is_same_v](<#/doc/types/is_same>)<TTuple, [std::decay_t](<#/doc/types/decay>)&lt;TTuple&gt;> é verdadeiro. 
  * [std::is_same_v](<#/doc/types/is_same>)<UTuple, [std::decay_t](<#/doc/types/decay>)&lt;UTuple&gt;> é verdadeiro. 
  * [std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;TTuple&gt; é igual a [std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;UTuple&gt; (`TTuple` e `UTuple` têm o mesmo número de elementos). 
  * [std::tuple](<#/doc/utility/tuple>)<[std::common_reference_t](<#/doc/types/common_reference>)<TQual&lt;TTypes&gt;..., UQual&lt;UTypes&gt;>...> denota um tipo. 

### Tipos membro

Tipo membro  |  Definição   
---|---
`type` |  [std::tuple](<#/doc/utility/tuple>)<[std::common_reference_t](<#/doc/types/common_reference>)<TQual&lt;TTypes&gt;..., UQual&lt;UTypes&gt;>...>  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ common_referencebasic_common_reference](<#/doc/types/common_reference>)(C++20) |  determina o tipo de referência comum de um grupo de tipos   
(modelo de classe)  
[ std::basic_common_reference<std::pair>](<#/doc/utility/pair/basic_common_reference>)(C++23) |  determina o tipo de referência comum de dois `pair`s   
(especialização de modelo de classe)