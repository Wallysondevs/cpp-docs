# std::chrono::weekday_indexed::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se o objeto weekday e o índice armazenado em *this são ambos válidos.

### Valor de retorno

true se weekday().ok() == true e index() estiver no intervalo `[`1`, `5`]`. Caso contrário, false.

### Exemplo

Executar este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::chrono::weekday_indexed wdi{std::chrono::Tuesday[2]};
        std::cout << (wdi.ok()) << ' ';
        wdi = {std::chrono::weekday(42)[2]};
        std::cout << (wdi.ok()) << ' ';
        wdi = {std::chrono::Tuesday[-4]};
        std::cout << (wdi.ok()) << '\n';
    }
```

Saída:
```
    true false false
```