# std::basic_common_reference&lt;std::reference_wrapper&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class R, class T,
template<class> RQual, template<class> TQual >
requires (/*ref-wrap-common-reference-exists-with*/<R, T, RQual<R>, TQual<T>> &&
!/*ref-wrap-common-reference-exists-with*/<T, R, TQual<T>, RQual<R>>)
struct basic_common_reference<R, T, RQual, TQual>;
template< class T, class R,
template<class> TQual, template<class> RQual >
requires (/*ref-wrap-common-reference-exists-with*/<R, T, RQual<R>, TQual<T>> &&
!/*ref-wrap-common-reference-exists-with*/<T, R, TQual<T>, RQual<R>>)
struct basic_common_reference<T, R, TQual, RQual>;
Helper concepts
template< class R, class T, class RQ, class TQ >
concept /*ref-wrap-common-reference-exists-with*/ =
/*is-ref-wrapper*/<R> &&
requires { typename std::common_reference_t<typename R::type&, TQ>; } &&
std::convertible<RQ, std::common_reference_t<typename R::type&, TQ>>;
```

O tipo de referência comum de um `reference_wrapper` (denotado como R) e um tipo T, aplicados correspondentemente com qualificadores cv e de referência (denotados como RQ e TQ respectivamente), é equivalente a um tipo de referência comum do tipo subjacente de R aplicado com referência lvalue e o TQ.

O tipo de referência comum é definido apenas se R for o único `reference_wrapper`, o tipo subjacente de R aplicado com referência lvalue e o TQ tiverem um tipo de referência comum ao qual RQ deve ser conversível.

A constante apenas para exposição /*is-ref-wrapper*/&lt;R&gt; é verdadeira se e somente se R for uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>).

### Tipos de membros

Tipo de membro | Definição
---|---
`type` | [std::common_reference_t](<#/doc/types/common_reference>)<typename R::type&, TQual&lt;T&gt;> ([1,2](<#/doc/utility/functional/reference_wrapper/basic_common_reference>))

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_common_reference_wrapper`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | Torna std::common_reference_t de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>) um tipo de referência

### Exemplo

Execute este código
```cpp
    #include <concepts>
    #include <functional>
    
    static_assert(std::same_as<std::common_reference_t<int&,
                                                       std::reference_wrapper<int>>,
                                                       int&>);
    static_assert(std::same_as<std::common_reference_t<std::reference_wrapper<int>&,
                                                       int&>,
                                                       int&>);
    static_assert(std::same_as<std::common_reference_t<int&,
                                                       const std::reference_wrapper<int>&>,
                                                       int&>);
    int main() {}
```

### Veja também

[ common_referencebasic_common_reference](<#/doc/types/common_reference>)(C++20) | determina o tipo de referência comum de um grupo de tipos
(modelo de classe)