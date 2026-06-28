# std::set&lt;Key,Compare,Allocator&gt;::clear

void clear(); |  |  (noexcept desde C++11)  

  
Apaga todos os elementos do container. Após esta chamada, [size()](<#/doc/container/set/size>) retorna zero. 

Invalida quaisquer referências, ponteiros e iterators que se referem a elementos contidos. Qualquer iterator past-the-end permanece válido. 

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
    #include <set>
     
    void print_info(std::string_view rem, const std::set<int>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
     
    int main()
    {
        std::set<int> container{1, 2, 3};
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

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 224](<https://cplusplus.github.io/LWG/issue224>) | C++98  | a complexidade era log(size()) + N, mas N não foi definido  | corrigido para 'linear em size()'   
  
### Veja também

[ erase](<#/doc/container/set/erase>) |  apaga elementos   
(função membro pública)  