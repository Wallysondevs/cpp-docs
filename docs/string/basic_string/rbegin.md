# std::basic_string&lt;CharT,Traits,Allocator&gt;::rbegin, std::basic_string&lt;CharT,Traits,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); |  (1) | (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator rbegin() const; |  (2) | (noexcept desde C++11)
(constexpr desde C++20)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Retorna um reverse iterator para o primeiro caractere da string invertida. Ele corresponde ao último caractere da string não invertida. 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro caractere. 

### Complexidade

Constante. 

### Notas

libc++ faz o backport de `crbegin()` para o modo C++98. 

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
     
    int main()
    {
        std::string s("Exemplar!");
        *s.rbegin() = 'y';
        std::cout << s << '\n'; // "Exemplary"
     
        std::string c;
        std::copy(s.crbegin(), s.crend(), std::back_inserter(c));
        std::cout << c << '\n'; // "yralpmexE"
    }
```

Saída: 
```
    Exemplary
    yralpmexE
```

### Veja também

[ rendcrend](<#/doc/string/basic_string/rend>)(desde C++11) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/string/basic_string_view/rbegin>) |  retorna um reverse iterator para o início   
(função membro pública de `std::basic_string_view<CharT,Traits>`)