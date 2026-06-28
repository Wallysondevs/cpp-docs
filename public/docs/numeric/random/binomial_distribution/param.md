# std::binomial_distribution&lt;IntType&gt;::param

```cpp
param_type param() const;  // (1) (desde C++11)
void param( const param_type& params );  // (2) (desde C++11)
```

Gerencia o conjunto de parâmetros de distribuição associado.

1) Retorna o conjunto de parâmetros associado.

2) Define o conjunto de parâmetros associado para `params`.

### Parâmetros

- **params** — novos conteúdos do conjunto de parâmetros associado

### Valor de retorno

1) O conjunto de parâmetros associado.

2) (nenhum)

### Complexidade

Constante.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <random>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        using BinomialDist = std::binomial_distribution<>;
        BinomialDist bino_dis(1, 0.5);
    
        std::cout << "A sample of Binomial(  1, 0.5): " << bino_dis(gen) << '\n';
    
        // Use another parameter set
        bino_dis.param(BinomialDist::param_type(100,0.9));
        std::cout << "A sample of Binomial(100, 0.9): " << bino_dis(gen) << '\n';
    }
```

Saída possível:
```
    A sample of Binomial(  1, 0.5): 0
    A sample of Binomial(100, 0.9): 94
```