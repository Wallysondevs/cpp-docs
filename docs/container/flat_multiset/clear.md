# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::clear

```cpp
void clear() noexcept;  // (desde C++23)
```

  
Apaga todos os elementos do adaptador de container. Após esta chamada, size() retorna zero. 

Invalida quaisquer referências, ponteiros e iteradores que se refiram a elementos contidos. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho do adaptador de container, ou seja, o número de elementos. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
    #include <flat_set>
     
    void print_info(std::string_view rem, const std::flat_multiset<int>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
     
    int main()
    {
        std::flat_multiset<int> container{1, 2, 3};
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

### Ver também

[ erase](<#/doc/container/flat_multiset/erase>) |  apaga elementos   
(função membro pública)  