# std::chrono::year_month::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se os valores de ano e mês armazenados neste objeto são válidos.

### Valor de retorno

year().ok() && month().ok()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    using namespace std::chrono_literals;
    
    int main()
    {
        constexpr std::chrono::year_month ym1{3030y, std::chrono::July};
        static_assert(ym1.ok());
    
        constexpr std::chrono::year_month ym2{std::chrono::year(2020)/16};
        static_assert(!ym2.ok());
    }
```