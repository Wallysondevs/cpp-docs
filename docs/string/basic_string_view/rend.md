# std::basic_string_view&lt;CharT,Traits&gt;::rend, std::basic_string_view&lt;CharT,Traits&gt;::crend

```cpp
constexpr const_reverse_iterator rend() const noexcept;  // (desde C++17)
constexpr const_reverse_iterator crend() const noexcept;  // (desde C++17)
```

  
Retorna um reverse iterator para o caractere que segue o último caractere da view invertida. Ele corresponde ao caractere que precede o primeiro caractere da view não invertida. Este caractere atua como um marcador de posição (placeholder); tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

`const_reverse_iterator` para o caractere que segue o último caractere. 

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
     
        std::copy(str_view.rbegin(), str_view.rend(), out_it);
        *out_it = '\n';
     
        std::copy(str_view.crbegin(), str_view.crend(), out_it);
        *out_it = '\n';
    }
```

Saída: 
```
    fedcba
    fedcba
```

### Ver também

[ rbegincrbegin](<#/doc/string/basic_string_view/rbegin>) |  retorna um reverse iterator para o início   
(função membro pública)  
[ rendcrend](<#/doc/string/basic_string/rend>)(C++11) |  retorna um reverse iterator para o fim   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)