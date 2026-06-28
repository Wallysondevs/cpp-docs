# std::experimental::parallel::seq, std::experimental::parallel::par, std::experimental::parallel::par_vec

Definido no cabeçalho `[<experimental/execution_policy>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/execution_policy&action=edit&redlink=1> "cpp/header/experimental/execution policy \(page does not exist\)")`

```c
constexpr sequential_execution_policy seq{};
constexpr parallel_execution_policy par{};
constexpr parallel_vector_execution_policy par_vec{};
```

`seq`, `par` e `par_vec` são instâncias dos tipos de política de execução `sequential_execution_policy`, `parallel_execution_policy` e `parallel_vector_execution_policy` respectivamente. Eles são usados para especificar a política de execução de algoritmos paralelos - isto é, os tipos de paralelismo permitidos.