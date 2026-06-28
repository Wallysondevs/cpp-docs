# std::chrono::year_month_day_last::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se *this representa uma data válida. Como um `year_month_day_last` representa o último dia de um mês específico, ele representa uma data válida desde que o ano e o mês sejam válidos.

### Valor de retorno

year().ok() && month().ok()

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        auto ymdl{std::chrono::last/11/2020};
        assert(ymdl.ok());
        ymdl = std::chrono::year(2020)/std::chrono::month(13)/std::chrono::last;
        assert(not ymdl.ok());
    }
```