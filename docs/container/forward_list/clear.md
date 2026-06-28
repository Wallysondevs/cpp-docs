# std::forward_list&lt;T,Allocator&gt;::clear

```cpp
void clear() noexcept;  // (desde C++11)
```

  
Apaga todos os elementos do container. 

Invalida quaisquer referências, ponteiros e iteradores que se referem a elementos contidos. Qualquer iterador past-the-end permanece válido. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Complexidade

Linear em relação ao tamanho do container, ou seja, o número de elementos. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
    #include <forward_list>
     
    void print_info(std::string_view rem, const std::forward_list<int>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
    }
     
    int main()
    {
        std::forward_list<int> container{1, 2, 3};
        print_info("Before clear: ", container);
        container.clear();
        print_info("After clear: ", container);
    }
```

Saída: 
```
    Before clear: { 1 2 3 }
    After clear: { }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2231](<https://cplusplus.github.io/LWG/issue2231>) | C++11  | a garantia de complexidade foi omitida por engano em C++11  | complexidade reafirmada como linear   
  
### Veja também

[ erase_after](<#/doc/container/forward_list/erase_after>) |  apaga um elemento após outro elemento   
(função membro pública)  