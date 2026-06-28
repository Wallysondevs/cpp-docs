# std::array&lt;T,N&gt;::rbegin, std::array&lt;T,N&gt;::crbegin

```cpp
reverse_iterator rbegin() noexcept;  // (1) (desde C++11)
(constexpr desde C++17)
const_reverse_iterator rbegin() const noexcept;  // (2) (desde C++11)
(constexpr desde C++17)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
(constexpr desde C++17)
```

  
Retorna um reverse iterator para o primeiro elemento do `array` invertido. Ele corresponde ao último elemento do `array` não invertido. Se o `array` estiver vazio, o iterator retornado é igual a [rend()](<#/doc/container/array/rend>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Observações

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/array/end>). Portanto, o iterator retornado é invalidado se e quando o end iterator for invalidado.

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    void print(const std::string_view s) { std::cout << s << ' '; }
    
    int main()
    {
        const std::array<std::string_view, 8> data
        {
            "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"
        };
        std::array<std::string, 8> arr;
    
        std::copy(data.cbegin(), data.cend(), arr.begin());
    
        print("Print 'arr' in direct order using [cbegin, cend):\t");
        std::for_each(arr.cbegin(), arr.cend(), print);
    
        print("\n\nPrint 'arr' in reverse order using [crbegin, crend):\t");
        std::for_each(arr.crbegin(), arr.crend(), print);
    }
```

Saída: 
```
    Print 'arr' in direct order using [cbegin, cend):        ▁ ▂ ▃ ▄ ▅ ▆ ▇ █
    
    Print 'arr' in reverse order using [crbegin, crend):     █ ▇ ▆ ▅ ▄ ▃ ▂ ▁
```

### Veja também

[ rendcrend](<#/doc/container/array/rend>) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um reverse iterator para o início de um container ou array   
(modelo de função)