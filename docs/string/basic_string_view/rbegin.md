# std::basic_string_view&lt;CharT,Traits&gt;::rbegin, std::basic_string_view&lt;CharT,Traits&gt;::crbegin

```cpp
constexpr const_reverse_iterator rbegin() const noexcept;  // (desde C++17)
constexpr const_reverse_iterator crbegin() const noexcept;  // (desde C++17)
```

  
Retorna um reverse iterator para o primeiro caractere da view invertida. Ele corresponde ao último caractere da view não invertida. 

### Parâmetros

(nenhum) 

### Valor de retorno

`const_reverse_iterator` para o primeiro caractere. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string_view>
     
    int main()
    {
        std::ostream_iterator<char> out_it(std::cout);
        std::string_view str_view("abcdef");
     
        std::copy(str_view.rbegin(), std::next(str_view.rbegin(), 3), out_it);
        *out_it = '\n';
     
        std::copy(str_view.crbegin(), std::next(str_view.crbegin(), 3), out_it);
        *out_it = '\n';
    }
```

Saída: 
```
    fed
    fed
```

### Veja também

[ rendcrend](<#/doc/string/basic_string_view/rend>) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/string/basic_string/rbegin>)(desde C++11) |  retorna um reverse iterator para o início   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)