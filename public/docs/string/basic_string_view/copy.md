# std::basic_string_view&lt;CharT,Traits&gt;::copy

```cpp
size_type copy( CharT* dest, size_type count, size_type pos = 0 ) const;  // (desde C++17)
(constexpr desde C++20)
```

  
Copia a substring `[`pos`, `pos + rcount`)` para o array de caracteres apontado por dest, onde `rcount` é o menor entre count e size() - pos. 

Equivalente a Traits::copy(dest, data() + pos, rcount). 

### Parâmetros

dest  |  \-  |  ponteiro para a string de caracteres de destino   
---|---|---
count  |  \-  |  comprimento da substring solicitada   
pos  |  \-  |  posição do primeiro caractere   
  
### Valor de retorno

Número de caracteres copiados. 

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se pos > size(). 

### Complexidade

Linear em `rcount`. 

### Exemplo

Run this code
```
    #include <array>
    #include <cstddef>
    #include <iostream>
    #include <stdexcept>
    #include <string_view>
     
    int main()
    {
        constexpr std::basic_string_view<char> source{"ABCDEF"};
        std::array<char, 8> dest;
        std::size_t count{}, pos{};
     
        dest.fill('\0');
        source.copy(dest.data(), count = 4); // pos = 0
        std::cout << dest.data() << '\n'; // ABCD
     
        dest.fill('\0');
        source.copy(dest.data(), count = 4, pos = 1);
        std::cout << dest.data() << '\n'; // BCDE
     
        dest.fill('\0');
        source.copy(dest.data(), count = 42, pos = 2); // ok, count -> 4
        std::cout << dest.data() << '\n'; // CDEF
     
        try
        {
            source.copy(dest.data(), count = 1, pos = 666); // throws: pos > size()
        }
        catch (std::out_of_range const& ex)
        {
            std::cout << ex.what() << '\n';
        }
    }
```

Saída: 
```
    ABCD
    BCDE
    CDEF
    basic_string_view::copy: __pos (which is 666) > __size (which is 6)
```

### Veja também

[ substr](<#/doc/string/basic_string_view/substr>) |  retorna uma substring   
(função membro pública)  
[ copy](<#/doc/string/basic_string/copy>) |  copia caracteres   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)  
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) |  copia um range de elementos para um novo local   
(modelo de função)  
[ memcpy](<#/doc/string/byte/memcpy>) |  copia um buffer para outro   
(função)