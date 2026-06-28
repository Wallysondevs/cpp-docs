# std::forward_list&lt;T,Allocator&gt;::reverse

```cpp
void reverse() noexcept;  // (desde C++11)
```

  
Inverte a ordem dos elementos no container. Nenhuma referência ou iterator é invalidado.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho do container.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <forward_list>
     
    std::ostream& operator<<(std::ostream& ostr, const std::forward_list<int>& list)
    {
        for (auto& i : list)
            ostr << ' ' << i;
        return ostr;
    }
     
    int main()
    {
        std::forward_list<int> list = {8, 7, 5, 9, 0, 1, 3, 2, 6, 4};
        std::cout << "initially: " << list << '\n';
     
        list.sort();
        std::cout << "ascending: " << list << '\n';
     
        list.reverse();
        std::cout << "descending:" << list << '\n';
    }
```

Saída:
```
    initially:  8 7 5 9 0 1 3 2 6 4
    ascending:  0 1 2 3 4 5 6 7 8 9
    descending: 9 8 7 6 5 4 3 2 1 0
```

### Veja também

[ sort](<#/doc/container/forward_list/sort>) | ordena os elementos   
(função membro pública)  