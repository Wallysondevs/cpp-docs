# std::expected&lt;T,E&gt;::or_else

```cpp
Template primário
template< class F >
constexpr auto or_else( F&& f ) &;  // (1) (desde C++23)
template< class F >
constexpr auto or_else( F&& f ) const&;  // (2) (desde C++23)
template< class F >
constexpr auto or_else( F&& f ) &&;  // (3) (desde C++23)
template< class F >
constexpr auto or_else( F&& f ) const&&;  // (4) (desde C++23)
Especialização parcial void
template< class F >
constexpr auto or_else( F&& f ) &;  // (5) (desde C++23)
template< class F >
constexpr auto or_else( F&& f ) const&;  // (6) (desde C++23)
template< class F >
constexpr auto or_else( F&& f ) &&;  // (7) (desde C++23)
template< class F >
constexpr auto or_else( F&& f ) const&&;  // (8) (desde C++23)
```

Se `*this` contiver um valor inesperado, invoca `f` com o valor inesperado de `*this` como argumento e retorna seu resultado. Caso contrário, retorna um objeto `std::expected` que representa um valor esperado.

1-4) O valor esperado é inicializado com o valor esperado [`_val_`](<#/doc/utility/expected>) de `*this`.

Dado o tipo `G` como:

1,2) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(error())>>

3,4) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(std::move(error()))>>

5,6) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(error())>>

7,8) [std::remove_cvref_t](<#/doc/types/remove_cvref>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(std::move(error()))>>

Se `G` não for uma especialização de `std::expected`, ou se [std::is_same_v](<#/doc/types/is_same>)<G::value_type, T> for `false`, o programa é malformado.

1,2) Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, decltype((`_val_`))> for `true`.

3,4) Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, decltype(std::move(`_val_`))> for `true`.

### Parâmetros

- **f** — uma função adequada ou objeto [Callable](<#/doc/named_req/Callable>) que retorna um `std::expected`

### Valor de retorno

Sobrecarga | Valor de [`has_value()`](<#/doc/utility/expected/operator_bool>)
---|---
true | false
([1,2](<#/doc/utility/expected/or_else>)) | G([std::in_place](<#/doc/utility/in_place>),` ` _val_`) | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), error())
([3,4](<#/doc/utility/expected/or_else>)) | G([std::in_place](<#/doc/utility/in_place>), std::move(`_val_`)) | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(error()))
([5,6](<#/doc/utility/expected/or_else>)) | G() | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), error())
([7,8](<#/doc/utility/expected/or_else>)) | [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(error()))

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_expected`](<#/doc/feature_test>) | [`202211L`](<#/>) | (C++23) | Funções monádicas para `std::expected`

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3938](<https://cplusplus.github.io/LWG/issue3938>) | C++23 | o valor esperado era obtido por value()[1](<#/doc/utility/expected/or_else>) | alterado para `*this`
[LWG 3973](<https://cplusplus.github.io/LWG/issue3973>) | C++23 | o valor esperado era obtido por `*this`[2](<#/doc/utility/expected/or_else>) | alterado para [`_val_`](<#/doc/utility/expected>)

1. [↑](<#/doc/utility/expected/or_else>) [`value()`](<#/doc/utility/expected/value>) requer que `E` seja copy constructible (veja [LWG issue 3843](<https://cplusplus.github.io/LWG/issue3843>)), enquanto [`operator*`](<#/doc/utility/expected/operator_star_>) não.
2. [↑](<#/doc/utility/expected/or_else>) `*this` pode disparar [argument-dependent lookup](<#/doc/language/adl>).

### Veja também

[ transform_error](<#/doc/utility/expected/transform_error>) | retorna o próprio `expected` se ele contiver um valor esperado; caso contrário, retorna um `expected` contendo o valor inesperado transformado
(função membro pública)