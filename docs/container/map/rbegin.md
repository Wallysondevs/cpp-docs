# std::map&lt;Key,T,Compare,Allocator&gt;::rbegin, std::map&lt;Key,T,Compare,Allocator&gt;::crbegin

```cpp
reverse_iterator rbegin(); |  (1)  |  (noexcept desde C++11)
const_reverse_iterator rbegin() const; |  (2)  |  (noexcept desde C++11)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um reverse iterator para o primeiro elemento do `map` invertido. Ele corresponde ao último elemento do `map` não invertido. Se o `map` estiver vazio, o iterator retornado é igual a [rend()](<#/doc/container/map/rend>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Observações

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/map/end>). Consequentemente, o iterator retornado é invalidado se e quando o end iterator for invalidado.

libc++ faz o backport de `crbegin()` para o modo C++98.

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    #include <map>
     
    int main()
    {
        const std::map<int, std::string_view> coins
        {
            {10, "dime"},
            {100, "dollar"},
            {50, "half dollar"},
            {5, "nickel"},
            {1, "penny"},
            {25, "quarter"}
        }; // initializer entries in name alphabetical order
     
        std::cout << "US coins in circulation, largest to smallest denomination:\n";
        for (auto it = coins.crbegin(); it != coins.crend(); ++it)
            std::cout << std::setw(11) << it->second << " = ¢" << it->first << '\n';
    }
```

Saída: 
```
    US coins in circulation, largest to smallest denomination:
         dollar = ¢100
    half dollar = ¢50
        quarter = ¢25
           dime = ¢10
         nickel = ¢5
          penny = ¢1
```

### Ver também

[ rendcrend](<#/doc/container/map/rend>)(C++11) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um reverse iterator para o início de um container ou array   
(template de função)