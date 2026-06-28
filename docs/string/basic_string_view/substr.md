# std::basic_string_view&lt;CharT,Traits&gt;::substr

```cpp
constexpr basic_string_view substr( size_type pos = 0,
size_type count = npos ) const;  // (desde C++17)
```

  
Retorna uma view da substring `[`pos`, `pos + rlen`)`, onde `rlen` é o menor entre count e size() - pos. 

### Parâmetros

pos  |  \-  |  posição do primeiro caractere   
---|---|---
count  |  \-  |  comprimento solicitado   
  
### Valor de retorno

View da substring `[`pos`, `pos + rlen`)`. 

### Exceptions

[std::out_of_range](<#/doc/error/out_of_range>) se pos > size(). 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <cstddef>
    #include <iostream>
    #include <stdexcept>
    #include <string_view>
     
    int main()
    {
        typedef std::size_t count_t, pos_t;
     
        constexpr std::string_view data{"ABCDEF"};
     
        std::cout << data.substr() << '\n'; // ABCDEF, i.e. data[0, 5] that is [0, 6)
        std::cout << data.substr(pos_t(1)) << '\n'; // BCDEF, i.e. [1, 6)
        std::cout << data.substr(pos_t(2), count_t(3)) << '\n'; // CDE, i.e. [2, 2 + 3)
        std::cout << data.substr(pos_t(4), count_t(42)) << '\n'; // EF, i.e. [4, 6)
     
        try
        {
            [[maybe_unused]]
            auto sub = data.substr(pos_t(666), count_t(1)); // throws: pos > size()
        }
        catch (std::out_of_range const& ex)
        {
            std::cout << ex.what() << '\n';
        }
    }
```

Saída possível: 
```
    ABCDEF
    BCDEF
    CDE
    EF
    basic_string_view::substr: __pos (which is 666) > __size (which is 6)
```

### Veja também

[ copy](<#/doc/string/basic_string_view/copy>) | copia caracteres   
(função membro pública)  
[ find](<#/doc/string/basic_string_view/find>) | encontra caracteres na view   
(função membro pública)  
[ substr](<#/doc/string/basic_string/substr>) | retorna uma substring   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)