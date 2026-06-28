# std::inplace_vector&lt;T,N&gt;::front

```cpp
constexpr reference front();  // (1) (desde C++26)
constexpr const_reference front() const;  // (2) (desde C++26)
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

O código a seguir usa `front` para exibir o primeiro elemento de um [std::inplace_vector](<#/doc/container/inplace_vector>)<char, 4>:

Execute este código
```cpp
    #include <cassert>
    #include <inplace_vector>
     
    int main()
    {
        std::inplace_vector<char, 4> letters{'a', 'b', 'c', 'd'};
        assert(letters.front() == 'a');
    }
```

### Veja também

[ back](<#/doc/container/inplace_vector/back>) | acessa o último elemento
(função membro pública)
[ rendcrend](<#/doc/container/inplace_vector/rend>) | retorna um reverse iterator para o final
(função membro pública)
[ begincbegin](<#/doc/container/inplace_vector/begin>) | retorna um iterator para o início
(função membro pública)
[ data](<#/doc/container/inplace_vector/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)