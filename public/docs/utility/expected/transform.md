# std::expected&lt;T,E&gt;::transform

```cpp
Modelo primário
template< class F >
constexpr auto transform( F&& f ) &;  // (1) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) const&;  // (2) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) &&;  // (3) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) const&&;  // (4) (desde C++23)
Especialização parcial para void
template< class F >
constexpr auto transform( F&& f ) &;  // (5) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) const&;  // (6) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) &&;  // (7) (desde C++23)
template< class F >
constexpr auto transform( F&& f ) const&&;  // (8) (desde C++23)
```

Se *this representa um valor esperado, invoca f e retorna um objeto `std::expected` que contém um valor esperado, que é inicializado com seu resultado (ou inicializado por valor se o tipo de resultado for void). Caso contrário, retorna um objeto `std::expected` que contém um valor inesperado, que é inicializado com o valor inesperado de *this.

1-4) f é invocado com o valor esperado [`_val_`](<#/doc/utility/expected>) de *this como argumento.

5-8) f é invocado sem nenhum argumento.

Dado o tipo `U` como:

1,2) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype((`_val_`))>>

3,4) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)<F, decltype(std::move(`_val_`))>>

5-8) [std::remove_cv_t](<#/doc/types/remove_cv>)<[std::invoke_result_t](<#/doc/types/result_of>)&lt;F&gt;>

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

* `U` não é um tipo de valor válido para `std::expected`.
* [std::is_void_v](<#/doc/types/is_void>)&lt;U&gt; é falso, e a seguinte declaração correspondente é malformada:

1,2) U u([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f),` ` _val_`));

3,4) U u([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f), std::move(`_val_`)));

5-8) U u([std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f)));

1,2) Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(error())> for verdadeiro.

3,4) Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(std::move(error()))> for verdadeiro.

5,6) Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(error())> for verdadeiro.

7,8) Essas sobrecargas participam da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, decltype(std::move(error()))> for verdadeiro.

### Parâmetros

- **f** — uma função adequada ou objeto [Callable](<#/doc/named_req/Callable>) cuja assinatura de chamada retorna um tipo não-referência

### Valor de retorno

Dada a expressão expr como:

1,2) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f),` ` _val_`)

3,4) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f),std::move(`_val_`))

5-8) [std::invoke](<#/doc/utility/functional/invoke>)([std::forward](<#/doc/utility/forward>)&lt;F&gt;(f))

Os valores de retorno são definidos como segue:

```cpp
Sobrecarga | Valor de `has_value()`
true | false
(1,2)
```
* Se [std::is_void_v](<#/doc/types/is_void>)&lt;U&gt; for falso, retorna [std::expected](<#/doc/utility/expected>)<U, E> ` `([std::in_place](<#/doc/utility/in_place>), expr).
* Caso contrário, retorna [std::expected](<#/doc/utility/expected>)<U, E>() (mas ainda avalia expr).

| [std::expected](<#/doc/utility/expected>)<U, E>([std::unexpect](<#/doc/utility/expected/unexpect_t>), error())
---|---
([3,4](<#/doc/utility/expected/transform>)) | [std::expected](<#/doc/utility/expected>)<U, E> ` `([std::unexpect](<#/doc/utility/expected/unexpect_t>), std::move(error()))
([5,6](<#/doc/utility/expected/transform>)) | [std::expected](<#/doc/utility/expected>)<U, E>([std::unexpect](<#/doc/utility/expected/unexpect_t>), error())
([7,8](<#/doc/utility/expected/transform>)) | [std::expected](<#/doc/utility/expected>)<U, E> ` `([std::unexpect](<#/doc/utility/expected/unexpect_t>), std::move(error()))

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3938](<https://cplusplus.github.io/LWG/issue3938>) | C++23 | o valor esperado era obtido por value()[1](<#/doc/utility/expected/transform>) | alterado para **this
[LWG 3973](<https://cplusplus.github.io/LWG/issue3973>) | C++23 | o valor esperado era obtido por **this[2](<#/doc/utility/expected/transform>) | alterado para [`_val_`](<#/doc/utility/expected>)

1. [↑](<#/doc/utility/expected/transform>) [`value()`](<#/doc/utility/expected/value>) requer que `E` seja copy constructible (veja [LWG issue 3843](<https://cplusplus.github.io/LWG/issue3843>)), enquanto [`operator*`](<#/doc/utility/expected/operator_star_>) não.
2. [↑](<#/doc/utility/expected/transform>) **this pode disparar [argument-dependent lookup](<#/doc/language/adl>).

### Veja também

[ transform_error](<#/doc/utility/expected/transform_error>) | retorna o próprio `expected` se ele contém um valor esperado; caso contrário, retorna um `expected` contendo o valor inesperado transformado
(função membro pública)