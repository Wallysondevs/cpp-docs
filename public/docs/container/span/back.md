# std::span&lt;T,Extent&gt;::back

```cpp
constexpr reference back() const;  // (desde C++20)
```

  
Retorna uma referência para o último elemento no span. 

Chamar `back` em um span vazio resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Uma referência para o elemento final. 

### Complexidade

Constante. 

### Observações

Para um span `c`, a expressão c.back() é equivalente a *(c.end() - 1). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <span>
     
    void print_forward(std::span<const int> const span)
    {
        for (auto n{span.size()}; n != 0; --n)
            std::cout << span.last(n).front() << ' ';
        std::cout << '\n';
    }
     
    void print_backward(std::span<const int> const span)
    {
        for (auto n{span.size()}; n != 0; --n)
            std::cout << span.first(n).back() << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        constexpr int numbers[]{0, 1, 2, 3, 4};
        print_forward(numbers);
        print_backward(numbers);
    }
```

Saída: 
```
    0 1 2 3 4
    4 3 2 1 0
```

### Veja também

[ front](<#/doc/container/span/front>) | acessa o primeiro elemento   
(função membro pública)  