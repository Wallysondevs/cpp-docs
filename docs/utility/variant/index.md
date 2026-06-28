# std::variant&lt;Types...&gt;::index

```cpp
constexpr std::size_t index() const noexcept;  // (desde C++17)
```

  
Retorna o índice baseado em zero da alternativa que está atualmente contida no variant. 

Se o variant estiver em estado [`valueless_by_exception`](<#/doc/utility/variant/valueless_by_exception>), retorna [`variant_npos`](<#/doc/utility/variant/variant_npos>). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <variant>
     
    int main()
    {
        std::variant<int, std::string> v = "abc";
        std::cout << "v.index = " << v.index() << '\n';
        v = {};
        std::cout << "v.index = " << v.index() << '\n';
    }
```

Saída: 
```
    v.index = 1
    v.index = 0
```

### Veja também

[ holds_alternative](<#/doc/utility/variant/holds_alternative>)(C++17) |  verifica se um `variant` atualmente contém um determinado tipo   
(modelo de função)  
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) |  lê o valor do variant dado o índice ou o tipo (se o tipo for único), lança uma exceção em caso de erro   
(modelo de função)