# std::chrono::year_month_weekday::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se este objeto `year_month_weekday` representa uma data válida.

### Valor de retorno

`true` se este objeto `year_month_weekday` representa uma data válida, ou seja, `year().ok() && month().ok() && weekday_indexed().ok()` for `true` e houver pelo menos [`index()`](<#/doc/chrono/year_month_weekday/accessors>) [`weekday()`s](<#/doc/chrono/year_month_weekday/accessors>) no ano e mês especificados. Caso contrário, `false`.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
    
    int main()
    {
        auto ymwdi{std::chrono::Wednesday[1]/1/2021};
        assert(ymwdi.ok());
        ymwdi = std::chrono::year(2021)/std::chrono::month(1)/std::chrono::Wednesday[42];
        assert(!ymwdi.ok());
    }
```