# std::common_type&lt;tuple-like&gt;

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< tuple-like TTuple, tuple-like UTuple >
requires /* see below */
struct common_type<TTuple, UTuple>;
```

  
O tipo comum de dois tipos [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>) é um [std::tuple](<#/doc/utility/tuple>) que consiste nos tipos comuns de todos os pares de tipos de elementos correspondentes de ambos os tipos.

Dado

  * `TTypes` como o pack formado pela sequência de [std::tuple_element_t](<#/doc/utility/tuple_element>)<i, TTuple> para cada inteiro i em `[`​0`, `[std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;TTuple&gt;`)`, e
  * `UTypes` como o pack formado pela sequência de [std::tuple_element_t](<#/doc/utility/tuple_element>)<i, UTuple> para cada inteiro i em `[`​0`, `[std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;UTuple&gt;`)`,

as seguintes restrições precisam ser satisfeitas:

  * `TTuple` ou `UTuple` é uma especialização de [std::tuple](<#/doc/utility/tuple>).
  * [std::is_same_v](<#/doc/types/is_same>)<TTuple, [std::decay_t](<#/doc/types/decay>)&lt;TTuple&gt;> é verdadeiro.
  * [std::is_same_v](<#/doc/types/is_same>)<UTuple, [std::decay_t](<#/doc/types/decay>)&lt;UTuple&gt;> é verdadeiro.
  * [std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;TTuple&gt; é igual a [std::tuple_size_v](<#/doc/utility/tuple_size>)&lt;UTuple&gt; (`TTuple` e `UTuple` têm o mesmo número de elementos).
  * [std::tuple](<#/doc/utility/tuple>)<[std::common_type_t](<#/doc/types/common_type>)<TTypes, UTypes>...> denota um tipo.

### Tipos Membro

Tipo Membro  |  Definição   
---|---
`type` |  [std::tuple](<#/doc/utility/tuple>)<[std::common_type_t](<#/doc/types/common_type>)<TTypes, UTypes>...>  
  
### Exemplo

| Esta seção está incompleta  
Motivo: sem exemplo   
  
### Ver também

[ common_type](<#/doc/types/common_type>)(C++11) |  determina o tipo comum de um grupo de tipos   
(modelo de classe)  
[ std::common_type<std::pair>](<#/doc/utility/pair/common_type>)(C++23) |  determina o tipo comum de dois `pair`s   
(especialização de modelo de classe)