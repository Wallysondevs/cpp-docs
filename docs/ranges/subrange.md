# std::ranges::subrange

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template<
std::input_or_output_iterator I,
std::sentinel_for<I> S = I,
ranges::subrange_kind K = std::sized_sentinel_for<S, I> ?
ranges::subrange_kind::sized :
ranges::subrange_kind::unsized
>
requires (K == ranges::subrange_kind::sized
!std::sized_sentinel_for<S, I>)
class subrange
: public ranges::view_interface<subrange<I, S, K>>
Helper concepts
template<class From, class To>
concept /*uses-nonqualification-pointer-conversion*/ =
/* see description */;
template<class From, class To>
concept /*convertible-to-non-slicing*/ = /* see description */;
```

1) O template de classe `subrange` combina um iterator e um sentinel em um único [`view`](<#/doc/ranges/view>). Ele modela [`sized_range`](<#/doc/ranges/sized_range>) sempre que o parâmetro de template final é subrange_kind​::​sized (o que ocorre quando [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<S, I> é satisfeito ou quando o tamanho é passado explicitamente como um argumento de construtor).

2) Determina se `From` é conversível para `To` sem [qualification conversions](<#/doc/language/implicit_cast>). Equivalente a:
```cpp
    template<class From, class To>
    concept /*uses-nonqualification-pointer-conversion*/ =
        std::is_pointer_v<From> && std::is_pointer_v<To> &&
            !std::convertible_to<std::remove_pointer_t<From>(*)[],
                                 std::remove_pointer_t<To>(*)[]>;
```

3) Determina se `From` é conversível para `To` sem conversão de derivada para base:
```cpp
    template<class From, class To>
    concept /*convertible-to-non-slicing*/ =
        std::convertible_to<From, To> &&
            !/*uses-nonqualification-pointer-conversion*/
                <std::decay_t<From>, std::decay_t<To>>;
```

### Membros de dados

Membro | Definição
---|---
constexpr bool `_StoreSize_` [static] | K == ranges::subrange_kind::sized &&
` `![std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<S, I>
(constante membro estática apenas para exposição*)
`I` `_begin__` | um iterator para o início do subrange
(objeto membro apenas para exposição*)
`S` `_end__` | um sentinel denotando o fim do subrange
(objeto membro apenas para exposição*)
`_[make-unsigned-like-t](<#/doc/ranges>)_` ﻿<[std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;I&gt;> `_size__`
(presente apenas se `_StoreSize_` for verdadeiro) | o tamanho do subrange
(objeto membro apenas para exposição*)

### Funções membro

[ (constructor)](<#/doc/ranges/subrange/subrange>) | cria um novo `subrange`
(função membro pública)
[ operator PairLike](<#/doc/ranges/subrange/operator_PairLike>) | converte o `subrange` para um tipo [`_pair-like_`](<#/doc/utility/tuple/tuple-like>)
(função membro pública)

##### Observadores

[ begin](<#/doc/ranges/subrange/begin>) | obtém o iterator
(função membro pública)
[ end](<#/doc/ranges/subrange/end>) | obtém o sentinel
(função membro pública)
[ empty](<#/doc/ranges/subrange/empty>) | verifica se o `subrange` está vazio
(função membro pública)
[ size](<#/doc/ranges/subrange/size>) | obtém o tamanho do `subrange`
(função membro pública)

##### Operações de Iterator

[ advance](<#/doc/ranges/subrange/advance>) | avança o iterator por uma dada distância
(função membro pública)
[ prev](<#/doc/ranges/subrange/prev>) | obtém uma cópia do `subrange` com seu iterator decrementado por uma dada distância
(função membro pública)
[ next](<#/doc/ranges/subrange/next>) | obtém uma cópia do `subrange` com seu iterator avançado por uma dada distância
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ data](<#/doc/ranges/view_interface/data>) | obtém o endereço dos dados do view derivado. Fornecido se seu tipo de iterator satisfaz [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>).
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se ele satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se ele satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se ele satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/subrange/deduction_guides>)

### Funções não-membro

[ get(std::ranges::subrange)](<#/doc/ranges/subrange/get>)(C++20) | obtém iterator ou sentinel de um **std::ranges::subrange**
(template de função)

### Tipos auxiliares

[ ranges::subrange_kind](<#/doc/ranges/subrange_kind>)(C++20) | especifica se um **std::ranges::subrange** modela [std::ranges::sized_range](<#/doc/ranges/sized_range>)
(enum)
[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(C++20) | obtém o tamanho de um **std::ranges::subrange**
(especialização de template de classe)
[ std::tuple_element<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_element>)(C++20) | obtém o tipo do iterator ou do sentinel de um **std::ranges::subrange**
(especialização de template de classe)

### Templates auxiliares

```cpp
template< class I, class S, ranges::subrange_kind K >
constexpr bool ranges::enable_borrowed_range<ranges::subrange<I, S, K>> = true;  // (desde C++20)
```

Esta especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) faz com que `subrange` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>).

### Exemplo

Execute este código
```cpp
    #include <map>
    #include <print>
    #include <ranges>
    
    void make_uppercase(char& v)
    {
        v += 'A' - 'a';
    }
    
    void uppercase_transform(std::multimap<int, char>& m, int k)
    {
        auto [first, last] = m.equal_range(k);
        for (auto& [_, v] : std::ranges::subrange(first, last))
            make_uppercase(v);
    }
    
    int main()
    {
        std::multimap<int, char> mm{{4, 'a'}, {3, '-'}, {4, 'b'}, {5, '-'}, {4, 'c'}};
        std::println("Before: {}", mm);
        uppercase_transform(mm, 4);
        std::println("After:  {}", mm);
    }
```

Output:
```
    Before: {3: '-', 4: 'a', 4: 'b', 4: 'c', 5: '-'}
    After:  {3: '-', 4: 'A', 4: 'B', 4: 'C', 5: '-'}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3470](<https://cplusplus.github.io/LWG/issue3470>) | C++20 | `_convertible-to-non-slicing_` pode rejeitar qualification conversions | sempre as aceita

### Ver também

[ ranges::view_interface](<#/doc/ranges/view_interface>)(C++20) | template de classe auxiliar para definir um [`view`](<#/doc/ranges/view>), usando o [curiously recurring template pattern](<#/doc/language/crtp>)
(template de classe)

### Links externos

[Read/write all values of a `std::multimap` with a given key in C++20](<https://stackoverflow.com/a/59659686>) — SO
---