# std::discrete_distribution&lt;IntType&gt;::probabilities

[std::vector](<#/doc/container/vector>)&lt;double&gt; probabilities() const; |  |  (desde C++11)  

  
Obtém um [std::vector](<#/doc/container/vector>)&lt;double&gt; contendo as probabilidades individuais de cada inteiro que é gerado por esta distribuição.

### Parâmetros

(nenhum)

### Valor de retorno

Um objeto do tipo [std::vector](<#/doc/container/vector>)&lt;double&gt;.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <random>
    #include <vector>
     
    int main()
    {
        std::discrete_distribution<> d({40, 10, 10, 40});
        std::vector<double> p = d.probabilities();
        for (auto n : p)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    0.4 0.1 0.1 0.4
```