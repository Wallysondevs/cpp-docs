# Atributo C++: likely, unlikely (desde C++20)

Permite que o compilador otimize para o caso em que caminhos de execução que incluem essa instrução são mais ou menos prováveis do que qualquer caminho de execução alternativo que não inclua tal instrução.

### Sintaxe

---
`[[likely]]` | (1) |
---|---|---
`[[unlikely]]` | (2) |
---

### Explicação

Esses atributos podem ser aplicados a rótulos e instruções (que não sejam instruções de declaração). Eles não podem ser aplicados simultaneamente ao mesmo rótulo ou instrução.

1) Aplica-se a uma instrução para permitir que o compilador otimize para o caso em que caminhos de execução que incluem essa instrução são mais prováveis do que qualquer caminho de execução alternativo que não inclua tal instrução.

2) Aplica-se a uma instrução para permitir que o compilador otimize para o caso em que caminhos de execução que incluem essa instrução são menos prováveis do que qualquer caminho de execução alternativo que não inclua tal instrução.

Um caminho de execução é considerado como incluindo um rótulo se e somente se contiver um salto para esse rótulo:
```cpp
    int f(int i)
    {
        switch (i)
        {
            case 1: [[fallthrough]];
            [[likely]] case 2: return 1;
        }
        return 2;
    }
```

`i == 2` é considerado mais provável do que qualquer outro valor de `i`, mas o `[[likely]]` não tem efeito no caso `i == 1`, mesmo que ele caia para o rótulo `case 2:`.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <random>
    
    namespace with_attributes
    {
        constexpr double pow(double x, long long n) noexcept
        {
            if (n > 0) [[likely]]
                return x * pow(x, n - 1);
            else [[unlikely]]
                return 1;
        }
        constexpr long long fact(long long n) noexcept
        {
            if (n > 1) [[likely]]
                return n * fact(n - 1);
            else [[unlikely]]
                return 1;
        }
        constexpr double cos(double x) noexcept
        {
            constexpr long long precision{16LL};
            double y{};
            for (auto n{0LL}; n < precision; n += 2LL) [[likely]]
                y += pow(x, n) / (n & 2LL ? -fact(n) : fact(n));
            return y;
        }
    } // namespace with_attributes
    
    namespace no_attributes
    {
        constexpr double pow(double x, long long n) noexcept
        {
            if (n > 0)
                return x * pow(x, n - 1);
            else
                return 1;
        }
        constexpr long long fact(long long n) noexcept
        {
            if (n > 1)
                return n * fact(n - 1);
            else
                return 1;
        }
        constexpr double cos(double x) noexcept
        {
            constexpr long long precision{16LL};
            double y{};
            for (auto n{0LL}; n < precision; n += 2LL)
                y += pow(x, n) / (n & 2LL ? -fact(n) : fact(n));
            return y;
        }
    } // namespace no_attributes
    
    double gen_random() noexcept
    {
        static std::random_device rd;
        static std::mt19937 gen(rd());
        static std::uniform_real_distribution<double> dis(-1.0, 1.0);
        return dis(gen);
    }
    
    volatile double sink{}; // ensures a side effect
    
    int main()
    {
        for (const auto x : {0.125, 0.25, 0.5, 1. / (1 << 26)})
            std::cout
                << std::setprecision(53)
                << "x = " << x << '\n'
                << std::cos(x) << '\n'
                << with_attributes::cos(x) << '\n'
                << (std::cos(x) == with_attributes::cos(x) ? "equal" : "differ") << '\n';
    
        auto benchmark = 
        {
            const auto start = std::chrono::high_resolution_clock::now();
            for (auto size{1ULL}; size != 10'000'000ULL; ++size)
                sink = fun(gen_random());
            const std::chrono::duration<double> diff =
                std::chrono::high_resolution_clock::now() - start;
            std::cout << "Time: " << std::fixed << std::setprecision(6) << diff.count()
                      << " sec " << rem << std::endl; 
        };
    
        benchmark(with_attributes::cos, "(with attributes)");
        benchmark(no_attributes::cos, "(without attributes)");
        benchmark( { return std::cos(t); }, "(std::cos)");
    }
```

Saída possível:
```
    x = 0.125
    0.99219766722932900560039115589461289346218109130859375
    0.99219766722932900560039115589461289346218109130859375
    equal
    x = 0.25
    0.96891242171064473343022882545483298599720001220703125
    0.96891242171064473343022882545483298599720001220703125
    equal
    x = 0.5
    0.8775825618903727587394314468838274478912353515625
    0.8775825618903727587394314468838274478912353515625
    equal
    x = 1.490116119384765625e-08
    0.99999999999999988897769753748434595763683319091796875
    0.99999999999999988897769753748434595763683319091796875
    equal
    Time: 0.579122 sec (with attributes)
    Time: 0.722553 sec (without attributes)
    Time: 0.425963 sec (std::cos)
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 9.12.7 Atributos de probabilidade [dcl.attr.likelihood]

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 9.12.6 Atributos de probabilidade [dcl.attr.likelihood]
