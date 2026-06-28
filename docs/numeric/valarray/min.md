# std::valarray&lt;T&gt;::min

T min() const;

  
Calcula o valor mínimo dos elementos.

Se não houver elementos, o comportamento é indefinido.

A função pode ser usada apenas se operator< for definido para o tipo `T`.

### Parâmetros

(nenhum)

### Valor de retorno

O mínimo dos elementos.

### Exemplo

Execute este código
```cpp
    #include <valarray>
    #include <iostream>
     
    int main()
    {
        std::valarray<double> a{1, 2, 3, 4, 5, 6, 7, 8};
        std::cout << "Minimum value : " << a.min() << "\n";
    }
```

Saída:
```
    Minimum value : 1
```

### Veja também

[ max](<#/doc/numeric/valarray/max>) | retorna o maior elemento   
(função membro pública)  