# std::multimap&lt;Key,T,Compare,Allocator&gt;::rbegin, std::multimap&lt;Key,T,Compare,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); |  (1)  |  (noexcept desde C++11)
const_reverse_iterator rbegin() const; |  (2)  |  (noexcept desde C++11)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um reverse iterator para o primeiro elemento do `multimap` invertido. Ele corresponde ao último elemento do `multimap` não invertido. Se o `multimap` estiver vazio, o iterator retornado é igual a [rend()](<#/doc/container/multimap/rend>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Observações

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/multimap/end>). Portanto, o iterator retornado é invalidado se e quando o end iterator for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <map>
    
    int main()
    {
        std::multimap<std::string, int> map
        {
            {"█", 1},
            {"▒", 5},
            {"░", 3},
            {"▓", 7},
            {"▓", 8},
            {"░", 4},
            {"▒", 6},
            {"█", 2}
        };
    
        std::cout << "Print out in reverse order using const reverse iterators:\n";
        std::for_each(map.crbegin(), map.crend(),
            
            {
                std::cout << "{ \"" << e.first << "\", " << e.second << " };\n";
            });
    
        map.rbegin()->second = 42; // OK: non-const value is modifiable
    //  map.crbegin()->second = 42; // Error: cannot modify the const value
    }
```

Saída possível: 
```
    Print out in reverse order using const reverse iterators:
    { "▓", 8 };
    { "▓", 7 };
    { "▒", 6 };
    { "▒", 5 };
    { "░", 4 };
    { "░", 3 };
    { "█", 2 };
    { "█", 1 };
```

### Veja também

[ rendcrend](<#/doc/container/multimap/rend>)(desde C++11) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(desde C++14) |  retorna um reverse iterator para o início de um container ou array   
(template de função)