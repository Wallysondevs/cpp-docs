# std::list&lt;T,Allocator&gt;::pop_front

void pop_front();

  
Remove o primeiro elemento do container. Se não houver elementos no container, o comportamento é indefinido.

Referências e iteradores para o elemento apagado são invalidados.

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
    #include <list>
    #include <iostream>
     
    int main()
    {
        std::list<char> chars{'A', 'B', 'C', 'D'};
     
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

[ pop_back](<#/doc/container/list/pop_back>) | remove o último elemento   
(função membro pública)  
[ push_front](<#/doc/container/list/push_front>) | insere um elemento no início   
(função membro pública)  
[ front](<#/doc/container/list/front>) | acessa o primeiro elemento   
(função membro pública)