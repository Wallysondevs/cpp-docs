# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::clear

```cpp
void clear() noexcept;  // (desde C++11)
```

Apaga todos os elementos do container. Após esta chamada, [size()](<#/doc/container/unordered_map/size>) retorna zero.

Invalida quaisquer referências, ponteiros e iteradores que se refiram a elementos contidos. Também pode invalidar iteradores past-the-end.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho do container, ou seja, no número de elementos.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    #include <unordered_map>
    
    void print_info(std::string_view rem, const std::unordered_map<int, char>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& [key, value] : v)
            std::cout << '[' << key << "]:" << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
    
    int main()
    {
        std::unordered_map<int, char> container{{1, 'x'}, {2, 'y'}, {3, 'z'}};
        print_info("Before clear: ", container);
        container.clear();
        print_info("After clear: ", container);
    }
```

Saída possível:
```
    Before clear: { [1]:x [2]:y [3]:z }
    Size=3
    After clear: { }
    Size=0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2550](<https://cplusplus.github.io/LWG/issue2550>) | C++11 | para containers associativos não ordenados, incerto se a complexidade é linear no número de elementos ou buckets | esclarecido que é linear no número de elementos

### Veja também

[ erase](<#/doc/container/unordered_map/erase>) | apaga elementos
(função membro pública)