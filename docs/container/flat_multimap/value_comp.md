# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::value_comp

std::flat_multimap::value_compare value_comp() const; |  |  (desde C++23)  

  
Retorna um objeto de função que compara objetos do tipo std::flat_multimap::[`value_type`](<#/doc/container/flat_multimap>) (pares chave-valor) usando key_comp para comparar os primeiros componentes dos pares. 

### Parâmetros

(nenhum) 

### Valor de retorno

O objeto de função de comparação de valor. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_map>
    #include <utility>
    
    // Example module 97 key compare function
    struct ModCmp
    {
        bool operator()(int lhs, int rhs) const
        {
            return (lhs % 97) < (rhs % 97);
        }
    };
    
    int main()
    {
        std::flat_multimap<int, char, ModCmp> cont;
        cont = {{1, 'a'}, {2, 'b'}, {3, 'c'}, {4, 'd'}, {5, 'e'}};
    
        auto comp_func = cont.value_comp();
    
        for (const std::pair<int, char> val = {100, 'a'}; auto it : cont)
        {
            const bool before = comp_func(it, val);
            const bool after = comp_func(val, it);
    
            std::cout << '(' << it.first << ',' << it.second << ") ";
            if (!before && !after)
                std::cout << "equivalent to key (" << val.first << ")\n";
            else if (before)
                std::cout << "goes before key (" << val.first << ")\n";
            else if (after)
                std::cout << "goes after key (" << val.first << ")\n";
            else
                std::unreachable();
        }
    }
```

Saída: 
```
    (1,a) goes before key (100)
    (2,b) goes before key (100)
    (3,c) equivalent to key (100)
    (4,d) goes after key (100)
    (5,e) goes after key (100)
```

### Ver também

[ key_comp](<#/doc/container/flat_multimap/key_comp>) |  retorna a função que compara chaves   
(public member function)  