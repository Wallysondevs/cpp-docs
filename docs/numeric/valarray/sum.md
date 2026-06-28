# std::valarray&lt;T&gt;::sum

T sum() const;

  
Calcula a soma dos elementos. 

A função pode ser usada apenas se `operator+=` for definido para o tipo `T`. Se o `std::valarray` estiver vazio, o comportamento é indefinido. A ordem em que os elementos são processados por esta função é não especificada. 

### Parâmetros

(nenhum) 

### Valor de retorno

A soma dos elementos. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        std::valarray<int> a = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        std::cout << a.sum() << '\n';
    }
```

Saída: 
```
    55
```

### Veja também

[ apply](<#/doc/numeric/valarray/apply>) | aplica uma função a cada elemento de um valarray   
(função membro pública)  
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou reduz um range de elementos   
(modelo de função)