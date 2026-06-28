# std::basic_string_view&lt;CharT,Traits&gt;::max_size

```cpp
constexpr size_type max_size() const noexcept;  // (desde C++17)
```

  
O maior número possível de objetos tipo char que podem ser referenciados por um `basic_string_view`. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número máximo de caracteres. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp 
    #include <cstdint>
    #include <iostream>
    #include <limits>
    #include <string_view>
     
    int main()
    {
        std::cout << std::numeric_limits<std::int64_t>::max()
                  << " <- numeric_limits<int64_t>::max()\n"
                  << std::string_view{}.max_size()
                  << " <- string_view::max_size()\n"
                  << std::basic_string_view<char>{}.max_size()
                  << " <- basic_string_view<char>::max_size()\n"
                  << std::basic_string_view<char16_t>{}.max_size()
                  << " <- basic_string_view<char16_t>::max_size()\n"
                  << std::wstring_view{}.max_size()
                  << " <- wstring_view::max_size()\n"
                  << std::basic_string_view<char32_t>{}.max_size()
                  << " <- basic_string_view<char32_t>::max_size()\n";
    }
```

Saída possível: 
```
    9223372036854775807 <- numeric_limits<int64_t>::max()
    4611686018427387899 <- string_view::max_size()
    4611686018427387899 <- basic_string_view<char>::max_size()
    2305843009213693949 <- basic_string_view<char16_t>::max_size()
    1152921504606846974 <- wstring_view::max_size()
    1152921504606846974 <- basic_string_view<char32_t>::max_size()
```

### Veja também

[ sizelength](<#/doc/string/basic_string_view/size>) |  retorna o número de caracteres   
(função membro pública)  
[ empty](<#/doc/string/basic_string_view/empty>) |  verifica se a view está vazia   
(função membro pública)  
[ max_size](<#/doc/string/basic_string/max_size>) |  retorna o número máximo de caracteres   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)