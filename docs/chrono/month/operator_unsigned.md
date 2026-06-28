# std::chrono::month::operator unsigned

```cpp
constexpr explicit operator unsigned() const noexcept;  // (desde C++20)
```

Retorna o valor do mês armazenado em *this.

### Valor de retorno

O valor do mês armazenado em *this.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::month m{6};
        constexpr unsigned p = static_cast<unsigned>(m);
        constexpr unsigned q = static_cast<unsigned>(std::chrono::September);
        std::cout << "The month is: " << p << '\n'
                  << "September is: " << q << '\n'; 
    }
```

Saída:
```
    The month is: 6
    September is: 9
```