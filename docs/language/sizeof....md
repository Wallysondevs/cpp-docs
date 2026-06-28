# operador sizeof... (desde C++11)

Consulta o número de elementos em um [pack](<#/doc/language/parameter_pack>).

### Sintaxe

---
`sizeof...(` pack `)`

Retorna uma constante do tipo [std::size_t](<#/doc/types/size_t>).

### Explicação

Retorna o número de elementos em um [pack](<#/doc/language/parameter_pack>).

### Palavras-chave

[`sizeof`](<#/doc/keyword/sizeof>)

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <type_traits>
    
    template<typename... Ts>
    constexpr auto make_array(Ts&&... ts)
    {
        using CT = std::common_type_t<Ts...>;
        return std::array<CT, sizeof...(Ts)>{std::forward<CT>(ts)...};
    }
    
    int main()
    {
        std::array<double, 4ul> arr = make_array(1, 2.71f, 3.14, '*');
        std::cout << "arr = { ";
        for (auto s{arr.size()}; double elem : arr)
            std::cout << elem << (--s ? ", " : " ");
        std::cout << "}\n";
    }
```

Saída:
```
    arr = { 1, 2.71, 3.14, 42 }
```

### Veja também

  * [`sizeof`](<#/doc/language/sizeof>)
