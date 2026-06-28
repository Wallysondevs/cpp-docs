# std::multimap&lt;Key,T,Compare,Allocator&gt;::clear

void clear(); |  |  (noexcept desde C++11)  

  
Apaga todos os elementos do container. Após esta chamada, [size()](<#/doc/container/multimap/size>) retorna zero. 

Invalida quaisquer referências, ponteiros e iteradores que se refiram a elementos contidos. Qualquer iterador past-the-end permanece válido. 

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
    #include <map>
     
    void print_info(std::string_view rem, const std::multimap<int, char>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& [key, value] : v)
            std::cout << '[' << key << "]:" << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
     
    int main()
    {
        std::multimap<int, char> container{{1, 'x'}, {2, 'y'}, {3, 'z'}};
        print_info("Before clear: ", container);
        container.clear();
        print_info("After clear: ", container);
    }
```

Saída: 
```
    Before clear: { [1]:x [2]:y [3]:z }
    Size=3
    After clear: { }
    Size=0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 224](<https://cplusplus.github.io/LWG/issue224>) | C++98  | a complexidade era log(size()) + N, mas N não estava definido  | corrigido para 'linear em size()'   
  
### Veja também

[ erase](<#/doc/container/multimap/erase>) |  apaga elementos   
(função membro pública)  