# std::span&lt;T,Extent&gt;::front

```cpp
constexpr reference front() const;  // (desde C++20)
```

  
Retorna uma referência para o primeiro elemento no span.

Chamar `front` em um span vazio resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o primeiro elemento.

### Complexidade

Constante.

### Observações

Para um span `c`, a expressão c.front() é equivalente a *c.begin().

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <span>
     
    void print(std::span<const int> const data)
    {
        for (auto offset{0U}; offset != data.size(); ++offset)
            std::cout << data.subspan(offset).front() << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        constexpr int data[]{0, 1, 2, 3, 4, 5, 6};
        print({data, 4});
    }
```

Saída:
```
    0 1 2 3
```

### Veja também

[ back](<#/doc/container/span/back>) | acessa o último elemento   
(função membro pública)  