# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::clear

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
    #include <flat_map>
     
    void print_info(std::string_view rem, const std::flat_map<int, char>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& [key, value] : v)
            std::cout << '[' << key << "]:" << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
     
    int main()
    {
        std::flat_map<int, char> container{{1, 'x'}, {2, 'y'}, {3, 'z'}};
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

### Veja também

[ erase](<#/doc/container/flat_map/erase>) |  apaga elementos   
(função membro pública)  