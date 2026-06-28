# std::basic_string_view&lt;CharT,Traits&gt;::begin, std::basic_string_view&lt;CharT,Traits&gt;::cbegin

```cpp
constexpr const_iterator begin() const noexcept;  // (desde C++17)
constexpr const_iterator cbegin() const noexcept;  // (desde C++17)
```

  
Retorna um iterator para o primeiro caractere da view. 

### Parâmetros

(nenhum) 

### Valor de retorno

`const_iterator` para o primeiro caractere. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <concepts>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view str_view("abcd");
    
        constexpr auto begin = str_view.begin();
        constexpr auto cbegin = str_view.cbegin();
        static_assert(
            *begin == 'a' and
            *cbegin == 'a' and
            *begin == *cbegin and
            begin == cbegin and
            std::same_as<decltype(begin), decltype(cbegin)>);
    }
```

### Veja também

[ endcend](<#/doc/string/basic_string_view/end>) |  retorna um iterator para o fim   
(função membro pública)  
[ begincbegin](<#/doc/string/basic_string/begin>)(C++11) |  retorna um iterator para o início   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)