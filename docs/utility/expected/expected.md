# std::expected&lt;T,E&gt;::expected

```cpp
Modelo principal
constexpr expected();  // (1) (desde C++23)
constexpr expected( const expected& other );  // (2) (desde C++23)
constexpr expected( expected&& other ) noexcept(/* veja abaixo */);  // (3) (desde C++23)
template< class U, class G >
constexpr expected( const expected<U, G>& other );  // (4) (desde C++23)
(explicit condicionalmente)
template< class U, class G >
constexpr expected( expected<U, G>&& other );  // (5) (desde C++23)
(explicit condicionalmente)
template< class U = T >
constexpr explicit(!std::is_convertible_v<U, T>) expected( U&& v );  // (6) (desde C++23)
template< class G >
constexpr explicit(!std::is_convertible_v<const G&, E>)
expected( const std::unexpected<G>& e );  // (7) (desde C++23)
template< class G >
constexpr explicit(!std::is_convertible_v<G, E>)
expected( std::unexpected<G>&& e );  // (8) (desde C++23)
template< class... Args >
constexpr explicit expected( std::in_place_t, Args&&... args );  // (9) (desde C++23)
template< class U, class... Args >
constexpr explicit
expected( std::in_place_t,
std::initializer_list<U> il, Args&&... args );  // (10) (desde C++23)
template< class... Args >
constexpr explicit expected( std::unexpect_t, Args&&... args );  // (11) (desde C++23)
template< class U, class... Args >
constexpr explicit
expected( std::unexpect_t,
std::initializer_list<U> il, Args&&... args );  // (12) (desde C++23)
Especialização parcial para void
constexpr expected();  // (13) (desde C++23)
constexpr expected( const expected& other );  // (14) (desde C++23)
constexpr expected( expected&& other )
noexcept(std::is_nothrow_move_constructible_v<E>);  // (15) (desde C++23)
template< class U, class G >
constexpr explicit(!std::is_convertible_v<const G&, E>)
expected( const expected<U, G>& other );  // (16) (desde C++23)
template< class U, class G >
constexpr explicit(!std::is_convertible_v<G, E>)
expected( expected<U, G>&& other );  // (17) (desde C++23)
template< class G >
constexpr explicit(!std::is_convertible_v<const G&, E>)
expected( const std::unexpected<G>& e );  // (18) (desde C++23)
template< class G >
constexpr explicit(!std::is_convertible_v<G, E>)
expected( std::unexpected<G>&& e );  // (19) (desde C++23)
template< class... Args >
constexpr explicit expected( std::in_place_t );  // (20) (desde C++23)
template< class... Args >
constexpr explicit expected( std::unexpect_t, Args&&... args );  // (21) (desde C++23)
template< class U, class... Args >
constexpr explicit
expected( std::unexpect_t,
std::initializer_list<U> il, Args&&... args );  // (22) (desde C++23)
```

Constrói um novo objeto `expected`.

### Parâmetros

