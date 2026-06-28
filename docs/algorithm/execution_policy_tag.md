# std::execution::seq, std::execution::par, std::execution::par_unseq, std::execution::unseq

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
inline constexpr
std::execution::sequenced_policy seq { /* unspecified */ };
inline constexpr
std::execution::parallel_policy par { /* unspecified */ };
inline constexpr
std::execution::parallel_unsequenced_policy par_unseq { /* unspecified */ };
inline constexpr
std::execution::unsequenced_policy unseq { /* unspecified */ };
```

Os tipos de policy de execução

* [std::execution::sequenced_policy](<#/doc/algorithm/execution_policy_tag_t>),
* [std::execution::parallel_policy](<#/doc/algorithm/execution_policy_tag_t>),
* [std::execution::parallel_unsequenced_policy](<#/doc/algorithm/execution_policy_tag_t>), e
* [std::execution::unsequenced_policy](<#/doc/algorithm/execution_policy_tag_t>)

possuem as seguintes instâncias respectivas:

* `std::execution::seq`,
* `std::execution::par`,
* `std::execution::par_unseq`, e
* `std::execution::unseq`.

Essas instâncias são usadas para especificar a policy de execução de algoritmos paralelos, isto é, os tipos de paralelismo permitidos.

Policies de execução adicionais podem ser fornecidas por uma implementação da standard library (possíveis adições futuras podem incluir `std::parallel::cuda` e `std::parallel::opencl`).

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <chrono>
    #include <cstdint>
    #include <iostream>
    #include <random>
    #include <vector>
     
    #ifdef PARALLEL
    #include <execution>
        namespace execution = std::execution;
    #else
        enum class execution { seq, unseq, par_unseq, par };
    #endif
     
    void measure([[maybe_unused]] auto policy, std::vector<std::uint64_t> v)
    {
        const auto start = std::chrono::steady_clock::now();
    #ifdef PARALLEL
        std::sort(policy, v.begin(), v.end());
    #else
        std::sort(v.begin(), v.end());
    #endif
        const auto finish = std::chrono::steady_clock::now();
        std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(finish - start)
                  << '\n';
    };
     
    int main()
    {
        std::vector<std::uint64_t> v(1'000'000);
        std::mt19937 gen {std::random_device{}()};
        std::ranges::generate(v, gen);
     
        measure(execution::seq, v);
        measure(execution::unseq, v);
        measure(execution::par_unseq, v);
        measure(execution::par, v);
    }
```

Saída possível:
```
    // online GNU/gcc compiler (PARALLEL macro is not defined)
    81ms
    80ms
    79ms
    78ms
     
    // with g++ -std=c++23 -O3 ./test.cpp -ltbb -DPARALLEL
    165ms
    163ms
    30ms
    27ms
```

### Veja também

[ sequenced_policyparallel_policyparallel_unsequenced_policyunsequenced_policy](<#/doc/algorithm/execution_policy_tag_t>)(C++17)(C++17)(C++17)(C++20) | tipos de policy de execução
(class)