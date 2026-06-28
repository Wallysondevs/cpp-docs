# std::experimental::shuffle

Definido no cabeçalho `[<experimental/algorithm>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/algorithm&action=edit&redlink=1> "cpp/header/experimental/algorithm \(page does not exist\)")`

```c
template< class RandomIt >
void shuffle( RandomIt first, RandomIt last );
```

  
Reordena os elementos no dado range `[`first`, `last`)` de forma que cada permutação possível desses elementos tenha igual probabilidade de aparecer, usando o [motor de números aleatórios por thread](<#/doc/experimental/lib_extensions_2>) como gerador de números aleatórios. 

### Parâmetros

first, last  |  \-  |  o range de elementos a serem embaralhados aleatoriamente   
-`RandomIt` deve satisfazer os requisitos de [ValueSwappable](<#/doc/named_req/ValueSwappable>) e [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear na distância entre first e last. 

### Exemplo

Execute este código
```
    #include <experimental/algorithm>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string sample{"ABCDEF"};
     
        for (int i = 0; i != 4; ++i)
        {
            std::experimental::shuffle(sample.begin(), sample.end());
            std::cout << sample << '\n';
        }
    }
```

Saída possível: 
```
    DACBFE
    CDFBAE
    BDCAFE
    BAFCED
```

### Veja também

[ random_shuffleshuffle](<#/doc/algorithm/random_shuffle>)(até C++17)(C++11) |  reordena elementos aleatoriamente em um range   
(modelo de função)  