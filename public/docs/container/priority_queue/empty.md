# std::priority_queue&lt;T,Container,Compare&gt;::empty

bool empty() const;

  
Verifica se o container subjacente não possui elementos. Equivalente a: return` `[`c`](<#/doc/container/priority_queue>).empty(). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o container subjacente estiver vazio, false caso contrário. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <queue>
     
    int main()
    {
        std::priority_queue<int> queue;
        assert(queue.empty());
     
        queue.push(42);
        assert(!queue.empty());
     
        queue.pop();
        assert(queue.empty());
    }
```

### Veja também

[ size](<#/doc/container/priority_queue/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)