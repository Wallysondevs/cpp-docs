# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::begin, std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++23)
const_iterator begin() const noexcept;  // (2) (desde C++23)
const_iterator cbegin() const noexcept;  // (3) (desde C++23)
```

  
Retorna um iterator para o primeiro elemento do `flat_multimap`. 

Se o `flat_multimap` estiver vazio, o iterator retornado será igual a end(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_map>
    
    int main()
    {
        std::flat_multimap<int, int> map{{4, 13}, {9, 94}, {1, 19}, {4, 42}};
    
        for (auto it = map.cbegin(); it != map.cend(); ++it)
            std::cout << '[' << it->first << "] = " << it->second << '\n';
    
        // Unlike std::multimap's bidirectional iterators, the std::flat_multimap
        // iterators are random-access, so they can be used with the operator[]:
        auto it = map.cbegin();
        assert(it[1] == 19);
        assert(it[4] == 13);
        assert(it[4] == 42);
        assert(it[9] == 94);
    }
```

Saída: 
```
    [1] = 19
    [4] = 13
    [4] = 42
    [9] = 94
```

### Veja também

[ endcend](<#/doc/container/flat_multimap/end>) |  retorna um iterator para o final   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) |  retorna um iterator para o início de um container ou array   
(modelo de função)