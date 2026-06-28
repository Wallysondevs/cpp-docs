# std::stack&lt;T,Container&gt;::top

```cpp
reference top();  // (1)
const_reference top() const;  // (2)
```

Retorna uma referência para o elemento no topo da stack. Este é o elemento mais recentemente inserido. Este elemento será removido em uma chamada para [pop()](<#/doc/container/stack/pop>). Equivalente a: [`c`](<#/doc/container/stack>).back().

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o último elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <stack>
    
    void reportStackSize(const std::stack<int>& s)
    {
        std::cout << s.size() << " elements on stack\n";
    }
    
    void reportStackTop(const std::stack<int>& s)
    {
        // Leaves element on stack
        std::cout << "Top element: " << s.top() << '\n';
    }
    
    int main()
    {
        std::stack<int> s;
        s.push(2);
        s.push(6);
        s.push(51);
    
        reportStackSize(s);
        reportStackTop(s);
    
        reportStackSize(s);
        s.pop();
    
        reportStackSize(s);
        reportStackTop(s);
    }
```

Saída:
```
    3 elements on stack
    Top element: 51
    3 elements on stack
    2 elements on stack
    Top element: 6
```

### Veja também

[ push](<#/doc/container/stack/push>) | insere um elemento no topo
(função membro pública)
[ pop](<#/doc/container/stack/pop>) | remove o elemento do topo
(função membro pública)