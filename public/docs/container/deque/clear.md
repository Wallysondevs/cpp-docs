# std::deque&lt;T,Allocator&gt;::clear

void clear(); |  |  (noexcept desde C++11)  

  
Apaga todos os elementos do container. Após esta chamada, [size()](<#/doc/container/deque/size>) retorna zero. 

Invalida quaisquer referências, ponteiros e iteradores que se refiram a elementos contidos. Quaisquer iteradores past-the-end também são invalidados. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho do container, ou seja, o número de elementos. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
    #include <deque>
     
    void print_info(std::string_view rem, const std::deque<int>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
     
    int main()
    {
        std::deque<int> container{1, 2, 3};
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

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2231](<https://cplusplus.github.io/LWG/issue2231>) | C++11  | a garantia de complexidade foi omitida por engano no C++11  | complexidade reafirmada como linear   
  
### Ver também

[ erase](<#/doc/container/deque/erase>) |  apaga elementos   
(função membro pública)  