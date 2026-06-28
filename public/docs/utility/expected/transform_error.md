# std::expected&lt;T,E&gt;::transform_error

```cpp
Modelo primário
template< class F >
constexpr auto transform_error( F&& f ) &;  // (1) (desde C++23)
template< class F >
constexpr auto transform_error( F&& f ) const&;  // (2) (desde C++23)
template< class F >
constexpr auto transform_error( F&& f ) &&;  // (3) (desde C++23)
template< class F >
constexpr auto transform_error( F&& f ) const&&;  // (4) (desde C++23)
Especialização parcial void
template< class F >
constexpr auto transform_error( F&& f ) &;  // (5) (desde C++23)
template< class F >
constexpr auto transform_error( F&& f ) const&;  // (6) (desde C++23)
template< class F >
constexpr auto transform_error( F&& f ) &&;  // (7) (desde C++23)
template< class F >
constexpr auto transform_error( F&& f ) const&&;  // (8) (desde C++23)
```

Se *this contiver um valor inesperado, invoca f com o valor inesperado de *this como argumento e retorna um objeto `std::expected` que contém um valor inesperado, que é inicializado com o resultado de f. Caso contrário, retorna um objeto `std::expected` que representa um valor esperado.

1-4) O valor esperado é inicializado com o valor esperado [`_val_`](<#/doc/utility/expected>) de *this.

Dado o tipo `G` como:

1,2) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(error())>>

3,4) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(std::move(error()))>>

5,6) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(error())>>

7,8) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(std::move(error()))>>

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

*   `G` não é um argumento de template válido para [`std::unexpected`](<#/doc/utility/expected/unexpected>).
*   A seguinte declaração correspondente é malformada:

1,2) G g([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), error()));

3,4) G g([std::invoke](<#/>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(error()));

5,6) G g([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), error()));

7,8) G g([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(error()));

1,2) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, decltype((`_val_`))> for true.

3,4) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, decltype(std::move(`_val_`))> for true.

### Parâmetros

- **f** — uma função adequada ou objeto [Callable](<#/doc/named_req/Callable>) cuja assinatura de chamada retorna um tipo não-referência

### Valor de retorno

Dada a expressão expr como:

1,2) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), error())

3,4) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(error()))

5,6) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), error())

7,8) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(error()))

Os valores de retorno são definidos como segue:

Sobrecarga | Valor de [`has_value()`](<#/doc/utility/expected/operator_bool>)
---|---
true | false
([1,2](<#/doc/utility/expected/transform_error>)) | [std::expected](<#/doc/utility/expected>)<T, G>([std::in_place](<#/doc/utility/in_place>),` ` _val_`) | [std::expected](<#/doc/utility/expected>)<T, G>
([std::unexpect](<#/doc/utility/expected/unexpect_t>), expr)
([3,4](<#/doc/utility/expected/transform_error>)) | [std::expected](<#/doc/utility/expected>)<T, G>([std::in_place](<#/doc/utility/in_place>), std::move(`_val_`))
---|---
([5,6](<#/doc/utility/expected/transform_error>)) | [std::expected](<#/doc/utility/expected>)<T, G>()
([7,8](<#/doc/utility/expected/transform_error>))

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3938](<https://cplusplus.github.io/LWG/issue3938>) | C++23 | o valor esperado foi obtido por value()[1](<#/doc/utility/expected/transform_error>) | alterado para **this
[LWG 3973](<https://cplusplus.github.io/LWG/issue3973>) | C++23 | o valor esperado foi obtido por **this[2](<#/doc/utility/expected/transform_error>) | alterado para [`_val_`](<#/doc/utility/expected>)

1.  [↑](<#/doc/utility/expected/transform_error>) [`value()`](<#/doc/utility/expected/value>) requer que `E` seja copy constructible (veja [LWG issue 3843](<https://cplusplus.github.io/LWG/issue3843>)), enquanto [`operator*`](<#/doc/utility/expected/operator_star_>) não.
2.  [↑](<#/doc/utility/expected/transform_error>) **this pode acionar [argument-dependent lookup](<#/doc/language/adl>).

### Veja também

[ or_else](<#/doc/utility/expected/or_else>) | retorna o próprio `expected` se ele contiver um valor esperado; caso contrário, retorna o resultado da função fornecida sobre o valor inesperado
(função membro pública)
[ transform](<#/doc/utility/expected/transform>) | retorna um `expected` contendo o valor esperado transformado, se existir; caso contrário, retorna o próprio `expected`
(função membro pública)