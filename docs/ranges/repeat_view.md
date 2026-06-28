# std::ranges::views::repeat, std::ranges::repeat_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::move_constructible W,
std::semiregular Bound = std::unreachable_sentinel_t >
requires (std::is_object_v<W> && std::same_as<W, std::remove_cv_t<W>> &&
(/*integer-like-with-usable-difference-type*/<Bound>
std::same_as<Bound, std::unreachable_sentinel_t>))
class repeat_view : public ranges::view_interface<repeat_view<W, Bound>>
namespace views {
inline constexpr /* unspecified */ repeat = /* unspecified */;
}
Assinatura da chamada
template< class W >
requires /* see below */
constexpr /* see below */ repeat( W&& value );
template< class W, class Bound >
requires /* see below */
constexpr /* see below */ repeat( W&& value, Bound&& bound );
Conceitos auxiliares
concept /*integer-like-with-usable-difference-type*/ =
/*is-signed-integer-like*/<T>
(/*is-integer-like*/ <T> && std::weakly_incrementable<T>)
```

1) Uma fábrica de range que gera uma sequência de elementos produzindo repetidamente o mesmo valor. Pode ser limitada (bounded) ou ilimitada (unbounded) (infinita).

2) views::repeat(e) e views::repeat(e, f) são [expression-equivalent](<#/doc/language/expressions>) a repeat_view<[std::decay_t](<#/doc/types/decay>)<decltype((E))>>(e) e repeat_view(e, f) respectivamente para quaisquer subexpressões e e f adequadas.

3) Determina se um tipo é [integer-like](<#/doc/iterator/is-integer-like>) e possui um [difference type](<#/doc/iterator>) utilizável.

`repeat_view` modela [`random_access_range`](<#/doc/ranges/random_access_range>). Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>), `repeat_view` também modela [`sized_range`](<#/doc/ranges/sized_range>) e [`common_range`](<#/doc/ranges/common_range>).

### Objetos de ponto de customização

O nome `views::repeat` denota um _objeto de ponto de customização_ , que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-unqualified de seu tipo é denotada como `___repeat_fn_`.

Todas as instâncias de `___repeat_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___repeat_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é obrigada a ser invocável). Assim, `views::repeat` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atender aos requisitos para argumentos de `views::repeat` acima, `___repeat_fn_` modela

