# std::ranges::is_sorted_until

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less >
constexpr I
is_sorted_until( I first, S last, Comp comp = {}, Proj proj = {} );
template< std::forward_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
is_sorted_until( R&& r, Comp comp = {}, Proj proj = {} );
```

Examina o range `[`first`, `last`)` e encontra o maior range começando em first no qual os elementos estão ordenados em ordem não decrescente.

Uma sequência é ordenada em relação a um comparador comp se para qualquer iterator `it` apontando para a sequência e qualquer inteiro não negativo `n` tal que `it + n` é um iterator válido apontando para um elemento da sequência, [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(it + n)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *it)) avalia para falso.

1) Os elementos são comparados usando a função de comparação binária comp fornecida.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — iterator-sentinel que define o range para encontrar seu limite superior ordenado
- **r** — o range para encontrar seu limite superior ordenado
- **comp** — função de comparação para aplicar aos elementos projetados
- **proj** — projeção para aplicar aos elementos

### Valor de retorno

O limite superior do maior range começando em first no qual os elementos estão ordenados em ordem não decrescente. Ou seja, o último iterator `it` para o qual o range `[`first`, `it`)` está ordenado.

### Complexidade

Linear na distância entre first e last.

### Implementação possível
```cpp
    struct is_sorted_until_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less>
        constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            if (first == last)
                return first;
    
            for (auto next = first; ++next != last; first = next)
                if (std::invoke(comp, std::invoke(proj, *next), std::invoke(proj, *first)))
                    return next;
    
            return first;
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr is_sorted_until_fn is_sorted_until;
```

---

### Notas

`ranges::is_sorted_until` retorna um iterator igual a last para ranges vazios e ranges de comprimento um.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <random>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 g {rd()};
        std::array nums {3, 1, 4, 1, 5, 9};
    
        constexpr int min_sorted_size = 4;
        int sorted_size = 0;
        do
        {
            std::ranges::shuffle(nums, g);
            const auto sorted_end = std::ranges::is_sorted_until(nums);
            sorted_size = std::ranges::distance(nums.begin(), sorted_end);
    
            std::ranges::copy(nums, std::ostream_iterator<int>(std::cout, " "));
            std::cout << " : " << sorted_size << " leading sorted element(s)\n";
        }
        while (sorted_size < min_sorted_size);
    }
```

Saída possível:
```
    4 1 9 5 1 3  : 1 leading sorted element(s)
    4 5 9 3 1 1  : 3 leading sorted element(s)
    9 3 1 4 5 1  : 1 leading sorted element(s)
    1 3 5 4 1 9  : 3 leading sorted element(s)
    5 9 1 1 3 4  : 2 leading sorted element(s)
    4 9 1 5 1 3  : 2 leading sorted element(s)
    1 1 4 9 5 3  : 4 leading sorted element(s)
```

### Veja também

[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(objeto de função de algoritmo)
[ is_sorted_until](<#/doc/algorithm/is_sorted_until>)(C++11) | encontra o maior sub-range ordenado
(modelo de função)