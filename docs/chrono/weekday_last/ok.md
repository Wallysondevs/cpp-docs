# std::chrono::weekday_last::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se o objeto weekday armazenado em *this é válido.

### Valor de retorno

weekday().ok()

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        auto wdl{std::chrono::Tuesday[std::chrono::last]};
        std::cout << (wdl.ok()) << ' ';
     
        wdl = {std::chrono::weekday(42)[std::chrono::last]};
        std::cout << (wdl.ok()) << '\n';
    }
```

Saída:
```
    true false
```