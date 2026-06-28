# std::list&lt;T,Allocator&gt;::clear

void clear(); | | (noexcept desde C++11)

Apaga todos os elementos do container. Após esta chamada, [size()](<#/doc/container/list/size>) retorna zero.

Invalida quaisquer referências, ponteiros e iterators que se referem a elementos contidos. Qualquer iterator past-the-end permanece válido.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho do container, ou seja, o número de elementos.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    #include <list>
    
    void print_info(std::string_view rem, const std::list<int>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
    
    int main()
    {
        std::list<int> container{1, 2, 3};
        print_info("Before clear: ", container);
        container.clear();
        print_info("After clear: ", container);
    }
```

Saída:
```
    Before clear: { 1 2 3 }
    Size=3
    After clear: { }
    Size=0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2231](<https://cplusplus.github.io/LWG/issue2231>) | C++11 | a garantia de complexidade foi erroneamente omitida em C++11 | complexidade reafirmada como linear

### Veja também

[ erase](<#/doc/container/list/erase>) | apaga elementos
(função membro pública)