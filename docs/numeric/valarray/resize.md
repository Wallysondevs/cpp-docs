# std::valarray&lt;T&gt;::resize

void resize( [std::size_t](<#/doc/types/size_t>) count, T value = T() );

  
Redimensiona o valarray para conter count elementos e atribui value a cada elemento.

Esta função invalida todos os ponteiros e referências para elementos no array.

### Parâmetros

count  |  \-  |  novo tamanho do container   
---|---|---
value  |  \-  |  o valor para inicializar os novos elementos   
  
### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        std::valarray<int> v{1, 2, 3};
        v.resize(10);
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    0 0 0 0 0 0 0 0 0 0
```

### Veja também

[ size](<#/doc/numeric/valarray/size>) |  retorna o tamanho do valarray   
(função membro pública)  