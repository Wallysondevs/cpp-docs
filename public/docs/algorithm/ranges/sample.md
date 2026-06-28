# std::ranges::sample

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O, class Gen >
requires (std::forward_iterator<I>
std::indirectly_copyable<I, O> &&
std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
O sample( I first, S last, O out, std::iter_difference_t<I> n, Gen&& gen );
template< ranges::input_range R, std::weakly_incrementable O, class Gen >
requires (ranges::forward_range<R>
std::indirectly_copyable<ranges::iterator_t<R>, O> &&
std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
O sample( R&& r, O out, ranges::range_difference_t<R> n, Gen&& gen );
```

1) Seleciona M = min(n, last - first) elementos da sequência `[`first`, `last`)` (sem reposição) de forma que cada _amostra_ possível tenha igual probabilidade de aparecer, e escreve esses elementos selecionados no range começando em out.

O algoritmo é _estável_ (preserva a ordem relativa dos elementos selecionados) somente se `I` modela [std::forward_iterator](<#/doc/iterator/forward_iterator>).

O comportamento é indefinido se out estiver em `[`first`, `last`)`.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first1, last1 | \- | o range do qual fazer a amostragem (_a população_)
---|---|---
r | \- | o range do qual fazer a amostragem (_a população_)
out | \- | o iterator de saída onde as amostras são escritas
n | \- | número de amostras a serem coletadas
gen | \- | o gerador de números aleatórios usado como fonte de aleatoriedade

### Valor de retorno

Um iterator igual a out + M, que é o fim do range de amostra resultante.

### Complexidade

_Linear_ : 𝓞(last - first).

### Notas

Esta função pode implementar _amostragem por seleção_ ou [amostragem por reservatório](<https://en.wikipedia.org/wiki/reservoir_sampling> "enwiki:reservoir sampling").

### Possível implementação
```cpp
    struct sample_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 std::weakly_incrementable O, class Gen>
        requires (std::forward_iterator<I> or
                  std::random_access_iterator<O>) &&
                  std::indirectly_copyable<I, O> &&
                  std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
        O operator()(I first, S last, O out, std::iter_difference_t<I> n, Gen&& gen) const
        {
            using diff_t = std::iter_difference_t<I>;
            using distrib_t = std::uniform_int_distribution<diff_t>;
            using param_t = typename distrib_t::param_type;
            distrib_t D{};
    
            if constexpr (std::forward_iterator<I>)
            {
                // this branch preserves "stability" of the sample elements
                auto rest{ranges::distance(first, last)};
                for (n = ranges::min(n, rest); n != 0; ++first)
                    if (D(gen, param_t(0, --rest)) < n)
                    {
                        *out++ = *first;
                        --n;
                    }
                return out;
            }
            else
            {
                // O is a random_access_iterator
                diff_t sample_size{};
                // copy [first, first + M) elements to "random access" output
                for (; first != last && sample_size != n; ++first)
                    out[sample_size++] = *first;
                // overwrite some of the copied elements with randomly selected ones
                for (auto pop_size{sample_size}; first != last; ++first, ++pop_size)
                {
                    const auto i{D(gen, param_t{0, pop_size})};
                    if (i < n)
                        out[i] = *first;
                }
                return out + sample_size;
            }
        }
    
        template<ranges::input_range R, std::weakly_incrementable O, class Gen>
        requires (ranges::forward_range<R> or std::random_access_iterator<O>) &&
                  std::indirectly_copyable<ranges::iterator_t<R>, O> &&
                  std::uniform_random_bit_generator<std::remove_reference_t<Gen>>
        O operator()(R&& r, O out, ranges::range_difference_t<R> n, Gen&& gen) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(out), n,
                           std::forward<Gen>(gen));
        }
    };
    
    inline constexpr sample_fn sample {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <vector>
    
    void print(auto const& rem, auto const& v)
    {
        std::cout << rem << " = " << [std::size(v) << "] { ";
        for (auto const& e : v)
            std::cout << e << ' ';
        std::cout << "}\n";
    }
    
    int main()
    {
        const auto in = {1, 2, 3, 4, 5, 6};
        print("in", in);
    
        std::vector<int> out;
        const int max = in.size() + 2;
        auto gen = std::mt19937{std::random_device{}()};
    
        for (int n{}; n != max; ++n)
        {
            out.clear();
            std::ranges::sample(in, std::back_inserter(out), n, gen);
            std::cout << "n = " << n;
            print(", out", out);
        }
    }
```

Saída possível:
```
    in = [6] { 1 2 3 4 5 6 }
    n = 0, out = [0] { }
    n = 1, out = [1] { 5 }
    n = 2, out = [2] { 4 5 }
    n = 3, out = [3] { 2 3 5 }
    n = 4, out = [4] { 2 4 5 6 }
    n = 5, out = [5] { 1 2 3 5 6 }
    n = 6, out = [6] { 1 2 3 4 5 6 }
    n = 7, out = [6] { 1 2 3 4 5 6 }
```

### Veja também

[ ranges::shuffle](<#/doc/algorithm/ranges/shuffle>)(C++20) | reordena aleatoriamente elementos em um range
(objeto função de algoritmo)
[ sample](<#/doc/algorithm/sample>)(C++17) | seleciona N elementos aleatórios de uma sequência
(modelo de função)