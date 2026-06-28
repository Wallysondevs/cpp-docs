# std::deque&lt;T,Allocator&gt;::front

```cpp
reference front();  // (1)
const_reference front() const;  // (2)
```

Retorna uma referência para o primeiro elemento no container.

Chamar `front` em um container vazio causa comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Referência para o primeiro elemento.

### Complexidade

Constante.

### Observações

Para um container `c`, a expressão c.front() é equivalente a *c.begin().

### Exemplo

O código a seguir usa `front` para exibir o primeiro elemento de um [std::deque](<#/doc/container/deque>)&lt;char&gt;:

Execute este código
```
    #include <cassert>
    #include <deque>
     
    int main()
    {
        std::deque<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.front() == 'a');
    }
```

### Veja também

[ back](<#/doc/container/deque/back>) | acessa o último elemento
(função membro pública)
[ rendcrend](<#/doc/container/deque/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/container/deque/begin>)(C++11) | retorna um iterator para o início
(função membro pública)