# std::expected&lt;T,E&gt;::and_then

```cpp
Modelo principal
template< class F >
constexpr auto and_then( F&& f ) &;  // (1) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) const&;  // (2) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) &&;  // (3) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) const&&;  // (4) (desde C++23)
especialização parcial void
template< class F >
constexpr auto and_then( F&& f ) &;  // (5) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) const&;  // (6) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) &&;  // (7) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) const&&;  // (8) (desde C++23)
```

Se *this representa um valor esperado, invoca f e retorna seu resultado. Caso contrário, retorna um objeto `std::expected` que contém um valor inesperado, que é inicializado com o valor inesperado de *this.

1-4) f é invocado com o valor esperado [`_val_`](<#/doc/utility/expected>) como argumento.

5-8) f é invocado sem nenhum argumento.

Dado o tipo `U` como:

1,2) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype((`_val_`))>>

3,4) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(std::move(`_val_`))>>

5-8) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)&lt;F&gt;>

Se `U` não é uma especialização de `std::expected`, ou [std::is_same_v](<#/doc/types/is_same>)<U::error_type, E> é falso, o programa é malformado.

1,2) Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(error())> for verdadeiro.

3,4) Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(std::move(error()))> for verdadeiro.

5,6) Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(error())> for verdadeiro.

7,8) Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(std::move(error()))> for verdadeiro.

### Parâmetros

- **f** — uma função adequada ou objeto [Callable](<#/doc/named_req/Callable>) que retorna um std::expected

### Valor de retorno

Sobrecarga | Valor de [`has_value()`](<#/doc/utility/expected/operator_bool>)
---|---
true | false
([1,2](<#/doc/utility/expected/and_then>)) | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f),` ` _val_`) | U([std::unexpect](<#/doc/utility/expected/unexpect_t>), error())
([3,4](<#/doc/utility/expected/and_then>)) | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f),std::move(`_val_`)) | U([std::unexpect](<#/doc/utility/expected/unexpect_t>), std::move(error()))
([5,6](<#/doc/utility/expected/and_then>)) | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)) | U([std::unexpect](<#/doc/utility/expected/unexpect_t>), error())
([7,8](<#/doc/utility/expected/and_then>)) | U([std::unexpect](<#/doc/utility/expected/unexpect_t>), std::move(error()))

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_expected`](<#/doc/feature_test>) | [`202211L`](<#/>) | (C++23) | Funções monádicas para `std::expected`

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3938](<https://cplusplus.github.io/LWG/issue3938>) | C++23 | o valor esperado era obtido por value()[1](<#/doc/utility/expected/and_then>) | alterado para **this
[LWG 3973](<https://cplusplus.github.io/LWG/issue3973>) | C++23 | o valor esperado era obtido por **this[2](<#/doc/utility/expected/and_then>) | alterado para [`_val_`](<#/doc/utility/expected>)

1. [↑](<#/doc/utility/expected/and_then>) [`value()`](<#/doc/utility/expected/value>) requer que `E` seja copy constructible (veja [LWG issue 3843](<https://cplusplus.github.io/LWG/issue3843>)), enquanto [`operator*`](<#/doc/utility/expected/operator_star_>) não.
2. [↑](<#/doc/utility/expected/and_then>) **this pode acionar [argument-dependent lookup](<#/doc/language/adl>).

### Veja também

[ unexpectunexpect_t](<#/doc/utility/expected/unexpect_t>)(C++23) | tag de construção in-place para valor inesperado em `expected`
(tag)
[ transform](<#/doc/utility/expected/transform>) | retorna um `expected` contendo o valor esperado transformado se ele existir; caso contrário, retorna o próprio `expected`
(função membro pública)