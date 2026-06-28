# std::inplace_vector&lt;T,N&gt;::operator[]

```cpp
constexpr reference operator;  // (1) (desde C++26)
constexpr const_reference operator const;  // (2) (desde C++26)
```

  
Retorna uma referência para o elemento na posição `pos` especificada. Nenhuma verificação de limites é realizada. 

### Parâmetros

pos  |  \-  |  posição do elemento a ser retornado   
  
### Valor de retorno

Referência para o elemento solicitado. 

### Complexidade

Constante. 

### Observações

Ao contrário de [std::map::operator[]](<#/doc/container/map/operator_at>), este operador nunca insere um novo elemento no container. Acessar um elemento inexistente através deste operador é comportamento indefinido. 

### Exemplo

O código a seguir usa `operator[]` para ler e escrever em um [std::inplace_vector](<#/doc/container/inplace_vector>)<int, N>:

Execute este código
```
    #include <inplace_vector>
    #include <iostream>
     
    int main()
    {
        std::inplace_vector<int, 4> numbers{2, 4, 6, 8};
     
        std::cout << "Second element: " << numbers[1] << '\n';
     
        numbers[0] = 5;
     
        std::cout << "All numbers:";
        for (auto i : numbers)
            std::cout << ' ' << i;
        std::cout << '\n';
    }
```

Saída: 
```
    Second element: 4
    All numbers: 5 4 6 8
```

### Veja também

[ at](<#/doc/container/inplace_vector/at>) |  acessa o elemento especificado com verificação de limites   
(função membro pública)  