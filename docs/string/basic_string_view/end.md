# std::basic_string_view&lt;CharT,Traits&gt;::end, std::basic_string_view&lt;CharT,Traits&gt;::cend

```cpp
constexpr const_iterator end() const noexcept;  // (desde C++17)
constexpr const_iterator cend() const noexcept;  // (desde C++17)
```

  
Retorna um iterator para o caractere que segue o último caractere da view. Este caractere atua como um placeholder, tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

`const_iterator` para o caractere que segue o último caractere. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <iterator>
    #include <string_view>
     
    int main()
    {
        constexpr std::string_view str_view("abcd");
        constexpr auto end = str_view.end();
        constexpr auto cend = str_view.cend();
     
        static_assert
        (
            *std::prev(end) == 'd' && 'd' == *std::prev(cend) and end == cend
        );
    }
```

### Veja também

[ begincbegin](<#/doc/string/basic_string_view/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/string/basic_string/end>)(C++11) |  retorna um iterator para o fim   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)