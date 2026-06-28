# std::chrono::month_weekday_last::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se os objetos [`month`](<#/doc/chrono/month>) e [`weekday_last`](<#/doc/chrono/weekday_last>) contidos são válidos.

### Valor de retorno

month().ok() && weekday_last().ok()

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        auto mwdl{std::chrono::March/std::chrono::Wednesday[std::chrono::last]};
        std::cout << (mwdl.ok()) << ' ';
        mwdl = {std::chrono::month(3)/std::chrono::weekday(42)[std::chrono::last]};
        std::cout << (mwdl.ok()) << '\n';
    }
```

Saída:
```
    true false
```