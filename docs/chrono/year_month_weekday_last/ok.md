# std::chrono::year_month_weekday_last::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

  
Verifica se este objeto representa uma data válida. Como um `year_month_weekday_last` representa o último dia da semana de um mês específico, ele é válido desde que o ano, o mês e o dia da semana sejam válidos. 

### Valor de retorno

year().ok() && month().ok() && weekday().ok()

### Exemplo

Run this code
```
    #include <cassert>
    #include <chrono>
    using namespace std::chrono;
     
    int main()
    {
        auto ymwdl{Tuesday[last]/11/2020};
        assert(ymwdl.ok());
        ymwdl = Tuesday[last]/-2/2021;
        assert(!ymwdl.ok());
        ymwdl += months(0); // Normalize month
        assert(ymwdl.ok());
    }
```