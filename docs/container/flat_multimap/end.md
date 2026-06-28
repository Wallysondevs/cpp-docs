# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::end, std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++23)
const_iterator end() const noexcept;  // (2) (desde C++23)
const_iterator cend() const noexcept;  // (3) (desde C++23)
```

  
Retorna um iterator para o elemento que segue o último elemento do `flat_multimap`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

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

[ begincbegin](<#/doc/container/flat_multimap/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) |  retorna um iterator para o fim de um container ou array   
(modelo de função)