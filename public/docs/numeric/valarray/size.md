# std::valarray&lt;T&gt;::size

[std::size_t](<#/doc/types/size_t>) size() const;

  
Retorna o número de elementos no valarray. 

### Parâmetros

(nenhum) 

### Valor de retorno

Número de elementos no valarray. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        std::valarray<double> a = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        std::cout << "Average: " << a.sum()/a.size() << '\n';
    }
```

Saída: 
```
    Average: 5.5
```

### Veja também

[ resize](<#/doc/numeric/valarray/resize>) |  altera o tamanho do valarray   
(função membro pública)  