# std::ranges::views::cartesian_product, std::ranges::cartesian_product_view

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< ranges::input_range First, ranges::forward_range... Vs >
requires (ranges::view<First> && ... && ranges::view<Vs>)
class cartesian_product_view
: public ranges::view_interface<cartesian_product_view<First, Vs...>>
namespace views {
inline constexpr /*unspecified*/ cartesian_product = /*unspecified*/;
}
Assinatura da chamada
template< ranges::viewable_range... Rs >
requires /* see below */
constexpr ranges::view auto cartesian_product( Rs&&... rs );
Conceitos auxiliares
template< bool Const, class First, class... Vs >
concept /*cartesian-product-is-random-access*/ =
(ranges::random_access_range</*maybe-const*/<Const, First>> && ... &&
(ranges::random_access_range</*maybe-const*/<Const, Vs>> &&
ranges::sized_range</*maybe-const*/<Const, Vs>>));
template< class R >
concept /*cartesian-product-common-arg*/ =
ranges::common_range<R>
(ranges::sized_range<R> && ranges::random_access_range<R>);
template< bool Const, class First, class... Vs >
concept /*cartesian-product-is-bidirectional*/ =
(ranges::bidirectional_range</*maybe-const*/<Const, First>> && ... &&
(ranges::bidirectional_range</*maybe-const*/<Const, Vs>> &&
/*cartesian-product-common-arg*/</*maybe-const*/<Const, Vs>>));
template< class First, class... Vs >
concept /*cartesian-product-is-common*/ =
/*cartesian-product-common-arg*/<First>;
template< class... Vs >
concept /*cartesian-product-is-sized*/ =
(ranges::sized_range<Vs> && ...);
template< bool Const, template<class> class FirstSent, class First, class... Vs >
concept /*cartesian-is-sized-sentinel*/ =
(std::sized_sentinel_for<FirstSent</*maybe-const*/<Const, First>>,
ranges::iterator_t</*maybe-const*/<Const, First>>> && ... &&
(ranges::sized_range</*maybe-const*/<Const, Vs>> &&
std::sized_sentinel_for<ranges::iterator_t<
/*maybe-const*/<Const, Vs>>,
ranges::iterator_t</*maybe-const*/<Const, Vs>>>));
Modelos de função auxiliares
template< /*cartesian-product-common-arg*/ R >
constexpr auto /*cartesian-common-arg-end*/( R& r )
{
if constexpr (ranges::common_range<R>)
return ranges::end(r);
else
return ranges::begin(r) + ranges::distance(r);
}
```

1) `cartesian_product_view` é um adaptador de range que recebe _n_ [`view`](<#/doc/ranges/view>)s, onde _n > 0_, e produz uma [`view`](<#/doc/ranges/view>) de tuplas calculadas pelo [produto cartesiano n-ário](<https://en.wikipedia.org/wiki/Cartesian_product#n-ary_Cartesian_product> "enwiki:Cartesian product") dos ranges fornecidos. O tamanho da view produzida é um múltiplo dos tamanhos dos ranges fornecidos, enquanto cada elemento é uma tupla (de referências) de tamanho _n_.

2) `views::cartesian_product` é um objeto de ponto de customização.

  * Ao ser chamado sem argumentos, views::cartesian_product() é [expressão-equivalente](<#/doc/language/expressions>) a [views::single](<#/doc/ranges/single_view>)([std::tuple](<#/doc/utility/tuple>)()).
  * Caso contrário, views::cartesian_product(rs...) é [expressão-equivalente](<#/doc/language/expressions>) a ranges::cartesian_product_view<[views::all_t](<#/doc/ranges/all_view>)<decltype((rs))>...>(rs...).

3) Determina se `cartesian_product` é um range de acesso aleatório (veja também [`random_access_range`](<#/doc/ranges/random_access_range>)).

4) Determina se `cartesian_product` é um common range (veja também [`common_range`](<#/doc/ranges/common_range>)).

5) Determina se `cartesian_product` é um range bidirecional (veja também [`bidirectional_range`](<#/doc/ranges/bidirectional_range>)).

6) Determina se `cartesian_product` satisfaz o conceito auxiliar /*cartesian-product-is-common*/ (veja também [`common_range`](<#/doc/ranges/common_range>)).

7) Determina se `cartesian_product` é um sized range (veja também [`sized_range`](<#/doc/ranges/sized_range>)).

8) Determina se `cartesian_product` usa um sized sentinel.

9) Retorna o fim da [`view`](<#/doc/ranges/view>) produzida. Participa da resolução de sobrecarga apenas se `cartesian_product` satisfaz o conceito auxiliar /*cartesian-product-common-arg*/.

O [`range`](<#/doc/ranges/range>) `First` passado para `cartesian_product_view` é tratado de forma especial, uma vez que ele é percorrido apenas uma única vez. Como resultado, várias restrições são relaxadas sobre ele:

  * `First` é um [`input_range`](<#/doc/ranges/input_range>) em vez de um [`forward_range`](<#/doc/ranges/forward_range>);
  * `First` não precisa ser um [`sized_range`](<#/doc/ranges/sized_range>) para que o `cartesian_product_view` seja um [`random_access_range`](<#/doc/ranges/random_access_range>) ou um [`common_range`](<#/doc/ranges/common_range>);
  * `First` não precisa ser um [`common_range`](<#/doc/ranges/common_range>) para que o `cartesian_product_view` seja um [`bidirectional_range`](<#/doc/ranges/bidirectional_range>).

### Objetos de ponto de customização

O nome `views::cartesian_product` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [semiregular](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___cartesian_product_fn_`.

