# std::ranges::views::as_rvalue, std::ranges::as_rvalue_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
requires ranges::input_range<V>
class as_rvalue_view
: public ranges::view_interface<as_rvalue_view<V>>
namespace views {
inline constexpr /* unspecified */ as_rvalue = /* unspecified */;
}
Assinatura da chamada
template< ranges::viewable_range R >
requires /* see below */
constexpr ranges::view auto as_rvalue( R&& r );
```

1) Um adaptador de range que representa uma view de uma [`view`](<#/doc/ranges/view>) subjacente cujos elementos são rvalues.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). Seja e uma subexpressão e T seja decltype((e)). Então a expressão views::as_rvalue(e) é [expressão-equivalente](<#/doc/language/expressions>) a:

  * [views::all](<#/doc/ranges/all_view>)(e), se for uma expressão bem formada, T modela [`input_range`](<#/doc/ranges/input_range>), e [std::same_as](<#/doc/concepts/same_as>)<[ranges::range_rvalue_reference_t](<#/doc/ranges/range_reference_t>)&lt;T&gt;, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;T&gt;> for verdadeiro;
  * as_rvalue_view{e} caso contrário.

### Membros de dados

Objeto membro | Definição
---|---
`_base__` (privado) | A view subjacente do tipo `V`.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/as_rvalue_view>) | constrói um `as_rvalue_view`
(função membro pública)
[ base](<#/doc/ranges/as_rvalue_view>) | retorna a view `V` subjacente
(função membro pública)
[ begin](<#/doc/ranges/as_rvalue_view>) | retorna o iterator de início da `as_rvalue_view`
(função membro pública)
[ end](<#/doc/ranges/as_rvalue_view>) | retorna o iterator de fim da `as_rvalue_view`
(função membro pública)
[ size](<#/doc/ranges/as_rvalue_view>) | retorna o tamanho da view se ela for limitada
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o enésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::as_rvalue_view::as_rvalue_view

```cpp
as_rvalue_view() requires std::default_initializable<V> = default;  // (1) (desde C++23)
constexpr explicit as_rvalue_view( V base );  // (2) (desde C++23)
```

1) Inicializa por valor `_base__` através de seu inicializador de membro padrão (= V()).

2) Inicializa `_base__` com std::move(base).

### Parâmetros

- **base** — uma view

## std::ranges::as_rvalue_view::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

Retorna a view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a return base_;.

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a return std::move(base_);.

## std::ranges::as_rvalue_view::begin

```cpp
constexpr auto begin() requires (!/*simple-view*/<V>);  // (1) (desde C++23)
constexpr auto begin() const requires ranges::range<const V>;  // (2) (desde C++23)
```

1,2) Retorna [std::move_iterator](<#/doc/iterator/move_iterator>)([ranges::begin](<#/doc/ranges/begin>)(base_)).

## std::ranges::as_rvalue_view::end

```cpp
constexpr auto end() requires (!/*simple-view*/<V>);  // (1) (desde C++23)
constexpr auto end() const requires ranges::range<const V>;  // (2) (desde C++23)
```

1) Retorna [std::move_iterator](<#/doc/iterator/move_iterator>)([ranges::end](<#/doc/ranges/end>)(base_)) se `V` modela [`common_range`](<#/doc/ranges/common_range>), caso contrário [std::move_sentinel](<#/doc/iterator/move_sentinel>)([ranges::end](<#/doc/ranges/end>)(base_)).

2) Retorna [std::move_iterator](<#/doc/iterator/move_iterator>)([ranges::end](<#/doc/ranges/end>)(base_)) se `const V` modela [`common_range`](<#/doc/ranges/common_range>), caso contrário [std::move_sentinel](<#/doc/iterator/move_sentinel>)([ranges::end](<#/doc/ranges/end>)(base_)).

## std::ranges::as_rvalue_view::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++23)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++23)
```

Retorna o tamanho da view se a view for limitada.

1,2) Equivalente a return [ranges::size](<#/doc/ranges/size>)(base_);

### Guias de dedução

```cpp
template< class R >
as_rvalue_view( R&& ) -> as_rvalue_view<views::all_t<R>>;  // (desde C++23)
```

### Templates auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::as_rvalue_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++23)
```

Esta especialização de [`std::ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `as_rvalue_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente a satisfaz.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_ranges_as_rvalue`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::ranges::as_rvalue_view`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::vector<std::string> words =
            {"the", "quick", "brown", "\N{FOX FACE}", "ate", "an", "archeopteryx"};
        std::vector<std::string> new_words;
    
        std::ranges::copy(
            words | std::views::as_rvalue,
            std::back_inserter(new_words)); // move string from words into new_words
    
        auto quoted = std::views::transform( { return "“" + s + "”"; });
    
        std::cout << "Words: ";
        for (auto&& word : words | std::views::as_rvalue | quoted)
            std::cout << word << ' ';
    
        std::cout << "\nNew words: ";
        for (auto&& word : new_words | std::views::as_rvalue | quoted)
            std::cout << word << ' ';
    }
```

Saída possível:
```
    Words: “” “” “” “” “” “” “” 
    New words: “the” “quick” “brown” “🦊” “ate” “an” “archeopteryx”
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 4083](<https://cplusplus.github.io/LWG/issue4083>) | C++23 | views::as_rvalue costumava aceitar ranges que não eram input ranges | tornou-se rejeitado

### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferência de um objeto para seu tipo de referência rvalue associado
(objeto de ponto de customização)
[ move_iterator](<#/doc/iterator/move_iterator>)(C++11) | adaptador de iterator que desreferencia para um rvalue
(template de classe)
[ move_sentinel](<#/doc/iterator/move_sentinel>)(C++20) | adaptador de sentinel para [std::move_iterator](<#/doc/iterator/move_iterator>)
(template de classe)
[ ranges::as_const_viewviews::as_const](<#/doc/ranges/as_const_view>)(C++23) | converte uma [`view`](<#/doc/ranges/view>) em um [`constant_range`](<#/doc/ranges/constant_range>)
(template de classe) (objeto adaptador de range)