# std::ranges::views::concat, std::ranges::concat_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range... Views >
requires (ranges::view<Views> && ...) && (sizeof...(Views) > 0) &&
/*concatable*/<Views...>
class concat_view
: public ranges::view_interface<concat_view<Views...>>
namespace views {
inline constexpr /* unspecified */ concat = /* unspecified */;
}
Call signature
template< ranges::viewable_range... Rs >
requires /* see below */
constexpr ranges::view auto concat( Rs&&... rs );
Helper type aliases
template< class... Rs >
using /*concat-reference-t*/ =
ranges::common_reference_t<ranges::range_reference_t<Rs>...>;
template< class... Rs >
using /*concat-value-t*/ = std::common_type_t<ranges::range_value_t<Rs>...>;
template< class... Rs >
using /*concat-rvalue-reference-t*/ =
ranges::common_reference_t<ranges::range_rvalue_reference_t<Rs>...>;
Helper concepts
template< class Ref, class RRef, class It >
concept /*concat-indirectly-readable-impl*/ = /* veja a descrição */;
template< class... Rs >
concept /*concatable*/ = /* veja a descrição */;
```

`concat_view` apresenta uma fábrica de [`view`](<#/doc/ranges/view>) que recebe um número arbitrário de ranges como uma lista de argumentos, e fornece uma view que começa no primeiro elemento do primeiro range, termina no último elemento do último range, com todos os elementos dos ranges sequenciados entre eles, respectivamente, na ordem dada nos argumentos, efetivamente concatenando, ou encadeando os ranges de argumento.

1) O template de classe com um parâmetro de template que é um pack não vazio de [`view`s](<#/doc/ranges/view>), cada um dos quais modela pelo menos [`input_range`](<#/doc/ranges/input_range>) e é `_[concatable](<#/doc/ranges/concat_view>)_` (7).

2) `views::concat` é um objeto de ponto de customização.

Dado um pack de subexpressões exprs, a expressão views::concat(exprs...) é [expression-equivalent](<#/doc/language/expressions>) a

*   [views::all](<#/doc/ranges/all_view>)(exprs...) se exprs for um pack com apenas um elemento cujo tipo modela [`input_range`](<#/doc/ranges/input_range>),
*   concat_view(exprs...) caso contrário.

3) Representa o tipo de referência. Uma restrição extra é necessária para garantir que o `ranges::range_reference_t` de cada range subjacente seja conversível para `ranges::common_reference_t`.

4) O `_iterator_ ::value_type` que adicionalmente respeita o `value_type` dos ranges subjacentes para suportar os casos em que os ranges subjacentes possuem iteradores proxy.

5) A referência rvalue que também suporta corretamente os casos em que iteradores subjacentes customizam `iter_move`.

6) Define o conceito `_indirectly-readable_` para o `_iterator_` para que `concat_view` possa modelar [`input_range`](<#/doc/ranges/input_range>).

Equivalente a:
```cpp
    template< class... Rs >
    concept /*concat-indirectly-readable*/ = // exposition only
        std::common_reference_with</*concat-reference-t*/<Rs...>&&,
                                   /*concat-value-t*/<Rs...>&> &&
        std::common_reference_with</*concat-reference-t*/<Rs...>&&,
                                   /*concat-rvalue-reference-t*/<Rs...>&&> &&
        std::common_reference_with</*concat-rvalue-reference-t*/<Rs...>&&,
                                   /*concat-value-t*/<Rs...> const&> &&
        (/*concat-indirectly-readable-impl*/</*concat-reference-t*/<Rs...>,
                                             /*concat-rvalue-reference-t*/<Rs...>,
                                             ranges::iterator_t<Rs>> && ...);
```

onde o conceito apenas para exposição /*concat-indirectly-readable-impl*/ é
```cpp
    template< class Ref, class RRef, class It >
    concept /*concat-indirectly-readable-impl*/ = // exposition only
        requires(const It it) {
            { *it } -> std::convertible_to<Ref>;
            { ranges::iter_move(it)} -> std::convertible_to<RRef>;
        };
```

7) Determina se dois ou mais ranges diferentes podem ser adaptados em uma sequência que por si mesma modela um range. Equivalente a:
```cpp
    template< class... Rs >
    concept /*concatable*/ = requires { // exposition only
            typename /*concat-reference-t*/<Rs...>;
            typename /*concat-value-t*/<Rs...>;
            typename /*concat-rvalue-reference-t*/<Rs...>;
        } && /*concat-indirectly-readable*/<Rs...>;
```

