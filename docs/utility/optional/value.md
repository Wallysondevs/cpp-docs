# std::optional&lt;T&gt;::value

```cpp
constexpr T& value() &;
constexpr const T& value() const &;  // (1) (desde C++17)
constexpr T&& value() &&;
constexpr const T&& value() const &&;  // (2) (desde C++17)
```

  
Se *this contiver um valor, retorna uma referência para o valor contido.

Caso contrário, lança uma exceção [std::bad_optional_access](<#/doc/utility/optional/bad_optional_access>).

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o valor contido.

### Exceções

[std::bad_optional_access](<#/doc/utility/optional/bad_optional_access>) se *this não contiver um valor.

### Notas

O operador de desreferência [operator*()](<#/doc/utility/optional/operator_star_>) não verifica se este optional contém um valor, o que pode ser mais eficiente do que `value()`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <optional>
    
    int main()
    {
        std::optional<int> opt = {};
    
        try
        {
            [[maybe_unused]] int n = opt.value();
        }
        catch(const std::bad_optional_access& e)
        {
            std::cout << e.what() << '\n';
        }
    
        try
        {
            opt.value() = 42;
        }
        catch(const std::bad_optional_access& e)
        {
            std::cout << e.what() << '\n';
        }
    
        opt = 43;
        std::cout << *opt << '\n';
    
        opt.value() = 44;
        std::cout << opt.value() << '\n';
    }
```

Saída: 
```
    bad optional access
    bad optional access
    43
    44
```

### Veja também

[ value_or](<#/doc/utility/optional/value_or>) | retorna o valor contido se disponível, outro valor caso contrário   
(função membro pública)  
[ operator->operator*](<#/doc/utility/optional/operator_star_>) | acessa o valor contido   
(função membro pública)  
[ bad_optional_access](<#/doc/utility/optional/bad_optional_access>)(C++17) | exceção indicando acesso verificado a um optional que não contém um valor   
(classe)