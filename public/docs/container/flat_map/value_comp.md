# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::value_comp

std::flat_map::value_compare value_comp() const; |  |  (desde C++23)  

  
Retorna um objeto de função que compara objetos do tipo std::flat_map::[`value_type`](<#/doc/container/flat_map>) (pares chave-valor) usando key_comp para comparar os primeiros componentes dos pares. 

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
    
    // Exemplo de função de comparação de chave módulo 97
    struct ModCmp
    {
        bool operator()(int lhs, int rhs) const
        {
            return (lhs % 97) < (rhs % 97);
        }
    };
    
    int main()
    {
        std::flat_map<int, char, ModCmp> cont;
        cont = {{1, 'a'}, {2, 'b'}, {3, 'c'}, {4, 'd'}, {5, 'e'}};
    
        auto comp_func = cont.value_comp();
    
        for (const std::pair<int, char> val = {100, 'a'}; auto it : cont)
        {
            const bool before = comp_func(it, val);
            const bool after = comp_func(val, it);
    
            std::cout << '(' << it.first << ',' << it.second << ") ";
            if (!before && !after)
                std::cout << "equivalente à chave (" << val.first << ")\n";
            else if (before)
                std::cout << "vem antes da chave (" << val.first << ")\n";
            else if (after)
                std::cout << "vem depois da chave (" << val.first << ")\n";
            else
                std::unreachable();
        }
    }
```

Saída: 
```
    (1,a) vem antes da chave (100)
    (2,b) vem antes da chave (100)
    (3,c) equivalente à chave (100)
    (4,d) vem depois da chave (100)
    (5,e) vem depois da chave (100)
```

### Ver também

[ key_comp](<#/doc/container/flat_map/key_comp>) | retorna a função que compara chaves   
(função membro pública)  