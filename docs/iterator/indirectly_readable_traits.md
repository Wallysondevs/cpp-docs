# std::indirectly_readable_traits

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class I >
struct indirectly_readable_traits {};
template< class T >
struct indirectly_readable_traits<T*> :
/* cond-value-type */<T> {};
template< class I >
requires std::is_array_v<I>
struct indirectly_readable_traits<I>;
{ using value_type = std::remove_cv_t<std::remove_extent_t<I>>; }
template< class T >
struct indirectly_readable_traits<const T> :
indirectly_readable_traits<T> {};
template< /* has-member-value-type */ T >
struct indirectly_readable_traits<T> :
/* cond-value-type */<typename T::value_type> {};
template< /* has-member-element-type */ T >
struct indirectly_readable_traits<T> :
/* cond-value-type */<typename T::element_type> {};
template< /* has-member-value-type */ T >
requires /* has-member-element-type */<T>
struct indirectly_readable_traits<T> {};
template< /* has-member-value-type */ T >
requires /* has-member-element-type */<T> &&
std::same_as<std::remove_cv_t<typename T::element_type>,
std::remove_cv_t<typename T::value_type>>
struct indirectly_readable_traits<T> :
/* cond-value-type */<typename T::value_type> {};
Classes auxiliares e conceitos
template< class >
struct /* cond-value-type */ {};
template< class T >
requires std::is_object_v<T>
struct /* cond-value-type */ <T>
{ using value_type = std::remove_cv_t<T>; };
template< class T >
concept /* has-member-value-type */ =
requires { typename T::value_type; };
template< class T >
concept /* has-member-element-type */ =
requires { typename T::element_type; };
```

Calcula o tipo de valor associado do argumento do template. Se o tipo de valor associado existir, ele é representado pelo tipo aninhado `value_type`, caso contrário `value_type` não é definido. Um programa pode especializar `indirectly_readable_traits` para um [tipo definido pelo programa](<#/doc/language/type-id>).

### Explicação

As especializações acima podem ser informalmente descritas como abaixo.

Dado um tipo `T`, seu tipo de valor associado `V` é determinado da seguinte forma:

*   Se `T` for qualificado como const, `V` é o tipo de valor associado de `T` não qualificado como const.
*   Caso contrário, se `T` for um tipo array, `V` é o tipo de elemento do array não qualificado por cv.
*   Caso contrário, um tipo de valor condicional `C` é determinado primeiro:

    *   Se `T` for um tipo ponteiro, `C` é o tipo apontado.
    *   Caso contrário, se `T` tiver os tipos aninhados `value_type` e `element_type`:

        *   Se esses tipos forem os mesmos (sem considerar a qualificação cv), `C` é `typename T::value_type`.
        *   Caso contrário, `C` é indefinido.

    *   Caso contrário, se `T` tiver o tipo aninhado `value_type` mas não `element_type`, `C` é `typename T::value_type`.
    *   Caso contrário, se `T` tiver o tipo aninhado `element_type` mas não `value_type`, `C` é `typename T::element_type`.
    *   Caso contrário, `C` é indefinido.

    Então `V` é determinado a partir de `C` da seguinte forma:

*   Se `C` for indefinido, ou `C` não for um [tipo de objeto](<#/doc/language/type-id>), `V` é indefinido.
*   Caso contrário, `V` é `C` não qualificado por cv.

### Notas

`value_type` destina-se ao uso com tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>), como iterators. Não se destina ao uso com ranges.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3446](<https://cplusplus.github.io/LWG/issue3446>) | C++20 | as especializações (5,6) eram ambíguas para tipos que possuíam ambos os tipos aninhados `value_type` e `element_type` | especialização (8) adicionada
[LWG 3541](<https://cplusplus.github.io/LWG/issue3541>) | C++20 | LWG 3446 introduziu um erro grave para casos ambíguos em que `value_type` e `element_type` são diferentes | especialização (7) adicionada

### Veja também

[ indirectly_readable](<#/doc/iterator/indirectly_readable>)(C++20) | especifica que um tipo é indiretamente legível aplicando o operador `*`
(conceito)
[ iter_value_titer_reference_titer_const_reference_titer_difference_titer_rvalue_reference_titer_common_reference_t](<#/doc/iterator/iter_t>)(C++20)(C++20)(C++23)(C++20)(C++20)(C++20) | calcula os tipos associados de um iterator
(template de alias)
[ iterator_traits](<#/doc/iterator/iterator_traits>) | fornece uma interface uniforme para as propriedades de um iterator
(template de classe)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão