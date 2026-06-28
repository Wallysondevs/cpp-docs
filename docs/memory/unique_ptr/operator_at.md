# std::unique_ptr&lt;T,Deleter&gt;::operator[]

```cpp
T& operator i ) const;  // (desde C++11)
(constexpr desde C++23)
```

  
`operator[]` fornece acesso a elementos de um array gerenciado por um `unique_ptr`. 

O parâmetro i deve ser menor que o número de elementos no array; caso contrário, o comportamento é indefinido. 

Esta função membro é fornecida apenas para especializações para tipos de array. 

### Parâmetros

i  |  \-  |  o índice do elemento a ser retornado   
  
### Valor de retorno

Retorna o elemento no índice i, ou seja, [`get()[i]`](<#/doc/memory/unique_ptr/get>). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    int main() 
    {
        const int size = 10; 
        std::unique_ptr<int[]> fact(new int[size]);
     
        for (int i = 0; i < size; ++i)
            fact[i] = (i == 0) ? 1 : i * fact[i - 1];
     
        for (int i = 0; i < size; ++i)
            std::cout << i << "! = " << fact[i] << '\n';
    }
```

Saída: 
```
    0! = 1
    1! = 1
    2! = 2
    3! = 6
    4! = 24
    5! = 120
    6! = 720
    7! = 5040
    8! = 40320
    9! = 362880
```

### Veja também

[ get](<#/doc/memory/unique_ptr/get>) |  retorna um ponteiro para o objeto gerenciado   
(função membro pública)  