`concat_view` sempre modela [`input_range`](<#/doc/ranges/input_range>), e modela [`forward_range`](<#/doc/ranges/forward_range>), [`bidirectional_range`](<#/doc/ranges/bidirectional_range>), [`random_access_range`](<#/doc/ranges/random_access_range>), ou [`sized_range`](<#/doc/ranges/sized_range>) se cada tipo de [`view`](<#/doc/ranges/view>) adaptado modelar o conceito correspondente.

`concat_view` pode ser [`common_range`](<#/doc/ranges/common_range>) se o último range subjacente modelar [`common_range`](<#/doc/ranges/common_range>).

### Objetos de ponto de customização

O nome `views::concat` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [`semiregular`](<#/doc/concepts/semiregular>) [literal](<#/doc/named_req/LiteralType>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___concat_fn_`.

Todas as instâncias de `___concat_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___concat_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como `const` ou não (no entanto, uma instância qualificada como `volatile` não é exigida ser invocável). Assim, `views::concat` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se `std::declval<Args>()...` atender aos requisitos para argumentos de `views::concat` acima, `___concat_fn_` modela

*   `std::invocable<__concat_fn, Args...>`,
*   `std::invocable<const __concat_fn, Args...>`,
*   `std::invocable<__concat_fn&, Args...>`, e
*   `std::invocable<const __concat_fn&, Args...`.

Caso contrário, nenhum operador de chamada de função de `___concat_fn_` participa da resolução de sobrecarga.

### Membros de dados

Membro | Descrição
---|---
[std::tuple](<#/doc/utility/tuple>)<Views...> `_views__` | todos os objetos de view adaptados
(membro objeto apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/concat_view/concat_view>) | constrói uma `concat_view`
(função membro pública)
[ begin](<#/doc/ranges/concat_view/begin>) | retorna um iterador para o início
(função membro pública)
[ end](<#/doc/ranges/concat_view/end>) | retorna um iterador ou um sentinela para o fim
(função membro pública)
[ size](<#/doc/ranges/concat_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfizer [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se satisfizer [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterador constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinela para o iterador constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) for aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento na view derivada. Fornecido se satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/concat_view/deduction_guides>)

### Classes aninhadas

Nome da classe | Definição
---|---
[_iterator_](<#/doc/ranges/concat_view/iterator>) | o tipo de iterador
(template de classe membro apenas para exposição*)

### Templates auxiliares

Não há especialização de [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) para `concat_view`, porque isso exigiria que a implementação do iterador contivesse uma cópia de todos os iteradores e sentinelas de todos os ranges subjacentes em todos os momentos.

### Notas

`views::concat()` sem argumentos é malformado, porque não há uma maneira razoável de determinar um tipo de elemento `T`. `views::concat(r)` com um único argumento é expression-equivalent a [views::all](<#/doc/ranges/all_view>)(r).

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_concat`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | `std::ranges::concat_view`

### Exemplo

A versão preliminar pode ser verificada no [Compiler Explorer](<https://godbolt.org/z/o84hc69o9>).

Execute este código
```cpp
    #include <cassert>
    #include <list>
    #include <print>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        std::vector<int> v0{1, 2, 3}, v1{4, 5};
        int a[]{6, 7};
        int i{8};
        auto ie{std::views::single(i)};
    
        auto con = std::views::concat(v0, v1, a, ie);
        assert(con.size() == v0.size() + v1.size() + std::size(a) + ie.size());
        std::println("con.size(): {}", con.size());
        std::println("con: {}", con);
        con[6] = 42; // con is random_access_range, operator[] returns a reference
        assert(a[1] == 42); // a[1] was modified via con[6]
        std::println("con: {}", con);
    
        std::list<int> l{7, 8}; // list is bidirectional range
        auto cat = std::views::concat(v0, l);
        std::println("cat: {}", cat);
        // cat[0] = 13; // compile-time error: cat is bidirectional => no operator[]
    }
```

Saída:
```
    con.size(): 8
    con: [1, 2, 3, 4, 5, 6, 7, 8]
    con: [1, 2, 3, 4, 5, 6, 42, 8]
    cat: [1, 2, 3, 7, 8]
```

### Referências

*   Padrão C++26 (ISO/IEC 14882:2026):

*   26.7.18 Concat view [range.concat]

### Veja também

[ ranges::join_viewviews::join](<#/doc/ranges/join_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma [`view`](<#/doc/ranges/view>) de [`range`s](<#/doc/ranges/range>)
(template de classe) (objeto adaptador de range)
[ ranges::join_with_viewviews::join_with](<#/doc/ranges/join_with_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo na sequência obtida ao achatar uma view de ranges, com o delimitador entre os elementos
(template de classe) (objeto adaptador de range)
[ ranges::zip_viewviews::zip](<#/doc/ranges/zip_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo em tuplas de referências aos elementos correspondentes das views adaptadas
(template de classe) (objeto de ponto de customização)
[ ranges::cartesian_product_viewviews::cartesian_product](<#/doc/ranges/cartesian_product_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) consistindo em tuplas de resultados calculados pelo produto cartesiano n-ário das views adaptadas
(template de classe) (objeto de ponto de customização)