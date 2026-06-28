# std::stack&lt;T,Container&gt;::empty

bool empty() const;

  
Verifica se o container subjacente não possui elementos. Equivalente a: return` `[`c`](<#/doc/container/stack>).empty(). 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se o container subjacente estiver vazio, `false` caso contrário. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <stack>
     
    int main()
    {
        std::stack<int> stack;
        assert(stack.empty());
     
        stack.push(42);
        assert(!stack.empty());
     
        stack.pop();
        assert(stack.empty());
    }
```

### Veja também

[ size](<#/doc/container/stack/size>) |  retorna o número de elementos   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(template de função)