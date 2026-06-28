# std::vector&lt;T,Allocator&gt;::front

reference front(); | (1) | (constexpr desde C++20)
---|---|---
const_reference front() const; | (2) | (constexpr desde C++20)

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

O código a seguir usa `front` para exibir o primeiro elemento de um [std::vector](<#/doc/container/vector>)&lt;char&gt;:

Execute este código
```cpp
    #include <cassert>
    #include <vector>
     
    int main()
    {
        std::vector<char> letters{'a', 'b', 'c', 'd'};
        assert(letters.front() == 'a');
    }
```

### Veja também

[ back](<#/doc/container/vector/back>) | acessa o último elemento
(função membro pública)
[ rendcrend](<#/doc/container/vector/rend>)(C++11) | retorna um reverse iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/container/vector/begin>)(C++11) | retorna um iterator para o início
(função membro pública)
[ data](<#/doc/container/vector/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)