# std::shared_ptr&lt;T&gt;::operator[]

```cpp
element_type& operator idx ) const;  // (desde C++17)
```

  
Indexa o array apontado pelo ponteiro armazenado.

O comportamento é indefinido se o ponteiro armazenado for nulo ou se idx for negativo.

Se `T` (o parâmetro template de `shared_ptr`) for um tipo array `U[N]`, idx deve ser menor que `N`, caso contrário o comportamento é indefinido.

### Parâmetros

idx  |  \-  |  o índice do array   
  
### Valor de retorno

Uma referência para o elemento idx-ésimo do array, ou seja, get()[idx].

### Exceções

Não lança exceções.

### Observações

Quando `T` não é um tipo array, é não especificado se esta função é declarada. Se a função for declarada, é não especificado qual é o seu tipo de retorno, exceto que a declaração (embora não necessariamente a definição) da função é garantida como sendo legal.

### Exemplo

Execute este código
```cpp 
    #include <cstddef>
    #include <iostream>
    #include <memory>
    
    int main()
    {
        const std::size_t arr_size = 10;
        std::shared_ptr<int[]> pis(new int[10]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9});
        for (std::size_t i = 0; i < arr_size; ++i)
            std::cout << pis[i] << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    0 1 2 3 4 5 6 7 8 9
```

### Veja também

[ get](<#/doc/memory/shared_ptr/get>) |  retorna o ponteiro armazenado   
(função membro pública)  