# std::optional&lt;T&gt;::operator bool, std::optional&lt;T&gt;::has_value

```cpp
constexpr explicit operator bool() const noexcept;  // (desde C++17)
constexpr bool has_value() const noexcept;  // (desde C++17)
```

  
Verifica se *this contém um valor. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se *this contém um valor, false se *this não contém um valor. 

### Exemplo

Execute este código
```
    #include <optional>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::optional<int> opt;
        std::cout << opt.has_value() << '\n';
     
        opt = 43;
        if (opt)
            std::cout << "value set to " << opt.value() << '\n';
        else
            std::cout << "value not set\n";
     
        opt.reset();
        if (opt.has_value())
            std::cout << "value still set to " << opt.value() << '\n';
        else
            std::cout << "value no longer set\n";
    }
```

Saída: 
```
    false
    value set to 43
    value no longer set
```