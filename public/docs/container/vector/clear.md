# std::vector&lt;T,Allocator&gt;::clear

void clear(); |  |  (noexcept desde C++11)  
(constexpr desde C++20)  

  
Apaga todos os elementos do container. Após esta chamada, [size()](<#/doc/container/vector/size>) retorna zero. 

Invalida quaisquer referências, ponteiros e iteradores que se refiram a elementos contidos. Quaisquer iteradores past-the-end também são invalidados. 

Deixa a [capacity()](<#/doc/container/vector/capacity>) do vector inalterada (Nota: a restrição do padrão sobre as mudanças na capacidade está na especificação de [reserve()](<#/doc/container/vector/reserve>), veja [SO](<https://stackoverflow.com/a/18467916>)). 

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
    #include <vector>
     
    void print_info(std::string_view rem, const std::vector<int>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << ", Capacity=" << v.capacity() << '\n';
    }
     
    int main()
    {
        std::vector<int> container{1, 2, 3};
        print_info("Before clear: ", container);
        container.clear();
        print_info("After clear: ", container);
    }
```

Saída: 
```
    Before clear: { 1 2 3 }
    Size=3, Capacity=3
    After clear: { }
    Size=0, Capacity=3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2231](<https://cplusplus.github.io/LWG/issue2231>) | C++11  | a garantia de complexidade foi omitida por engano no C++11  | complexidade reafirmada como linear   
  
### Veja também

[ erase](<#/doc/container/vector/erase>) |  apaga elementos   
(função membro pública)  