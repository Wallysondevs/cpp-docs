# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::begin, std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++23)
const_iterator begin() const noexcept;  // (2) (desde C++23)
const_iterator cbegin() const noexcept;  // (3) (desde C++23)
```

Retorna um iterator para o primeiro elemento do `flat_map`.

Se o `flat_map` estiver vazio, o iterator retornado será igual a end().

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
        std::flat_map<int, double> map{{4, 4.13}, {9, 9.24}, {1, 1.09}};
     
        for (auto it = map.cbegin(); it != map.cend(); ++it)
            std::cout << '[' << it->first << "] = " << it->second << '\n';
     
        // Ao contrário dos iterators bidirecionais de std::map, os iterators de std::flat_map
        // são de acesso aleatório, então eles podem ser usados com o operator[]:
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

[ endcend](<#/doc/container/flat_map/end>) | retorna um iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)