- **other** — outro objeto `expected` cujo valor contido é copiado
- **e** — objeto [`std::unexpected`](<#/doc/utility/expected/unexpected>) cujo valor contido é copiado
- **v** — valor com o qual inicializar o valor contido
- **args** — argumentos com os quais inicializar o valor contido
- **il** — lista de inicialização com a qual inicializar o valor contido

### Efeitos

#### Construtores do modelo principal

Sobrecarga | Método de inicialização | Inicializador para... | [`has_value()`](<#/doc/utility/expected/operator_bool>) após a construção o valor esperado | o valor inesperado ([1](<#/doc/utility/expected/expected>)) | [Inicialização por valor](<#/doc/language/value_initialization>) | (vazio) | - | verdadeiro
---|---|---|---|---
([2](<#/doc/utility/expected/expected>)) | [Direta](<#/doc/language/direct_initialization>) (não-lista) | *other | other.error() | other.has_value()

  * Se verdadeiro, inicializa apenas o valor esperado.
  * Se falso, inicializa apenas o valor inesperado.

([3](<#/doc/utility/expected/expected>)) | std::move(*other) | std::move(other.error()) ([4](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;const U&&gt; (*other) | [std::forward](<#/doc/utility/forward>)&lt;const G&&gt; (other.error()) ([5](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;U&gt;(*other) | [std::forward](<#/doc/utility/forward>)&lt;G&gt; (other.error()) ([6](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;U&gt;(v) | - | verdadeiro - **([7](<#/doc/utility/expected/expected>))** — [std::forward](<#/doc/utility/forward>)&lt;const G&&gt; (e.error()) | falso
---|---
([8](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;G&gt;(e.error())
([9](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... | - | verdadeiro
([10](<#/doc/utility/expected/expected>)) | il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...
- **([11](<#/doc/utility/expected/expected>))** — [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... | falso
([12](<#/doc/utility/expected/expected>)) | il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...

#### Construtores da especialização parcial para void

Sobrecarga | Método de inicialização | Inicializador para o valor inesperado | [`has_value()`](<#/doc/utility/expected/operator_bool>) após a construção
---|---|---|---
([13](<#/doc/utility/expected/expected>)) | N/A | - | verdadeiro
([14](<#/doc/utility/expected/expected>)) | Direta (não-lista) | rhs.error() | other.has_value()

  * Se falso, inicializa o valor inesperado.

([15](<#/doc/utility/expected/expected>)) | std::move(rhs.error)
---|---
([16](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;const G&&gt;(rhs.error())
([17](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;G&gt;(rhs.error())
([18](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;const G&&gt;(e.error()) | falso
([19](<#/doc/utility/expected/expected>)) | [std::forward](<#/doc/utility/forward>)&lt;G&gt;(e.error())
([20](<#/doc/utility/expected/expected>)) | N/A | - | verdadeiro
([21](<#/doc/utility/expected/expected>)) | Direta (não-lista) | [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)... | falso
([22](<#/doc/utility/expected/expected>)) | il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...

### Restrições e informações suplementares

#### Construtores do modelo principal

1) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T&gt; for verdadeiro.

2) Este construtor é definido como deletado, a menos que [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; sejam ambos verdadeiros.

Este construtor é trivial se [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;T&gt; e [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; forem ambos verdadeiros.

3) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; e [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; forem ambos verdadeiros.

Este construtor é trivial se [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt; e [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; forem ambos verdadeiros.

4,5) Estas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas:

  * Para a sobrecarga (4), [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const U&> e [std::is_constructible_v](<#/doc/types/is_constructible>)<E, const G&> são ambos verdadeiros.
  * Para a sobrecarga (5), [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U> e [std::is_constructible_v](<#/doc/types/is_constructible>)<E, G> são ambos verdadeiros.
  * Se `T` não for (possivelmente cv-qualificado) bool, os 8 valores seguintes são todos falsos:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::expected](<#/doc/utility/expected>)<U, G>&>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::expected](<#/doc/utility/expected>)<U, G>>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const [std::expected](<#/doc/utility/expected>)<U, G>&>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, const [std::expected](<#/doc/utility/expected>)<U, G>>
    * [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::expected](<#/doc/utility/expected>)<U, G>&, T>
    * [std::is_convertible_v](<#/doc/types/is_convertible>)<[std::expected](<#/doc/utility/expected>)<U, G>, T>
    * [std::is_convertible_v](<#/doc/types/is_convertible>)<const [std::expected](<#/doc/utility/expected>)<U, G>&, T>
    * [std::is_convertible_v](<#/doc/types/is_convertible>)<const [std::expected](<#/doc/utility/expected>)<U, G>, T>
  * Os 4 valores seguintes são todos falsos:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, [std::expected](<#/doc/utility/expected>)<U, G>&>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, [std::expected](<#/doc/utility/expected>)<U, G>>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, const [std::expected](<#/doc/utility/expected>)<U, G>&>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, const [std::expected](<#/doc/utility/expected>)<U, G>>

4) Este construtor é explícito se [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const U&, T&gt; ou [std::is_convertible_v](<#/doc/types/is_convertible>)&lt;const G&, E&gt; for falso.

5) Este construtor é explícito se [std::is_convertible_v](<#/doc/types/is_convertible>)<U, T> ou [std::is_convertible_v](<#/doc/types/is_convertible>)<G, E> for falso.

6) Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas:

  * [std::is_same_v](<#/doc/types/is_same>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt;, [std::in_place_t](<#/doc/utility/in_place>)> for falso.
  * [std::is_same_v](<#/doc/types/is_same>)<[std::expected](<#/doc/utility/expected>)<T, E>, [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt;> for falso.
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<T, U> for verdadeiro.
  * [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt; não é uma especialização de [`std::unexpected`](<#/doc/utility/expected/unexpected>).
  * Se `T` for (possivelmente cv-qualificado) bool, [std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;U&gt; não é uma especialização de [`std::expected`](<#/doc/utility/expected>).

7) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, const G&> for verdadeiro.

8) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, G> for verdadeiro.

9) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, Args...> for verdadeiro.

10) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<T, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for verdadeiro.

11) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, Args...> for verdadeiro.

12) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for verdadeiro.

#### Construtores da especialização parcial para void

14) Este construtor é definido como deletado, a menos que [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; for verdadeiro.

Este construtor é trivial se [std::is_trivially_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;E&gt; for verdadeiro.

15) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; for verdadeiro.

Este construtor é trivial se [std::is_trivially_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt; for verdadeiro.

16,17) Estas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas:

  * Para a sobrecarga (16), [std::is_constructible_v](<#/doc/types/is_constructible>)<E, const G&> for verdadeiro.
  * Para a sobrecarga (17), [std::is_constructible_v](<#/doc/types/is_constructible>)<E, G> for verdadeiro.
  * [std::is_void_v](<#/doc/types/is_void>)&lt;U&gt; for verdadeiro.
  * Os 4 valores seguintes são todos falsos:
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, [std::expected](<#/doc/utility/expected>)<U, G>&>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, [std::expected](<#/doc/utility/expected>)<U, G>>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, const [std::expected](<#/doc/utility/expected>)<U, G>&>
    * [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::unexpected](<#/doc/utility/expected/unexpected>)<E>, const [std::expected](<#/doc/utility/expected>)<U, G>>

18) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, const G&> for verdadeiro.

19) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, G> for verdadeiro.

21) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, Args...> for verdadeiro.

22) Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<E, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> for verdadeiro.

### Exceções

#### Construtores do modelo principal

1) Lança qualquer exceção lançada pela inicialização do valor esperado.

2) Lança qualquer exceção lançada pela inicialização do valor esperado ou inesperado.

3) Lança qualquer exceção lançada pela inicialização do valor esperado ou inesperado.

Especificação `noexcept`:

noexcept([std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;
&& [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;E&gt;)

4,5) Lança qualquer exceção lançada pela inicialização do valor esperado ou inesperado.

6) Lança qualquer exceção lançada pela inicialização do valor esperado.

7,8) Lança qualquer exceção lançada pela inicialização do valor inesperado.

9,10) Lança qualquer exceção lançada pela inicialização do valor esperado.

11,12) Lança qualquer exceção lançada pela inicialização do valor inesperado.

#### Construtores da especialização parcial para void

14-19) Lança qualquer exceção lançada pela inicialização do valor inesperado.

21,22) Lança qualquer exceção lançada pela inicialização do valor inesperado.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ unexpected](<#/doc/utility/expected/unexpected>)(C++23) | representado como um valor inesperado
(modelo de classe)
[ in_placein_place_typein_place_indexin_place_tin_place_type_tin_place_index_t](<#/doc/utility/in_place>)(C++17) | tag de construção in-place
(tag)
[ unexpectunexpect_t](<#/doc/utility/expected/unexpect_t>)(C++23) | tag de construção in-place para valor inesperado em `expected`
(tag)