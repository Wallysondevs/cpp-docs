# std::span&lt;T,Extent&gt;::operator[]

```cpp
constexpr reference operator const;  // (desde C++20)
```

  
Retorna uma referência para o elemento de índice `idx` da sequência. O comportamento é indefinido se `idx` estiver fora do intervalo (isto é, se for maior ou igual a `size()`). 

### Parâmetros

idx  |  \-  |  o índice do elemento a ser acessado   
  
### Valor de retorno

Uma referência para o elemento de índice `idx` da sequência, ou seja, `data()[idx]`. 

### Exceções

Não lança exceções. 

### Exemplo

Run this code
```
    #include <cstddef>
    #include <iostream>
    #include <span>
    #include <utility>
     
    void reverse(std::span<int> span)
    {
        for (std::size_t i = 0, j = std::size(span); i < j; ++i)
        {
            --j;
            std::swap(span[i], span[j]);
        }
    }
     
    void print(std::span<const int> const span)
    {
        for (int element : span)
            std::cout << element << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        int data[]{1, 2, 3, 4, 5};
        print(data);
        reverse(data);
        print(data);
    }
```

Output: 
```
    1 2 3 4 5
    5 4 3 2 1
```

### Veja também

[ at](<#/doc/container/span/at>)(C++26) | acessa o elemento especificado com verificação de limites   
(função membro pública)  
[ data](<#/doc/container/span/data>) | acesso direto ao armazenamento contíguo subjacente   
(função membro pública)  
[ size](<#/doc/container/span/size>) | retorna o número de elementos   
(função membro pública)  
[ as_bytesas_writable_bytes](<#/doc/container/span/as_bytes>)(C++20) | converte um `span` em uma visão de seus bytes subjacentes   
(modelo de função)