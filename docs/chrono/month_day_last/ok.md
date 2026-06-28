# std::chrono::month_day_last::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

  
Verifica se o objeto `month` armazenado em *this é válido.

### Valor de retorno

month().ok()

### Exemplo

Execute este código
```
    #include <cassert>
    #include <chrono>
     
    int main()
    {
        auto mdl{std::chrono::February/std::chrono::last};
        assert(mdl.ok());
        mdl = {std::chrono::month(42)/std::chrono::last};
        assert(!mdl.ok());
    }
```