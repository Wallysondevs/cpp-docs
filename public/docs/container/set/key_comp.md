# std::set&lt;Key,Compare,Allocator&gt;::key_comp

key_compare key_comp() const;

  
Retorna o objeto de função que compara as chaves, que é uma cópia do argumento `comp` do [construtor](<#/doc/container/set/set>) deste container. É o mesmo que [value_comp](<#/doc/container/set/value_comp>). 

### Parâmetros

(nenhum) 

### Valor de retorno

O objeto de função de comparação de chaves. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <set>
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
        std::set<int, ModCmp> cont{1, 2, 3, 4, 5};
    
        auto comp_func = cont.key_comp();
    
        for (const int key : cont)
        {
            const bool before = comp_func(key, 100);
            const bool after = comp_func(100, key);
    
            std::cout << '(' << key << ") ";
            if (!before && !after)
                std::cout << "equivalent to key (100)\n";
            else if (before)
                std::cout << "goes before key (100)\n";
            else if (after)
                std::cout << "goes after key (100)\n";
            else
                std::unreachable();
        }
    }
```

Saída: 
```
    Key (1) goes before key (100)
    Key (2) goes before key (100)
    Key (3) equivalent to key (100)
    Key (4) goes after key (100)
    Key (5) goes after key (100)
```

### Veja também

[ value_comp](<#/doc/container/set/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type`   
(função membro pública)  