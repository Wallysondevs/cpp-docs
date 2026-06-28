# std::basic_common_reference&lt;std::pair&gt;

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T1, class T2, class U1, class U2,
template<class> class TQual, template<class> class UQual >
requires requires { typename std::pair<std::common_reference_t<TQual<T1>, UQual<U1>>,
std::common_reference_t<TQual<T2>, UQual<U2>>>; }
struct basic_common_reference<std::pair<T1, T2>, std::pair<U1, U2>, TQual, UQual>;
```

O tipo de referência comum de dois `pair`s é um `pair` de ambos os tipos de referência comuns dos tipos de elementos correspondentes de ambos os `pair`s, onde os qualificadores cv e de referência nos `pair`s são aplicados aos seus tipos de elementos.

O tipo de referência comum é definido apenas se ambos os pares de tipos de elementos correspondentes tiverem tipos de referência comuns.

### Tipos de membros

Tipo de membro | Definição
---|---
`type` | [std::pair](<#/doc/utility/pair>)<[std::common_reference_t](<#/doc/types/common_reference>)<TQual&lt;T1&gt;, UQual&lt;U1&gt;>,
` `[std::common_reference_t](<#/doc/types/common_reference>)<TQual&lt;T2&gt;, UQual&lt;U2&gt;>>

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ common_referencebasic_common_reference](<#/doc/types/common_reference>)(C++20) | determina o tipo de referência comum de um grupo de tipos
(modelo de classe)
[ std::basic_common_reference<_tuple-like_ >](<#/doc/utility/tuple/basic_common_reference>)(C++23) | determina o tipo de referência comum de um `tuple` e um tipo `_tuple-like_`
(especialização de modelo de classe)