* [std::invocable](<#/doc/concepts/invocable>)<__repeat_fn, Args...>,
* [std::invocable](<#/doc/concepts/invocable>)&lt;const __repeat_fn, Args...&gt;,
* [std::invocable](<#/doc/concepts/invocable>)<__repeat_fn&, Args...>, e
* [std::invocable](<#/doc/concepts/invocable>)&lt;const __repeat_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___repeat_fn_` participa da resolução de sobrecarga.

### Membros de dados

Membro | Definição
---|---
[`_movable-box_`](<#/doc/ranges/copyable_wrapper>) ﻿&lt;W&gt; `_value__` | o elemento repetitivo do view
(objeto membro apenas para exposição*)
`Bound` `_bound__` | o valor sentinel
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/repeat_view>) | cria um `repeat_view`
(função membro pública)
[ begin](<#/doc/ranges/repeat_view>) | obtém o iterator inicial de um [`repeat_view`](<#/doc/ranges/repeat_view>)
(função membro pública)
[ end](<#/doc/ranges/repeat_view>) | obtém o sentinel que denota o fim de um [`repeat_view`](<#/doc/ranges/repeat_view>)
(função membro pública)
[ size](<#/doc/ranges/repeat_view>) | obtém o tamanho de um [`repeat_view`](<#/doc/ranges/repeat_view>) se ele for sized
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se o view derivado está vazio. Fornecido se ele satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se ele satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se ele satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se ele satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::repeat_view::repeat_view

```cpp
repeat_view() requires std::default_initializable<W> = default;  // (1) (desde C++23)
constexpr explicit repeat_view( const W& value, Bound bound = Bound() );  // (2) (desde C++23)
constexpr explicit repeat_view( W&& value, Bound bound = Bound() );  // (3) (desde C++23)
template < class... WArgs, class... BoundArgs >
requires std::constructible_from<W, WArgs...>
&& std::constructible_from<Bound, BoundArgs...>
constexpr explicit
repeat( std::piecewise_construct_t, std::tuple<WArgs...> value_args,
std::tuple<BoundArgs...> bound_args = std::tuple<>{} );  // (4) (desde C++23)
```

1) Inicializa por padrão `_[value_](<#/doc/ranges/repeat_view>)_` e inicializa por valor `_[bound_](<#/doc/ranges/repeat_view>)_` ﻿.

2) Inicializa `_[value_](<#/doc/ranges/repeat_view>)_` com value e inicializa `_[bound_](<#/doc/ranges/repeat_view>)_` com bound.

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e bool(bound >= 0) for falso, o comportamento é indefinido.

3) Inicializa `_[value_](<#/doc/ranges/repeat_view>)_` com std::move(value) e inicializa `_[bound_](<#/doc/ranges/repeat_view>)_` com bound.

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e bool(bound >= 0) for falso, o comportamento é indefinido.

4) Inicializa `_[value_](<#/doc/ranges/repeat_view>)_` com [std::make_from_tuple](<#/doc/utility/make_from_tuple>)&lt;T&gt;(std::move(value_args)) e `_[bound_](<#/doc/ranges/repeat_view>)_` com [std::make_from_tuple](<#/doc/utility/make_from_tuple>)&lt;Bound&gt;(std::move(bound_args)).

Se `Bound` não for [std::unreachable_sentinel_t](<#/doc/iterator/unreachable_sentinel_t>) e bool(bound >= 0) for falso, o comportamento é indefinido.

### Parâmetros

- **value** — o valor a ser produzido repetidamente
- **bound** — o limite
- **value_args** — a tupla contendo os inicializadores de `_[value_](<#/doc/ranges/repeat_view>)_`
- **bound_args** — a tupla contendo os inicializadores de `_[bound_](<#/doc/ranges/repeat_view>)_`

## std::ranges::repeat_view::begin

```cpp
constexpr /*iterator*/ begin() const;  // (desde C++23)
```

Retorna [`_iterator_`](<#/doc/ranges/repeat_view/iterator>) ﻿([std::addressof](<#/doc/memory/addressof>)(*`_[value_](<#/doc/ranges/repeat_view>)_` ﻿)).

## std::ranges::repeat_view::end

```cpp
constexpr /*iterator*/ end() const
requires (!std::same_as<Bound, std::unreachable_sentinel_t>);  // (1) (desde C++23)
constexpr std::unreachable_sentinel_t end() const;  // (2) (desde C++23)
```

1) Retorna [`_iterator_`](<#/doc/ranges/repeat_view/iterator>) ﻿([std::addressof](<#/doc/memory/addressof>)(*`_[value_](<#/doc/ranges/repeat_view>)_` ﻿),` ` _[bound_](<#/doc/ranges/repeat_view>)_` ﻿).

2) Retorna [std::unreachable_sentinel](<#/doc/iterator/unreachable_sentinel_t>).

## std::ranges::repeat_view::size

```cpp
constexpr auto size() const
requires (!std::same_as<Bound, std::unreachable_sentinel_t>);  // (desde C++23)
```

Retorna `_[to-unsigned-like](<#/doc/ranges>)_` ﻿(`_[bound_](<#/doc/ranges/repeat_view>)_` ﻿).

### Guias de dedução

```cpp
template< class W, class Bound = std::unreachable_sentinel_t >
repeat_view( W, Bound = Bound() ) -> repeat_view<W, Bound>;  // (desde C++23)
```

### Classes aninhadas

[_iterator_](<#/doc/ranges/repeat_view/iterator>) | o tipo do iterator
(classe membro apenas para exposição*)

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_ranges_repeat`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | [`std::ranges::repeat_view`](<#/doc/ranges/repeat_view>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    #include <string_view>
    using namespace std::literals;
    
    int main()
    {
        // bounded overload
        for (auto s : std::views::repeat("C++"sv, 3))
            std::cout << s << ' ';
        std::cout << '\n';
    
        // unbounded overload
        for (auto s : std::views::repeat("I know that you know that"sv)
                    | std::views::take(3))
            std::cout << s << ' ';
        std::cout << "...\n";
    }
```

Saída:
```
    C++ C++ C++
    I know that you know that I know that you know that I know that you know that ...
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 4053](<https://cplusplus.github.io/LWG/issue4053>) | C++20 | chamadas unárias para `views::repeat` não decaíam o argumento | decair o argumento
[LWG 4054](<https://cplusplus.github.io/LWG/issue4054>) | C++20 | chamar `views::repeat` com um `repeat_view`
não criava um `repeat_view` aninhado | cria um `repeat_view` aninhado

### Veja também

[ ranges::iota_viewviews::iota](<#/doc/ranges/iota_view>)(C++20) | um [`view`](<#/doc/ranges/view>) que consiste em uma sequência gerada incrementando repetidamente um valor inicial
(class template) (objeto de ponto de customização)