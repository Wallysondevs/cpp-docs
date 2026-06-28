# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::value_comp

std::flat_multiset::value_compare value_comp() const; | | (desde C++23)

Retorna o objeto de função que compara os valores. É o mesmo que key_comp.

### Parâmetros

(nenhum)

### Valor de retorno

O objeto de função de comparação de valores.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <flat_set>
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
        std::flat_multiset<int, ModCmp> cont{1, 2, 3, 4, 5};
    
        // Same behaviour as key_comp()
        auto comp_func = cont.value_comp();
    
        for (const int val{100}; const int key : cont)
        {
            const bool before = comp_func(key, val);
            const bool after = comp_func(val, key);
    
            std::cout << "Key (" << key << ") ";
            if (!before && !after)
                std::cout << "equivalent to key (" << val << ")\n";
            else if (before)
                std::cout << "goes before key (" << val << ")\n";
            else if (after)
                std::cout << "goes after key (" << val << ")\n";
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

[ key_comp](<#/doc/container/flat_multiset/key_comp>) | retorna a função que compara chaves
(função membro pública)