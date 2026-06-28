# std::chrono::month::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

  
Verifica se o valor do mês armazenado em *this está no intervalo válido, ou seja, `[`1`, `12`]`. 

### Valor de retorno

true se o valor do mês armazenado em *this estiver no intervalo `[`1`, `12`]`. Caso contrário, false. 

### Exemplo

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        for (const unsigned mm : {6u, 0u, 16U})
        {
            std::cout << mm << ": ";
            const std::chrono::month m{mm};
            m.ok() ? std::cout << "month is valid\n"
                   : std::cout << "month is invalid\n";
        }
    }
```

Saída: 
```
    6: month is valid
    0: month is invalid
    16: month is invalid
```