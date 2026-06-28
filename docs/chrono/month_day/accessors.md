# std::chrono::month_day::month, std::chrono::month_day::day

```cpp
constexpr std::chrono::month month() const noexcept;  // (1) (desde C++20)
constexpr std::chrono::day day() const noexcept;  // (1) (desde C++20)
```

Recupera os valores de mês e dia armazenados neste objeto `month_day`.

### Valor de retorno

1) Retorna o valor `std::chrono::month` armazenado.

2) Retorna o valor `std::chrono::day` armazenado.

### Exemplo

Execute este código
```
    #include <chrono>
     
    int main()
    {
        constexpr auto md{std::chrono::July/15};
        static_assert(md.month() == std::chrono::month(7));
        static_assert(md.day() == std::chrono::day(15));
    }
```