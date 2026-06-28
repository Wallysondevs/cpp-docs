Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< std::weakly_incrementable W,
std::semiregular Bound = std::unreachable_sentinel_t >
requires /*weakly-equality-comparable-with*/<W, Bound> && std::copyable<W>
class iota_view
: public ranges::view_interface<iota_view<W, Bound>>
namespace views {
inline constexpr /* unspecified */ iota = /* unspecified */;
}
Call signature
template< class W >
requires /* see below */
constexpr /* see below */ iota( W&& value );
template< class W, class Bound >
requires /* see below */
constexpr /* see below */ iota( W&& value, Bound&& bound );
```

1) Uma fábrica de ranges que gera uma sequência de elementos incrementando repetidamente um valor inicial. Pode ser limitado ou ilimitado (infinito).

2) `views::iota(e)` e `views::iota(e, f)` são [equivalentes em expressão](<#/doc/language/expressions>) a `iota_view<[std::decay_t](<#/doc/types/decay>)<decltype((e))>>(e)` e `iota_view(e, f)` respectivamente para quaisquer subexpressões `e` e `f` adequadas.

### Objetos de Ponto de Personalização

O nome `views::iota` denota um _objeto de ponto de personalização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [`semiregular`](<#/doc/concepts/semiregular>) [literal](<#/doc/named_req/LiteralType>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___iota_fn_`.

Todas as instâncias de `___iota_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___iota_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada por const ou não (no entanto, uma instância qualificada por volatile não é obrigada a ser invocável). Assim, `views::iota` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se `[std::declval](<#/doc/utility/declval>)<Args>()...` atender aos requisitos para argumentos de `views::iota` acima, `___iota_fn_` modela

*   [std::invocable](<#/doc/concepts/invocable>)<__iota_fn, Args...>,
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __iota_fn, Args...&gt;,
*   [std::invocable](<#/doc/concepts/invocable>)<__iota_fn&, Args...>, e
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __iota_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___iota_fn_` participa da resolução de sobrecarga.

### Membros de dados

Membro | Definição
---|---
`W` `_value__` | o valor inicial
(objeto membro apenas para exposição*)
`Bound` `_bound__` | o valor sentinela, pode ser inatingível
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/ranges/iota_view/iota_view>) | cria um `iota_view`
(função membro pública)
[ begin](<#/doc/ranges/iota_view/begin>) | obtém o iterator inicial de um `iota_view`
(função membro pública)
[ end](<#/doc/ranges/iota_view/end>) | obtém o sentinela que denota o fim de um `iota_view`
(função membro pública)
[ empty](<#/doc/ranges/iota_view/empty>) | testa se o `iota_view` está vazio (ou seja, o iterator e o sentinela se comparam como iguais)
(função membro pública)
[ size](<#/doc/ranges/iota_view/size>)(opcional) | obtém o tamanho de um `iota_view` (fornecido apenas se for limitado)
(função membro pública)

##### Herdado de [std::ranges::view_interface](<#/doc/ranges/view_interface>)

[ cbegin](<#/doc/ranges/view_interface/cbegin>)(C++23) | retorna um iterator constante para o início do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ cend](<#/doc/ranges/view_interface/cend>)(C++23) | retorna um sentinela para o iterator constante do range.
(função membro pública de `std::ranges::view_interface<D>`)
[ operator bool](<#/doc/ranges/view_interface/operator_bool>) | retorna se o view derivado não está vazio. Fornecido se `[ranges::empty](<#/doc/ranges/empty>)` for aplicável a ele.
(função membro pública de `std::ranges::view_interface<D>`)
[ front](<#/doc/ranges/view_interface/front>) | retorna o primeiro elemento no view derivado. Fornecido se satisfizer [`forward_range`](<#/doc/ranges/forward_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ back](<#/doc/ranges/view_interface/back>) | retorna o último elemento no view derivado. Fornecido se satisfizer [`bidirectional_range`](<#/doc/ranges/bidirectional_range>) e [`common_range`](<#/doc/ranges/common_range>).
(função membro pública de `std::ranges::view_interface<D>`)
[ operator[]](<#/doc/ranges/view_interface/operator_at>) | retorna o `n`-ésimo elemento no view derivado. Fornecido se satisfizer [`random_access_range`](<#/doc/ranges/random_access_range>).
(função membro pública de `std::ranges::view_interface<D>`)

### [Guias de Dedução](<#/doc/ranges/iota_view/deduction_guides>)

### Classes aninhadas

[_iterator_](<#/doc/ranges/iota_view/iterator>) | o tipo do iterator
(classe membro apenas para exposição*)
[_sentinel_](<#/doc/ranges/iota_view/sentinel>) | o tipo do sentinela usado quando o `iota_view` é limitado e `Bound` e `W` não são do mesmo tipo
(classe membro apenas para exposição*)

### Templates auxiliares

```cpp
template< std::weakly_incrementable W, std::semiregular Bound >
constexpr bool ranges::enable_borrowed_range<ranges::iota_view<W, Bound>> = true;  // (desde C++20)
```

Esta especialização de `[ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)` faz com que `iota_view` satisfaça [`borrowed_range`](<#/doc/ranges/borrowed_range>).

### Exemplo

Run this code
```cpp
    #include <algorithm>
    #include <iostream>
    #include <ranges>
    
    struct Bound
    {
        int bound;
        bool operator==(int x) const { return x == bound; }
    };
    
    int main()
    {
        for (int i : std::ranges::iota_view{1, 10})
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (int i : std::views::iota(1, 10))
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (int i : std::views::iota(1, Bound{10}))
            std::cout << i << ' ';
        std::cout << '\n';
    
        for (int i : std::views::iota(1) | std::views::take(9))
            std::cout << i << ' ';
        std::cout << '\n';
    
        std::ranges::for_each(std::views::iota(1, 10),
                              { std::cout << i << ' '; });
        std::cout << '\n';
    }
```

Output:
```
    1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
    1 2 3 4 5 6 7 8 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 4096](<https://cplusplus.github.io/LWG/issue4096>) | C++20 | `views::iota` poderia copiar um `iota_view` como está | proibido
[P2325R3](<https://wg21.link/P2325R3>) | C++20 | `iota_view` exigia que `W` fosse [`semiregular`](<#/doc/concepts/semiregular>) já que [`view`](<#/doc/ranges/view>) exigia [`default_initializable`](<#/doc/concepts/default_initializable>) | apenas exige que `W` seja [`copyable`](<#/doc/concepts/copyable>)

### Ver também

[ iota](<#/doc/algorithm/iota>)(C++11) | preenche um range com incrementos sucessivos do valor inicial
(template de função)
[ ranges::iota](<#/doc/algorithm/ranges/iota>)(C++23) | preenche um range com incrementos sucessivos do valor inicial
(objeto de função de algoritmo)
[ ranges::repeat_viewviews::repeat](<#/doc/ranges/repeat_view>)(C++23) | um [`view`](<#/doc/ranges/view>) consistindo de uma sequência gerada pela produção repetida do mesmo valor
(template de classe) (objeto de ponto de personalização)