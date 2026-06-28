# std::valarray&lt;T&gt;::max

T max() const;

  
Calcula o valor máximo dos elementos. 

Se não houver elementos, o comportamento é indefinido. 

A função pode ser usada apenas se operator< for definido para o tipo `T`. 

### Parâmetros

(nenhum) 

### Valor de retorno

O máximo dos elementos. 

### Exemplo

Execute este código
```cpp 
    #include <valarray>
    #include <iostream>
     
    int main()
    {
        std::valarray<double> a{1, 2, 3, 4, 5, 6, 7, 8};
        std::cout << "Maximum value : " << a.max() << "\n";
    }
```

Saída: 
```
    Maximum value : 8
```

### Veja também

[ min](<#/doc/numeric/valarray/min>) |  retorna o menor elemento   
(função membro pública)  