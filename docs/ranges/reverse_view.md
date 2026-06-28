# std::ranges::views::reverse, std::ranges::reverse_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::view V >
requires ranges::bidirectional_range<V>
class reverse_view
: public ranges::view_interface<reverse_view<V>>
namespace views {
inline constexpr /* unspecified */ reverse = /* unspecified */;
}
Call signature
template< ranges::viewable_range R >
requires /* see below */
constexpr ranges::view auto reverse( R&& r );
```

1) Um adaptador de range que representa uma view do [`view`](<#/doc/ranges/view>) subjacente com ordem invertida.

2) [RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>). A expressão views::reverse(e) é [expression-equivalent](<#/doc/language/expressions>) a uma das seguintes expressões, exceto que e é avaliada apenas uma vez:

  * e.base(), se o tipo de `e` for uma especialização (possivelmente cv-qualificada) de `reverse_view`;
  * caso contrário, se o tipo de e for (possivelmente cv-qualificado) [ranges::subrange](<#/doc/ranges/subrange>)<[std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;I&gt;, [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;I&gt;, K> para algum tipo de iterator `I` e valor `K` do tipo `ranges::subrange_kind`:

  * [ranges::subrange](<#/doc/ranges/subrange>)<I, I, K>(e.end().base(), e.begin().base(), e.size()), se `K` for `ranges::subrange_kind::sized`;
  * caso contrário [ranges::subrange](<#/doc/ranges/subrange>)<I, I, K>(e.end().base(), e.begin().base());

  * caso contrário ranges::reverse_view{e}.

Em outras palavras, `views::reverse` "desembrulha" views invertidas, se possível.

Uma `reverse_view` sempre modela [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>), e modela [`borrowed_range`](<#/doc/ranges/borrowed_range>), [`sized_range`](<#/doc/ranges/sized_range>), ou [`random_access_range`](<#/doc/ranges/random_access_range>) se o tipo de view subjacente `V` modelar o concept correspondente.

### Membros de dados

Nome do membro | Definição
---|---
`_base__` (privado) | A view subjacente do tipo `V`.
(objeto membro apenas para exposição*)
`_cached_end__` (privado) | Um objeto de cache [tipo-optional](<#/doc/ranges>) que contém nenhum valor ou o iterator/posição final da view subjacente, que existe apenas se o tipo de view subjacente `V` não modelar [`common_range`](<#/doc/ranges/common_range>).
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/reverse_view>) | constrói uma `reverse_view`
(função membro pública)
[ base](<#/doc/ranges/reverse_view>) | retorna a view subjacente `V`
(função membro pública)
[ begin](<#/doc/ranges/reverse_view>) | retorna o iterator inicial da `reverse_view`
(função membro pública)
[ end](<#/doc/ranges/reverse_view>) | retorna o iterator final da `reverse_view`
(função membro pública)
[ size](<#/doc/ranges/reverse_view>) | retorna o tamanho da view se ela for limitada
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
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

## std::ranges::reverse_view::reverse_view

```cpp
reverse_view() requires std::default_initializable<V> = default;  // (1) (desde C++20)
constexpr reverse_view( V r );  // (2) (desde C++20)
```

1) Inicializa por valor `_base__` através de seu inicializador de membro padrão (= V()).

2) Inicializa `_base__` com std::move(r).

### Parâmetros

- **r** — range a ser invertido

## std::ranges::reverse_view::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++20)
constexpr V base() &&;  // (2) (desde C++20)
```

Retorna a view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a return base_;.

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a return std::move(base_);.

## std::ranges::reverse_view::begin

```cpp
constexpr std::reverse_iterator<ranges::iterator_t<V>> begin();  // (1) (desde C++20)
constexpr std::reverse_iterator<ranges::iterator_t<V>> begin()
requires ranges::common_range<V>;  // (2) (desde C++20)
constexpr auto begin() const requires ranges::common_range<const V>;  // (3) (desde C++20)
```

1) Retorna [std::make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)([ranges::next](<#/doc/iterator/ranges/next>)([ranges::begin](<#/doc/ranges/begin>)(base_), [ranges::end](<#/doc/ranges/end>)(base_))). A fim de fornecer a complexidade de tempo constante amortizada exigida pelo concept [`range`](<#/doc/ranges/range>), esta função armazena em cache o resultado dentro do objeto de cache para uso em chamadas subsequentes.

2,3) Equivalente a return [std::make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)([ranges::end](<#/doc/ranges/end>)(base_));.

## std::ranges::reverse_view::end

```cpp
constexpr std::reverse_iterator<ranges::iterator_t<V>> end();  // (1) (desde C++20)
constexpr auto end() const requires ranges::common_range<const V>;  // (2) (desde C++20)
```

Equivalente a return [std::make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)([ranges::begin](<#/doc/ranges/begin>)(base_));.

## std::ranges::reverse_view::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (1) (desde C++20)
constexpr auto size() const requires ranges::sized_range<const V>;  // (2) (desde C++20)
```

Retorna o tamanho da view se a view for limitada.

1,2) Equivalente a return [ranges::size](<#/doc/ranges/size>)(base_);.

### Guias de dedução

```cpp
template< class R >
reverse_view( R&& ) -> reverse_view<views::all_t<R>>;  // (desde C++20)
```

### Templates auxiliares

```cpp
template< class T >
constexpr bool enable_borrowed_range<std::ranges::reverse_view<T>> =
ranges::enable_borrowed_range<T>;  // (desde C++20)
```

Esta especialização de [`std::ranges::enable_borrowed_range`](<#/doc/ranges/borrowed_range>) faz com que `reverse_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>) quando a view subjacente a satisfaz.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        static constexpr auto il = {3, 1, 4, 1, 5, 9};
    
        std::ranges::reverse_view rv{il};
        for (int i : rv)
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (int i : il | std::views::reverse)
            std::cout << i << ' ';
        std::cout << '\n';
    
        // operator[] is inherited from std::view_interface
        for (auto i{0U}; i != rv.size(); ++i)
            std::cout << rv[i] << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    9 5 1 4 1 3
    9 5 1 4 1 3
    9 5 1 4 1 3
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 3494](<https://cplusplus.github.io/LWG/issue3494>) | C++20 | `reverse_view` nunca foi um `borrowed_range` | é um `borrowed_range` se sua view subjacente for

### Veja também

[ reverse_iterator](<#/doc/iterator/reverse_iterator>) | adaptador de iterator para travessia em ordem inversa
(class template)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(objeto de função de algoritmo)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que é invertido
(objeto de função de algoritmo)