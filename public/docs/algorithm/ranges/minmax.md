# std::ranges::minmax, std::ranges::minmax_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< class T, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<const T*, Proj>> Comp = ranges::less >
constexpr ranges::minmax_result<const T&>
minmax( const T& a, const T& b, Comp comp = {}, Proj proj = {} );
template< std::copyable T, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<const T*, Proj>> Comp = ranges::less >
constexpr ranges::minmax_result<T>
minmax( std::initializer_list<T> r, Comp comp = {}, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
requires std::indirectly_copyable_storable<ranges::iterator_t<R>, ranges::range_value_t<R>*>
constexpr ranges::minmax_result<ranges::range_value_t<R>>
minmax( R&& r, Comp comp = {}, Proj proj = {} );
Tipos auxiliares
template< class T >
using minmax_result = ranges::min_max_result<T>;
```

Retorna o menor e o maior dos valores projetados fornecidos.

1) Retorna referências para o menor e o maior entre a e b.

2) Retorna o menor e o maior dos valores na initializer list r.

3) Retorna o menor e o maior dos valores no range r.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **a, b** — os valores a comparar
- **r** — um range não vazio de valores a comparar
- **comp** — comparação a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

1) {b, a} se, de acordo com seus respectivos valores projetados, b for menor que a; caso contrário, retorna {a, b}.

2,3) {s, l}, onde `s` e `l` são, respectivamente, os menores e maiores valores em r, de acordo com seus valores projetados. Se vários valores forem equivalentes ao menor e ao maior, retorna o valor menor mais à esquerda e o valor maior mais à direita. Se o range estiver vazio (conforme determinado por [ranges::distance](<#/doc/iterator/ranges/distance>)(r)), o comportamento é indefinido.

### Complexidade

1) Exatamente uma comparação e duas aplicações da projeção.

2,3) No máximo 3 / 2 * [ranges::distance](<#/doc/iterator/ranges/distance>)(r) comparações e o dobro de aplicações da projeção.

### Possível implementação
```cpp
    struct minmax_fn
    {
        template<class T, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<const T*, Proj>> Comp = ranges::less>
        constexpr ranges::minmax_result<const T&>
             operator()(const T& a, const T& b, Comp comp = {}, Proj proj = {}) const
        {
            if (std::invoke(comp, std::invoke(proj, b), std::invoke(proj, a)))
                return {b, a};
    
            return {a, b};
        }
    
        template<std::copyable T, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<const T*, Proj>> Comp = ranges::less>
        constexpr ranges::minmax_result<T>
            operator()(std::initializer_list<T> r, Comp comp = {}, Proj proj = {}) const
        {
            auto result = ranges::minmax_element(r, std::ref(comp), std::ref(proj));
            return {*result.min, *result.max};
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        requires std::indirectly_copyable_storable<ranges::iterator_t<R>,
                                                   ranges::range_value_t<R>*>
        constexpr ranges::minmax_result<ranges::range_value_t<R>>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            auto result = ranges::minmax_element(r, std::ref(comp), std::ref(proj));
            return {std::move(*result.min), std::move(*result.max)};
        }
    };
    
    inline constexpr minmax_fn minmax;
```

---

### Notas

Para a sobrecarga (1), se um dos parâmetros for um temporário, a referência retornada se torna uma referência pendente (dangling reference) ao final da expressão completa que contém a chamada para `minmax`:
```cpp
    int n = 1;
    auto p = std::ranges::minmax(n, n + 1);
    int m = p.min; // ok
    int x = p.max; // undefined behavior
    
    // Note that structured bindings have the same issue
    auto [mm, xx] = std::ranges::minmax(n, n + 1);
    xx; // undefined behavior
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <random>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        constexpr std::array v{3, 1, 4, 1, 5, 9, 2, 6, 5};
    
        std::random_device rd;
        std::mt19937_64 generator(rd());
        std::uniform_int_distribution<> distribution(0, ranges::distance(v)); // [0..9]
    
        // auto bounds = ranges::minmax(distribution(generator), distribution(generator));
        // UB: dangling references: bounds.min and bounds.max have the type `const int&`.
    
        const int x1 = distribution(generator);
        const int x2 = distribution(generator);
        auto bounds = ranges::minmax(x1, x2); // OK: got references to lvalues x1 and x2
    
        std::cout << "v[" << bounds.min << ":" << bounds.max << "]: ";
        for (int i = bounds.min; i < bounds.max; ++i)
            std::cout << v[i] << ' ';
        std::cout << '\n';
    
        auto [min, max] = ranges::minmax(v);
        std::cout << "smallest: " << min << ", " << "largest: " << max << '\n';
    }
```

Saída possível:
```
    v[3:9]: 1 5 9 2 6 5 
    smallest: 1, largest: 9
```

### Veja também

[ ranges::min](<#/doc/algorithm/ranges/min>)(C++20) | retorna o menor dos valores fornecidos
(objeto de função de algoritmo)
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores fornecidos
(objeto de função de algoritmo)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e maiores elementos em um range
(objeto de função de algoritmo)
[ ranges::clamp](<#/doc/algorithm/ranges/clamp>)(C++20) | limita um valor entre um par de valores de limite
(objeto de função de algoritmo)
[ minmax](<#/doc/algorithm/minmax>)(C++11) | retorna o menor e o maior de dois elementos
(modelo de função)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão