# std::vector&lt;bool,Allocator&gt;::flip

Definido no cabeçalho `[<vector>](<#/doc/header/vector>)`

```c
void flip();
```

Inverte cada bool (substitui pelo seu valor oposto) no [vector](<#/doc/container/vector_bool>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    void print(const std::vector<bool>& vb)
    {
        for (const bool b : vb)
            std::cout << b;
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<bool> v{0, 1, 0, 1};
        print(v);
        v.flip();
        print(v);
    }
```

Saída:
```
    0101
    1010
```

### Veja também

[ operator[]](<#/doc/container/vector/operator_at>) | acessa o elemento especificado
(função membro pública de `std::vector<T,Allocator>`)
[ flip](<#/doc/utility/bitset/flip>) | inverte os valores dos bits
(função membro pública de `std::bitset<N>`)