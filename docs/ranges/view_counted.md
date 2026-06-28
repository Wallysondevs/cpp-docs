# std::ranges::views::counted

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
inline constexpr /*unspecified*/ counted = /*unspecified*/;
Assinatura da chamada
template< class Iterator, class DifferenceType >
requires /* see below */
constexpr /*span-or-subrange*/ counted( Iterator&& it, DifferenceType&& count );
```

Uma counted view apresenta uma [`view`](<#/doc/ranges/view>) dos elementos do _range contado_ `[`i`, `n`)` para algum iterator `i` e um inteiro não negativo `n`.

Um range contado `[`i`, `n`)` são os `n` elementos começando com o elemento apontado por `i` e até, mas não incluindo, o elemento, se houver, apontado pelo resultado de `n` aplicações de ++i.

Se n == 0, o range contado é válido e vazio. Caso contrário, o range contado é válido apenas se `n` for positivo, `i` for desreferenciável, e `[`++i`, `\--n`)` for um range contado válido.

Formalmente, se it e count são expressões, `T` é [std::decay_t](<#/doc/types/decay>)<decltype((it))>, e `D` é [std::iter_difference_t](<#/doc/iterator/iter_t>)&lt;T&gt;, então

*   se `T` modela [`input_or_output_iterator`](<#/doc/iterator/input_or_output_iterator>) e decltype((count)) modela [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;D&gt;,
    *   se `T` modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), então [views::counted](<#/doc/ranges/counted_view>)(it, count) é [expression-equivalent](<#/doc/language/expressions>) a [std::span](<#/doc/container/span>)([std::to_address](<#/doc/memory/to_address>)(it), static_cast<[std::size_t](<#/doc/types/size_t>)>(static_cast<D>(count))),
    *   caso contrário, se `T` modela [`random_access_iterator`](<#/doc/iterator/random_access_iterator>), então [views::counted](<#/doc/ranges/counted_view>)(it, count) é [expression-equivalent](<#/doc/language/expressions>) a [ranges::subrange](<#/doc/ranges/subrange>)(it, it + static_cast<D>(count)),
    *   caso contrário, [views::counted](<#/doc/ranges/counted_view>)(it, count) é [expression-equivalent](<#/doc/language/expressions>) a [ranges::subrange](<#/doc/ranges/subrange>)([std::counted_iterator](<#/doc/iterator/counted_iterator>)(it, count), [std::default_sentinel](<#/doc/iterator/default_sentinel>)).

*   Caso contrário, [views::counted](<#/doc/ranges/counted_view>)(it, count) é malformado.

### Objetos de ponto de customização

O nome `views::counted` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-unqualified de seu tipo é denotada como `___counted_fn_`.

Todas as instâncias de `___counted_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___counted_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualified ou não (no entanto, uma instância volatile-qualified não é obrigada a ser invocável). Assim, `views::counted` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `views::counted` acima, `___counted_fn_` modela

*   [std::invocable](<#/doc/concepts/invocable>)<__counted_fn, Args...>,
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __counted_fn, Args...&gt;,
*   [std::invocable](<#/doc/concepts/invocable>)<__counted_fn&, Args...>, e
*   [std::invocable](<#/doc/concepts/invocable>)&lt;const __counted_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___counted_fn_` participa da resolução de sobrecarga.

### Notas

[`views::counted`](<#/doc/ranges/counted_view>) não verifica se o range é longo o suficiente para fornecer todos os elementos `count`: use [views::take](<#/doc/ranges/take_view>) se essa verificação for necessária.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <ranges>
    
    int main()
    {
        const int a[]{1, 2, 3, 4, 5, 6, 7};
        for (int i : std::views::counted(a, 3))
            std::cout << i << ' ';
        std::cout << '\n';
    
        const auto il = {1, 2, 3, 4, 5};
        for (int i : std::views::counted(il.begin() + 1, 3))
            std::cout << i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3
    2 3 4
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[P2393R1](<https://wg21.link/P2393R1>) | C++20 | conversão implícita de um tipo de classe inteira para [std::size_t](<#/doc/types/size_t>) pode ser inválida | tornada explícita

### Veja também

[ ranges::take_viewviews::take](<#/doc/ranges/take_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) consistindo nos primeiros N elementos de outra [`view`](<#/doc/ranges/view>)
(modelo de classe) (objeto adaptador de range)
[ ranges::subrange](<#/doc/ranges/subrange>)(C++20) | combina um par iterator-sentinel em uma [`view`](<#/doc/ranges/view>)
(modelo de classe)
[ counted_iterator](<#/doc/iterator/counted_iterator>)(C++20) | adaptador de iterator que rastreia a distância até o final do range
(modelo de classe)
[ ranges::countranges::count_if](<#/doc/algorithm/ranges/count>)(C++20)(C++20) | retorna o número de elementos que satisfazem critérios específicos
(objeto de função de algoritmo)