# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::rbegin, std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::crbegin

```cpp
reverse_iterator rbegin() noexcept;  // (1) (desde C++23)
const_reverse_iterator rbegin() const noexcept;  // (2) (desde C++23)
const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++23)
```

  
Retorna um reverse iterator para o primeiro elemento do `flat_multimap` invertido. Ele corresponde ao último elemento do `flat_multimap` não invertido. Se o `flat_multimap` estiver vazio, o iterator retornado é igual a rend(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Notas

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/flat_multimap/end>). Consequentemente, o iterator retornado é invalidado se e quando o end iterator for invalidado.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <flat_map>
     
    int main()
    {
        std::flat_multimap<std::string, int> map
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
     
        std::cout << "Imprimir em ordem inversa usando const reverse iterators:\n";
        std::for_each(map.crbegin(), map.crend(),
            <const std::string, int> const& e)
            {
                std::cout << "{ \"" << e.first << "\", " << e.second << " };\n";
            });
     
        map.rbegin()->second = 42; // OK: valor não-const é modificável
    //  map.crbegin()->second = 42; // Erro: não é possível modificar o valor const
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

[ rendcrend](<#/doc/container/flat_multimap/rend>) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um reverse iterator para o início de um container ou array   
(modelo de função)