Todas as instâncias de `___cartesian_product_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___cartesian_product_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualificada ou não (no entanto, uma instância volatile-qualificada não é exigida ser invocável). Assim, `views::cartesian_product` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atendem aos requisitos para argumentos de `views::cartesian_product` acima, `___cartesian_product_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__cartesian_product_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cartesian_product_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__cartesian_product_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cartesian_product_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___cartesian_product_fn_` participa da resolução de sobrecarga.

### Membros de dados

Membro | Definição
---|---
[std::tuple](<#/doc/utility/tuple>)<First, Vs...> `_base__` (private) | Um objeto que contém todos os objetos [`view`](<#/doc/ranges/view>) adaptados.
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/cartesian_product_view/cartesian_product_view>) | constrói um `cartesian_product_view`
(função membro pública)
[ begin](<#/doc/ranges/cartesian_product_view/begin>) | retorna um iterator para o início
(função membro pública)
[ end](<#/doc/ranges/cartesian_product_view/end>) | retorna um iterator ou um sentinel para o fim
(função membro pública)
[ size](<#/doc/ranges/cartesian_product_view/size>) | retorna o número de elementos. Fornecido apenas se o range subjacente (adaptado) satisfaz [`sized_range`](<#/doc/ranges/sized_range>).
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ empty](<#/doc/ranges/view_interface/empty>) | retorna se a view derivada está vazia. Fornecido se ela satisfaz [`sized_range`](<#/doc/ranges/sized_range>) ou [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinel para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se a view derivada não está vazia. Fornecido se [ranges::empty](<#/doc/ranges/empty>) é aplicável a ela.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento na view derivada. Fornecido se ela satisfaz [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento na view derivada. Fornecido se ela satisfaz [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o n-ésimo elemento na view derivada. Fornecido se ela satisfaz [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de dedução](<#/doc/ranges/cartesian_product_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/cartesian_product_view/iterator>) | o tipo do iterator
(modelo de classe membro apenas para exposição*)

### Notas

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_ranges_cartesian_product`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::ranges::cartesian_product_view`

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <list>
    #include <ranges>
    #include <string>
    #include <vector>
    
    void print(std::tuple<char const&, int const&, std::string const&> t, int pos)
    {
        const auto& [a, b, c] = t;
        std::cout << '(' << a << ' ' << b << ' ' << c << ')' << (pos % 4 ? " " : "\n");
    }
    
    int main()
    {
        const auto x = std::array{'A', 'B'};
        const auto y = std::vector{1, 2, 3};
        const auto z = std::list<std::string>{"α", "β", "γ", "δ"};
    
        for (int i{1}; auto const& tuple : std::views::cartesian_product(x, y, z))
            print(tuple, i++);
    }
```

Saída:
```
    (A 1 α) (A 1 β) (A 1 γ) (A 1 δ)
    (A 2 α) (A 2 β) (A 2 γ) (A 2 δ)
    (A 3 α) (A 3 β) (A 3 γ) (A 3 δ)
    (B 1 α) (B 1 β) (B 1 γ) (B 1 δ)
    (B 2 α) (B 2 β) (B 2 γ) (B 2 δ)
    (B 3 α) (B 3 β) (B 3 γ) (B 3 δ)
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 26.7.31 Cartesian product view [range.stride]

### Veja também

[ ranges::zip_viewviews::zip](<#/doc/ranges/zip_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) que consiste em tuplas de referências para elementos correspondentes das views adaptadas
(modelo de classe) (objeto de ponto de customização)