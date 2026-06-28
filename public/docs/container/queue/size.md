# std::queue&lt;T,Container&gt;::size

size_type size() const;

  
Retorna o número de elementos no adaptador de container. Equivalente a: return` `[`c`](<#/doc/container/queue>)`.size(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no adaptador de container. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <queue>
     
    int main()
    {
        std::queue<int> queue;
        assert(queue.size() == 0);
     
        const int count = 8;
        for (int i = 0; i != count; ++i)
            queue.push(i);
        assert(queue.size() == count);
    }
```

### Veja também

[ empty](<#/doc/container/queue/empty>) |  verifica se o adaptador de container está vazio   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)