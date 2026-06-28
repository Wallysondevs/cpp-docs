# std::ranges::shuffle

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S, class Gen >
requires std::permutable<I> &&
std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
I shuffle( I first, S last, Gen&& gen );
template< ranges::random_access_range R, class Gen >
requires std::permutable<ranges::iterator_t<R>> &&
std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
ranges::borrowed_iterator_t<R>
shuffle( R&& r, Gen&& gen );
```

1) Reordena os elementos no dado range `[`first`, `last`)` de forma que cada permutação possível desses elementos tenha igual probabilidade de aparição.

2) O mesmo que (1), mas usa r como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a serem embaralhados aleatoriamente
- **r** — o range de elementos a serem embaralhados aleatoriamente
- **gen** — o gerador de números aleatórios

### Valor de retorno

Um iterator igual a last.

### Complexidade

Exatamente (last - first) - 1 trocas.

### Implementação possível
```cpp
    struct shuffle_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S, class Gen>
        requires std::permutable<I> &&
                 std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
        I operator()(I first, S last, Gen&& gen) const
        {
            using diff_t = std::iter_difference_t<I>;
            using distr_t = std::uniform_int_distribution<diff_t>;
            using param_t = typename distr_t::param_type;
            distr_t D;
            const auto n {last - first};
            for (diff_t i {1}; i < n; ++i)
                ranges::iter_swap(first + i, first + D(gen, param_t(0, i)));
            return ranges::next(first, last);
        }
    
        template<ranges::random_access_range R, class Gen>
        requires std::permutable<ranges::iterator_t<R>> &&
                 std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
        ranges::borrowed_iterator_t<R> operator()(R&& r, Gen&& gen) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::forward<Gen>(gen));
        }
    };
    
    inline constexpr shuffle_fn shuffle {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <random>
    
    void print(const auto& a)
    {
        for (const auto e : a)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::array a {'A', 'B', 'C', 'D', 'E', 'F'};
        print(a);
    
        std::random_device rd;
        std::mt19937 gen {rd()};
    
        for (int i {}; i != 3; ++i)
        {
            std::ranges::shuffle(a, gen);
            print(a);
        }
    }
```

Saída possível:
```
    A B C D E F
    F E A C D B
    E C B F A D
    B A E C F D
```

### Veja também

[ ranges::next_permutation](<#/doc/algorithm/ranges/next_permutation>)(C++20) | gera a próxima permutação lexicográfica maior de um range de elementos
(objeto de função de algoritmo)
[ ranges::prev_permutation](<#/doc/algorithm/ranges/prev_permutation>)(C++20) | gera a próxima permutação lexicográfica menor de um range de elementos
(objeto de função de algoritmo)
[ random_shuffleshuffle](<#/doc/algorithm/random_shuffle>)(ate C++17)(C++11) | reordena aleatoriamente elementos em um range
(template de função)