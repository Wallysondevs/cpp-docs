# std::ranges::take_view&lt;V&gt;::take_view

```cpp
take_view() requires std::default_initializable<V> = default;  // (1) (desde C++20)
constexpr explicit take_view( V base, ranges::range_difference_t<V> count );  // (2) (desde C++20)
```

Constrói um `take_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente [`_base__`](<#/doc/ranges/take_view>) e inicializa o [`_count__`](<#/doc/ranges/take_view>) para ​0​. Após a construção, [`base()`](<#/doc/ranges/take_view/base>) retorna uma cópia de V() e [`size()`](<#/doc/ranges/take_view/size>) retorna ​0​.

2) Inicializa a view subjacente `_base__` com std::move(base) e o `_count__` com count. Após a construção, [`base()`](<#/doc/ranges/take_view/base>) retorna uma cópia de base e [`size()`](<#/doc/ranges/take_view/size>) retorna o menor entre count e [ranges::size](<#/doc/ranges/size>)(base).

### Parâmetros

- **base** — a view subjacente
- **count** — número de elementos a serem pegos

### Exemplo

Imprime os primeiros n números primos que são gerados usando o método [Crivo de Eratóstenes](<https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes> "enwiki:Sieve of Eratosthenes").

Execute este código
```cpp
    #include <bit>
    #include <bitset>
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <ranges>
    
    constexpr unsigned clog2(auto x) // ≈ ⌈ log₂(x) ⌉
    {
        return std::numeric_limits<decltype(x)>::digits - std::countl_zero(x);
    }
    
    template<unsigned Count>
    struct FirstPrimes
    {
        static constexpr int count = Count;
    
        constexpr bool operator()(int n) // is prime?
        {
            return n < 2 ? false :
                   n == 2 ? true :
                   n % 2 == 0 or bits_.test(n / 2) ? false : true;
        }
    private:
        consteval static auto init()
        {
            std::bitset<size_ / 2 + 1> bits;
            for (int n{3}; n < size_; n += 2)
                for (int i{n}, j{3}, k{}; (k = i * j) < size_; j += 2)
                    bits.set(k / 2);
            return bits;
        }
    
        // Keep only odd numbers; 0 means it is a prime
        constexpr static auto bits_ { init() };
    
        // a(n) <= n * (log(n) + log(log(n)))
        static constexpr int size_ = Count * (clog2(Count) + clog2(clog2(Count)));
    };
    
    int main()
    {
        constexpr FirstPrimes<42> primes;
    
        auto primes_view = std::ranges::take_view{ std::views::iota(1)
                                                 | std::views::filter(primes)
                                                 , primes.count };
    
        std::cout << "First " << primes.count << " prime numbers are:\n";
        for (int new_line{1}; const int prime : primes_view)
            std::cout << std::setw(3) << prime << (new_line++ % 7 ? ' ' : '\n');
    }
```

Saída:
```
    First 42 prime numbers are:
      2   3   5   7  11  13  17
     19  23  29  31  37  41  43
     47  53  59  61  67  71  73
     79  83  89  97 101 103 107
    109 113 127 131 137 139 149
    151 157 163 167 173 179 181
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3714](<https://cplusplus.github.io/LWG/issue3714>)
([P2711R1](<https://wg21.link/P2711R1>)) | C++20 | o construtor multiparâmetro não era explícito | tornado explícito