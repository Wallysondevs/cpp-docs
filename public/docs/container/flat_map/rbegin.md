# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::rbegin, std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::crbegin

```cpp
reverse_iterator rbegin() noexcept;  // (1) (desde C++23)
const_reverse_iterator rbegin() const noexcept;  // (2) (desde C++23)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++23)
```

  
Retorna um iterador reverso para o primeiro elemento do `flat_map` invertido. Ele corresponde ao último elemento do `flat_map` não invertido. Se o `flat_map` estiver vazio, o iterador retornado é igual a rend(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterador reverso para o primeiro elemento. 

### Complexidade

Constante. 

### Notas

O [iterador subjacente](<#/doc/iterator/reverse_iterator/base>) do iterador reverso retornado é o [iterador de fim](<#/doc/container/flat_map/end>). Consequentemente, o iterador retornado é invalidado se e quando o iterador de fim for invalidado.

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    #include <flat_map>
     
    int main()
    {
        const std::flat_map<int, std::string_view> coins
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

[ rendcrend](<#/doc/container/flat_map/rend>) |  retorna um iterador reverso para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um iterador reverso para o início de um container ou array   
(modelo de função)