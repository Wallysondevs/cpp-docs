# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::key_comp

key_compare key_comp() const; | | (desde C++23)

Retorna o objeto de função que compara as chaves, que é uma cópia do argumento `comp` do [construtor](<#/doc/container/flat_multimap/flat_multimap>) deste container.

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
    
        auto comp_func = cont.key_comp();
    
        for (const auto it : cont)
        {
            const bool before = comp_func(it.first, 100);
            const bool after = comp_func(100, it.first);
    
            std::cout << "Key (" << it.first << ',' << it.second << ") ";
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
    (1,a) goes before key (100)
    (2,b) goes before key (100)
    (3,c) equivalent to key (100)
    (4,d) goes after key (100)
    (5,e) goes after key (100)
```

### Veja também

[ value_comp](<#/doc/container/flat_multimap/value_comp>) | retorna a função que compara chaves em objetos do tipo `value_type` (função membro pública)