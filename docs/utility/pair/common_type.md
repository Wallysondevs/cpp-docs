# std::common_type&lt;std::pair&gt;

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T1, class T2, class U1, class U2 >
requires requires { typename std::pair<std::common_type_t<T1, U1>,
std::common_type_t<T2, U2>>; }
struct common_type<std::pair<T1, T2>, std::pair<U1, U2>>;
```

O tipo comum de dois `pair`s é um `pair` de ambos os tipos comuns dos tipos de elementos correspondentes de ambos os `pair`s.

O tipo comum é definido apenas se ambos os pares de tipos de elementos correspondentes tiverem tipos comuns.

### Tipos Membro

Tipo Membro | Definição
---|---
`type` | [std::pair](<#/doc/utility/pair>)<[std::common_type_t](<#/doc/types/common_type>)<T1, U1>, [std::common_type_t](<#/doc/types/common_type>)<T2, U2>>

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos
(modelo de classe)
[ std::common_type<_tuple-like_ >](<#/doc/utility/tuple/common_type>)(C++23) | determina o tipo comum de uma `tuple` e um tipo `_tuple-like_`
(especialização de modelo de classe)