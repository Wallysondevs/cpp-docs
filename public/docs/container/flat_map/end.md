# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::end, std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++23)
const_iterator end() const noexcept;  // (2) (desde C++23)
const_iterator cend() const noexcept;  // (3) (desde C++23)
```

  
Retorna um iterator para o elemento seguinte ao último elemento do `flat_map`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento seguinte ao último elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <flat_map>
     
    int main()
    {
        std::flat_map<int, double> map{{4, 4.13}, {9, 9.24}, {1, 1.09}};
     
        for (auto it = map.cbegin(); it != map.cend(); ++it)
            std::cout << '[' << it->first << "] = " << it->second << '\n';
     
        // Unlike std::map's bidirectional iterators, the std::flat_map iterators
        // are random-access, so they can be used with the operator[]:
        auto it = map.cbegin();
        assert(it[0] == map[1]);
        assert(it[1] == map[4]);
        assert(it[2] == map[9]);
    }
```

Saída: 
```
    [1] = 1.09
    [4] = 4.13
    [9] = 9.24
```

### Veja também

[ begincbegin](<#/doc/container/flat_map/begin>) | retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array   
(modelo de função)