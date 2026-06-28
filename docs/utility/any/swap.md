# std::any::swap

```cpp
void swap( any& other ) noexcept;  // (desde C++17)
```

  
Troca o conteúdo de dois objetos `any`.

### Parâmetros

other  |  \-  |  objeto para trocar com   
  
### Exemplo

Execute este código
```
    #include <any>
    #include <print>
    #include <string>
    #include <string_view>
     
    int main()
    {
        std::any a = std::string{"King"};
        std::any b = std::string_view{"Queen"};
        std::println("a = {}", std::any_cast<std::string&>(a));
        std::println("b = {}", std::any_cast<std::string_view&>(b));
        std::println("swap(a, b)");
        a.swap(b);
        std::println("a = {}", std::any_cast<std::string_view&>(a));
        std::println("b = {}", std::any_cast<std::string&>(b));
    }
```

Saída: 
```
    a = King
    b = Queen
    swap(a, b)
    a = Queen
    b = King
```