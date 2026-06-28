# std::ranges::iota_view&lt;W, Bound&gt;::iterator

```cpp
struct /*iterator*/;  // (1) (apenas para exposição*)
Templates de alias auxiliares
template< class I >
using /*iota-diff-t*/ = /* veja abaixo */;  // (2) (apenas para exposição*)
Conceitos auxiliares
template< class I >
concept /*decrementable*/ =
std::incrementable<I> && requires(I i) {
{ \--i } -> std::same_as<I&>;
{ i\-- } -> std::same_as<I>;
};  // (3) (apenas para exposição*)
template< class I >
concept /*advanceable*/ =
/*decrementable*/<I> && std::totally_ordered<I> &&
requires(I i, const I j, const /*iota-diff-t*/<I> n) {
{ i += n } -> std::same_as<I&>;
{ i -= n } -> std::same_as<I&>;
I(j + n);
I(n + j);
I(j - n);
{ j - j } -> std::convertible_to</*iota-diff-t*/<I>>;
};  // (4) (apenas para exposição*)
```

1) [ranges::iota_view](<#/doc/ranges/iota_view>)<W, Bound>::`_iterator_` é o tipo dos iterators retornados por [`begin()`](<#/doc/ranges/iota_view/begin>) e [`end()`](<#/doc/ranges/iota_view/end>) de [ranges::iota_view](<#/doc/ranges/iota_view>)<W, Bound>.

2) Calcula o tipo de diferença para ambos os tipos de iterator e [tipos semelhantes a inteiros](<#/doc/iterator/is-integer-like>).

  * Se `I` não é um tipo integral, ou se é um tipo integral e sizeof([std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;) é maior que sizeof(I), então /*iota-diff-t*/&lt;I&gt; é [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;.
  * Caso contrário, /*iota-diff-t*/&lt;I&gt; é um tipo inteiro com sinal de largura maior que a largura de `I`, se tal tipo existir.
  * Caso contrário, `I` é um dos tipos integrais mais largos, e /*iota-diff-t*/&lt;I&gt; é um [tipo semelhante a inteiro com sinal](<#/doc/iterator/is-integer-like>) não especificado de largura não menor que a largura de `I`. Não é especificado se /*iota-diff-t*/&lt;I&gt; modela [`weakly_incrementable`](<#/doc/iterator/weakly_incrementable>) neste caso.

3) Especifica que um tipo é [`incrementable`](<#/doc/iterator/incrementable>), e que os operadores -- pré e pós para o tipo têm significado comum.

4) Especifica que um tipo é tanto `_[decrementable](<#/doc/ranges/iota_view/iterator>)_` quanto [`totally_ordered`](<#/doc/concepts/totally_ordered>), e que os operadores +=, -=, +, e - entre o tipo e seu tipo de diferença têm significado comum.

/*iterator*/ modela

  * [`random_access_iterator`](<#/doc/iterator/random_access_iterator>) se W modela `_[advanceable](<#/doc/ranges/iota_view/iterator>)_` (4),
  * [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) se W modela `_[decrementable](<#/doc/ranges/iota_view/iterator>)_` (3),
  * [`forward_iterator`](<#/doc/iterator/forward_iterator>) se W modela [`incrementable`](<#/doc/iterator/incrementable>), e
  * [`input_iterator`](<#/doc/iterator/input_iterator>) caso contrário.

No entanto, ele só satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) se `W` modela [`incrementable`](<#/doc/iterator/incrementable>), e não satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>) caso contrário.

### Requisitos semânticos

3) O tipo `I` modela `_decrementable_` somente se `I` satisfaz `_decrementable_` e todos os conceitos que ele subsume são modelados, e dados objetos iguais a e b do tipo `I`:

  * Se a e b estão no domínio de ambos os operadores -- pré e pós (ou seja, eles são decrementáveis), então o seguinte é verdadeiro:
    * [std::addressof](<#/doc/memory/addressof>)(--a) == [std::addressof](<#/doc/memory/addressof>)(a),
    * bool(a-- == b),
    * bool(((void)a--, a) == --b),
    * bool(++(--a) == b).
  * Se a e b estão no domínio de ambos os operadores ++ pré e pós (ou seja, eles são incrementáveis), então bool(--(++a) == b) é verdadeiro.

4) Seja `D` denotando /*iota-diff-t*/&lt;I&gt;. O tipo `I` modela `_[advanceable](<#/doc/ranges/iota_view/iterator>)_` somente se `I` satisfaz `_[advanceable](<#/doc/ranges/iota_view/iterator>)_` e todos os conceitos que ele subsume são modelados, e dados

  * objetos a e b do tipo `I` e
  * valor n do tipo `D`,

de modo que b é alcançável a partir de a após n aplicações de ++a, todas as seguintes condições são satisfeitas:

  * (a += n) é igual a b.
  * [std::addressof](<#/doc/memory/addressof>)(a += n) é igual a [std::addressof](<#/doc/memory/addressof>)(a).
  * I(a + n) é igual a (a += n).
  * Para quaisquer dois valores positivos x e y do tipo `D`, se I(a + D(x + y)) é bem definido, então I(a + D(x + y)) é igual a I(I(a + x) + y).
  * I(a + D(0)) é igual a a.
  * Se I(a + D(n - 1)) é bem definido, então I(a + n) é igual a [](I c) { return ++c; }(I(a + D(n - 1))).
  * (b += -n) é igual a a.
  * (b -= n) é igual a a.
  * [std::addressof](<#/doc/memory/addressof>)(b -= n) é igual a [std::addressof](<#/doc/memory/addressof>)(b).
  * I(b - n) é igual a (b -= n).
  * D(b - a) é igual a n.
  * D(a - b) é igual a D(-n).
  * bool(a <= b) é verdadeiro.

### Tipos aninhados

Tipo | Definição
---|---
`iterator_concept` | uma [tag de iterator](<#/doc/iterator/iterator_tags>), veja abaixo
`iterator_category`
(presente apenas se `W` modela [`incrementable`](<#/doc/iterator/incrementable>) e
/*iota-diff-t*/&lt;W&gt; é um tipo integral) | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)
---|---
`value_type` | `W`
`difference_type` | /*iota-diff-t*/&lt;W&gt;

#### Determinando o conceito de iterator

`iterator_concept` é definido da seguinte forma:

  * Se `W` modela `_[advanceable](<#/doc/ranges/iota_view/iterator>)_`, `iterator_concept` denota [std::random_access_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, se `W` modela `_[decrementable](<#/doc/ranges/iota_view/iterator>)_`, `iterator_concept` denota [std::bidirectional_iterator_tag](<#/doc/iterator/bidirectional_iterator>).
  * Caso contrário, se `W` modela [`incrementable`](<#/doc/iterator/incrementable>), `iterator_concept` denota [std::forward_iterator_tag](<#/doc/iterator/iterator_tags>).
  * Caso contrário, `iterator_concept` denota [std::input_iterator_tag](<#/doc/iterator/iterator_tags>).

### Membros de dados

Membro | Definição
---|---
`W` `_value__` | o valor atual
(objeto membro apenas para exposição*)

### Funções membro

## std::ranges::iota_view::_iterator_ ::_iterator_

```cpp
/*iterator*/() requires std::default_initializable<W> = default;  // (1) (desde C++20)
constexpr explicit /*iterator*/( W value );  // (2) (desde C++20)
```

1) Inicializa por valor `_[value_](<#/doc/ranges/iota_view/iterator>)_`.

2) Inicializa `_[value_](<#/doc/ranges/iota_view/iterator>)_` com value.

## std::ranges::iota_view::_iterator_ ::operator*

```cpp
constexpr W operator*() const
noexcept(std::is_nothrow_copy_constructible_v<W>);  // (desde C++20)
```

Retorna `_[value_](<#/doc/ranges/iota_view/iterator>)_`.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto it{std::views::iota(6, 9).begin()};
        const int& r = *it; // binds with temporary
        assert(*it == 6 and r == 6);
        ++it;
        assert(*it == 7 and r == 6);
    }
```

## std::ranges::iota_view::_iterator_ ::operator++

```cpp
constexpr /*iterator*/& operator++();  // (1) (desde C++20)
constexpr void operator++(int);  // (2) (desde C++20)
constexpr /*iterator*/ operator++(int) requires std::incrementable<W>;  // (3) (desde C++20)
```

1) Equivalente a ++`_[value_](<#/doc/ranges/iota_view/iterator>)_` ; return *this;.

2) Equivalente a ++`_[value_](<#/doc/ranges/iota_view/iterator>)_` ;.

3) Equivalente a auto tmp = *this; ++`_[value_](<#/doc/ranges/iota_view/iterator>)_` ; return tmp;.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto it{std::views::iota(8).begin()};
        assert(*it == 8);
        assert(*++it == 9);
        assert(*it++ == 9);
        assert(*it == 10);
    }
```

## std::ranges::iota_view::_iterator_ ::operator--

```cpp
constexpr /*iterator*/& operator\--() requires /*decrementable*/<W>;  // (1) (desde C++20)
constexpr /*iterator*/operator\--(int) requires /*decrementable*/<W>;  // (2) (desde C++20)
```

1) Equivalente a \--`_[value_](<#/doc/ranges/iota_view/iterator>)_` ; return *this;.

2) Equivalente a auto tmp = *this; \--`_[value_](<#/doc/ranges/iota_view/iterator>)_` ; return tmp;.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto it{std::views::iota(8).begin()};
        assert(*it == 8);
        assert(*--it == 7);
        assert(*it-- == 7);
        assert(*it == 6);
    }
```

## std::ranges::iota_view::_iterator_ ::operator+=

```cpp
constexpr /*iterator*/& operator+=( difference_type n )
requires /*advanceable*/<W>;  // (desde C++20)
```

Atualiza `_[value_](<#/doc/ranges/iota_view/iterator>)_` e retorna *this:

  * Se `W` é um [tipo semelhante a inteiro sem sinal](<#/doc/iterator/is-integer-like>):
    * Se n não é negativo, executa `_[value_](<#/doc/ranges/iota_view/iterator>)_` `+= static_cast<W>(n).`
    * Caso contrário, executa `_[value_](<#/doc/ranges/iota_view/iterator>)_` `-= static_cast<W>(-n).`
  * Caso contrário, executa `_[value_](<#/doc/ranges/iota_view/iterator>)_` `+= n.`

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto it{std::views::iota(5).begin()};
        assert(*it == 5);
        assert(*(it += 3) == 8);
    }
```

## std::ranges::iota_view::_iterator_ ::operator-=

```cpp
constexpr /*iterator*/& operator-=( difference_type n )
requires /*advanceable*/<W>;  // (desde C++20)
```

Atualiza `_[value_](<#/doc/ranges/iota_view/iterator>)_` e retorna *this:

  * Se `W` é um [tipo semelhante a inteiro sem sinal](<#/doc/iterator/is-integer-like>):
    * Se n não é negativo, executa `_[value_](<#/doc/ranges/iota_view/iterator>)_` `-= static_cast<W>(n).`
    * Caso contrário, executa `_[value_](<#/doc/ranges/iota_view/iterator>)_` `+= static_cast<W>(-n).`
  * Caso contrário, executa `_[value_](<#/doc/ranges/iota_view/iterator>)_` `-= n.`

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto it{std::views::iota(6).begin()};
        assert(*it == 6);
        assert(*(it -= -3) == 9);
    }
```

## std::ranges::iota_view::_iterator_ ::operator[]

```cpp
constexpr W operator const
requires /*advanceable*/<W>;  // (desde C++20)
```

Retorna W(`_[value_](<#/doc/ranges/iota_view/iterator>)_` `+ n).`

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <ranges>
    
    int main()
    {
        auto it{std::views::iota(6).begin()};
        assert(*it == 6);
        assert(*(it + 3) == 9);
    }
```

### Funções não-membro

## operator==, <, >, <=, >=, <=>(std::ranges::iota_view::_iterator_)

```cpp
friend constexpr bool operator==
( const /*iterator*/& x, const /*iterator*/& y )
requires std::equality_comparable<W>;  // (1) (desde C++20)
friend constexpr bool operator<
( const /*iterator*/& x, const /*iterator*/& y )
requires std::totally_ordered<W>;  // (2) (desde C++20)
friend constexpr bool operator>
( const /*iterator*/& x, const /*iterator*/& y )
requires std::totally_ordered<W>;  // (3) (desde C++20)
friend constexpr bool operator<=
( const /*iterator*/& x, const /*iterator*/& y )
requires std::totally_ordered<W>;  // (4) (desde C++20)
friend constexpr bool operator>=
( const /*iterator*/& x, const /*iterator*/& y )
requires std::totally_ordered<W>;  // (5) (desde C++20)
friend constexpr bool operator<=>
( const /*iterator*/& x, const /*iterator*/& y )
requires std::totally_ordered<W> && std::three_way_comparable<W>;  // (6) (desde C++20)
```

1) Retorna x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `== y.`_[value_](<#/doc/ranges/iota_view/iterator>)_`.

2) Retorna x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `< y.`_[value_](<#/doc/ranges/iota_view/iterator>)_`.

3) Retorna y < x.

4) Retorna !(y < x).

5) Retorna !(x < y).

6) Retorna x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `<=> y.`_[value_](<#/doc/ranges/iota_view/iterator>)_`.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) ordinário, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando _iterator_ é uma classe associada dos argumentos.

## operator+(std::ranges::iota_view::_iterator_)

```cpp
friend constexpr /*iterator*/ operator+
( /*iterator*/ i, difference_type n )
requires /*advanceable*/<W>;  // (1) (desde C++20)
friend constexpr /*iterator*/ operator+
( difference_type n, /*iterator*/ i )
requires /*advanceable*/<W>;  // (2) (desde C++20)
```

Equivalente a i += n; return i;.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) ordinário, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando _iterator_ é uma classe associada dos argumentos.

## operator-(std::ranges::iota_view::_iterator_)

```cpp
friend constexpr /*iterator*/ operator-
( /*iterator*/ i, difference_type n )
requires /*advanceable*/<W>;  // (1) (desde C++20)
friend constexpr difference_type operator-
( const /*iterator*/& x, const /*iterator*/& y )
requires /*advanceable*/<W>;  // (2) (desde C++20)
```

1) Equivalente a i -= n; return i;.

2) Seja `D` denotando `difference_type`:

  * Se `W` é um [tipo semelhante a inteiro](<#/doc/iterator/is-integer-like>):
    * Se `W` é semelhante a inteiro com sinal, retorna D(D(x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` ) - D(y.`_[value_](<#/doc/ranges/iota_view/iterator>)_` )).
    * Caso contrário, retorna y.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `> x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `? D(-D(y.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `- x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` )) : D(x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `- y.`_[value_](<#/doc/ranges/iota_view/iterator>)_` ).`
  * Caso contrário, retorna x.`_[value_](<#/doc/ranges/iota_view/iterator>)_` `- y.`_[value_](<#/doc/ranges/iota_view/iterator>)_`.

Essas funções não são visíveis para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) ordinário, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando _iterator_ é uma classe associada dos argumentos.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[P2259R1](<https://wg21.link/P2259R1>) | C++20 | membro `[iterator_category](<#/doc/ranges/iota_view/iterator>)` é sempre definido | definido apenas se `W` satisfaz [`incrementable`](<#/doc/iterator/incrementable>)
[LWG 3580](<https://cplusplus.github.io/LWG/issue3580>) | C++20 | corpos de operator+ e operator- excluem [movimentação implícita](<#/doc/language/return>) | tornados adequados para movimentação implícita