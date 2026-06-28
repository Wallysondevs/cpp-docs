# std::chrono::month_weekday::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se os objetos [`month`](<#/doc/chrono/month>) e [`weekday_indexed`](<#/doc/chrono/weekday_indexed>) contidos são válidos.

### Valor de retorno

month().ok() && weekday_indexed().ok()

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        auto mwdi{std::chrono::March/std::chrono::Friday[1]};
        assert(mwdi.ok());
     
        mwdi = {std::chrono::month(17)/std::chrono::Friday[1]}; 
        assert(not mwdi.ok());
     
        mwdi = {std::chrono::March/std::chrono::Friday[-4]}; 
        assert(not mwdi.ok());
    }
```