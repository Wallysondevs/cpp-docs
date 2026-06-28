# std::array&lt;T,N&gt;::front

```cpp
reference front();  // (1) (desde C++11)
(constexpr desde C++17)
const_reference front() const;  // (2) (desde C++11)
(constexpr desde C++14)
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

O código a seguir usa `front` para exibir o primeiro elemento de um [std::array](<#/doc/container/array>)<char, 4>:

Execute este código
```
    #include <cassert>
    #include <array>
    
    int main()
    {
        std::array<char, 4> letters{'a', 'b', 'c', 'd'};
        assert(letters.front() == 'a');
    }
```

### Veja também

[ back](<#/doc/container/array/back>) | acessa o último elemento
(função membro pública)
[ rendcrend](<#/doc/container/array/rend>) | retorna um reverse iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/container/array/begin>) | retorna um iterator para o início
(função membro pública)
[ data](<#/doc/container/array/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)