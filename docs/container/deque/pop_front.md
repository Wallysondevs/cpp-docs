# std::deque&lt;T,Allocator&gt;::pop_front

void pop_front();

  
Remove o primeiro elemento do container. Se não houver elementos no container, o comportamento é indefinido.

Iterators e referências para o elemento apagado são invalidados. Se o elemento for o último elemento no container, o iterator [`end()`](<#/doc/container/deque/end>) também é invalidado. Outras referências e iterators não são afetados.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

Não lança exceções.

### Exemplo

Execute este código
```
    #include <deque>
    #include <iostream>
     
    int main()
    {
        std::deque<char> chars{'A', 'B', 'C', 'D'};
     
        for (; !chars.empty(); chars.pop_front())
            std::cout << "chars.front(): '" << chars.front() << "'\n";
    }
```

Saída: 
```
    chars.front(): 'A'
    chars.front(): 'B'
    chars.front(): 'C'
    chars.front(): 'D'
```

### Veja também

[ pop_back](<#/doc/container/deque/pop_back>) | remove o último elemento   
(função membro pública)  
[ push_front](<#/doc/container/deque/push_front>) | insere um elemento no início   
(função membro pública)  
[ front](<#/doc/container/deque/front>) | acessa o primeiro elemento   
(função membro pública)