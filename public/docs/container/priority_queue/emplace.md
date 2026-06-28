# std::priority_queue&lt;T,Container,Compare&gt;::emplace

```cpp
template< class... Args >
void emplace( Args&&... args );  // (desde C++11)
```

  
Adiciona um novo elemento à priority queue. O elemento é construído no local (in-place), ou seja, nenhuma operação de cópia ou movimentação é realizada. O construtor do elemento é chamado com exatamente os mesmos argumentos fornecidos à função. 

Efetivamente chama 
```
    c.emplace_back(std::forward<Args>(args)...);
    std::push_heap(c.begin(), c.end(), comp);
```

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

(nenhum) 

### Complexidade

Número logarítmico de comparações mais a complexidade de Container::emplace_back. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <queue>
     
    struct S
    {
        int id;
     
        S(int i, double d, std::string s) : id{i}
        {
            std::cout << "S::S(" << i << ", " << d << ", \"" << s << "\");\n";
        }
        friend bool operator< (S const& x, S const& y) { return x.id < y.id; }
    };
     
    int main()
    {
        std::priority_queue<S> queue;
        queue.emplace(42, 3.14, "C++");
        std::cout << "id: " << queue.top().id << '\n';
    }
```

Saída: 
```
    S::S(42, 3.14, "C++")
    id = 42
```

### Veja também

[ push](<#/doc/container/priority_queue/push>) |  insere um elemento e ordena o container subjacente   
(função membro pública)  
[ pop](<#/doc/container/priority_queue/pop>) |  remove o elemento do topo   
(função membro pública)