# std::forward_list&lt;T,Allocator&gt;::erase_after

```cpp
iterator erase_after( const_iterator pos );  // (1) (desde C++11)
iterator erase_after( const_iterator first, const_iterator last );  // (2) (desde C++11)
```

Remove elementos especificados do container.

1) Remove o elemento que segue pos.

2) Remove os elementos que seguem first até last.

### Parâmetros

- **pos** — iterator para o elemento que precede o elemento a ser removido
- **first, last** — range de elementos a serem removidos

### Valor de retorno

1) Iterator para o elemento que segue o elemento apagado, ou [end()](<#/doc/container/forward_list/end>) se tal elemento não existir.

2) last

### Complexidade

1) Constante.

2) Linear na distância entre first e last.

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        std::forward_list<int> l = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    
    //  l.erase(l.begin()); // Error: no function erase()
    
        l.erase_after(l.before_begin()); // Removes first element
    
        for (auto n : l)
            std::cout << n << ' ';
        std::cout << '\n';
    
        auto fi = std::next(l.begin());
        auto la = std::next(fi, 3);
    
        l.erase_after(fi, la);
    
        for (auto n : l)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    2 3 4 5 6 7 8 9
    2 3 6 7 8 9
```

### Veja também

[ clear](<#/doc/container/forward_list/clear>) | limpa o conteúdo
(função membro pública)