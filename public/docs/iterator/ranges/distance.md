# std::ranges::distance

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
Assinatura da chamada
template< class I, std::sentinel_for<I> S >
requires (!std::sized_sentinel_for<S, I>)
constexpr std::iter_difference_t<I>
distance( I first, S last );
template< class I, std::sized_sentinel_for<std::decay_t<I>> S >
constexpr std::iter_difference_t<std::decay_t<I>>
distance( I&& first, S last );
template< ranges::range R >
constexpr ranges::range_difference_t<R>
distance( R&& r );
```

1,2) Retorna o número de "saltos" de first até last.

3) Retorna o tamanho de r como um inteiro com sinal.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first** — iterator apontando para o primeiro elemento
- **last** — sentinel denotando o fim do range para o qual first é um iterator
- **r** — range para calcular a distância

### Valor de retorno

1) O número de incrementos necessários para ir de first até last.

2) last - static_cast<const [std::decay_t](<#/doc/types/decay>)&lt;I&gt;&>(first).

3) Se `R` modela [ranges::sized_range](<#/doc/ranges/sized_range>), retorna [ranges::size](<#/doc/ranges/size>)(r); caso contrário, ranges::distance([ranges::begin](<#/doc/ranges/begin>)(r), [ranges::end](<#/doc/ranges/end>)(r)).

### Complexidade

1) Linear.

2) Constante.

3) Se `R` modela [ranges::sized_range](<#/doc/ranges/sized_range>) ou se [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)<[ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;R&gt;, [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;R&gt;> é modelado, a complexidade é constante; caso contrário, linear.

### Possível implementação
```cpp
    struct distance_fn
    {
        template<class I, std::sentinel_for<I> S>
            requires (!std::sized_sentinel_for<S, I>)
        constexpr std::iter_difference_t<I> operator()(I first, S last) const
        {
            std::iter_difference_t<I> result = 0;
            while (first != last)
            {
                ++first;
                ++result;
            }
            return result;
        }
    
        template<class I, std::sized_sentinel_for<std::decay<I>> S>
        constexpr std::iter_difference_t<I> operator()(const I& first, S last) const
        {
            return last - first;
        }
    
        template<ranges::range R>
        constexpr ranges::range_difference_t<R> operator()(R&& r) const
        {
            if constexpr (ranges::sized_range<std::remove_cvref_t<R>>)
                return static_cast<ranges::range_difference_t<R>>(ranges::size(r));
            else
                return (*this)(ranges::begin(r), ranges::end(r));
        }
    };
    
    inline constexpr auto distance = distance_fn{};
```

---

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <forward_list>
    #include <iterator>
    #include <vector>
    
    int main() 
    {
        std::vector<int> v{3, 1, 4};
        assert(std::ranges::distance(v.begin(), v.end()) == 3);
        assert(std::ranges::distance(v.end(), v.begin()) == -3);
        assert(std::ranges::distance(v) == 3);
    
        std::forward_list<int> l{2, 7, 1};
        // auto size = std::ranges::size(l); // erro: não é um range dimensionável
        auto size = std::ranges::distance(l); // OK, mas ciente da complexidade O(N)
        assert(size == 3);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3392](<https://cplusplus.github.io/LWG/issue3392>) | C++20 | sobrecarga (1) recebe iterator por valor, portanto lvalue de iterator move-only com um sentinel dimensionado era rejeitado | sobrecarga (2) adicionada
[LWG 3664](<https://cplusplus.github.io/LWG/issue3664>) | C++20 | a resolução do [problema LWG 3392](<https://cplusplus.github.io/LWG/issue3392>) fez com que ranges::distance rejeitasse argumentos de array | os aceita

### Veja também

[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterator por uma dada distância ou para um dado limite
(objeto de função de algoritmo)
[ ranges::countranges::count_if](<#/doc/algorithm/ranges/count>)(C++20)(C++20) | retorna o número de elementos que satisfazem critérios específicos
(objeto de função de algoritmo)
[ distance](<#/doc/iterator/distance>) | retorna a distância entre dois iterators
(modelo de função)