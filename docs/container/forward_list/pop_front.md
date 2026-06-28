# std::forward_list&lt;T,Allocator&gt;::pop_front

```cpp
void pop_front();  // (desde C++11)
```

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
```cpp
    #include <forward_list>
    #include <iostream>
     
    int main()
    {
        std::forward_list<char> chars{'A', 'B', 'C', 'D'};
     
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

[ push_front](<#/doc/container/forward_list/push_front>) | insere um elemento no início
(função membro pública)
[ front](<#/doc/container/forward_list/front>) | acessa o primeiro elemento
(função membro pública)