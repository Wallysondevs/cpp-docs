# std::experimental::randint

Definido no cabeçalho `[<experimental/random>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/random&action=edit&redlink=1> "cpp/header/experimental/random \(page does not exist\)")`

```c
template< class IntType >
IntType randint( IntType a, IntType b );
```

  
Gera um inteiro aleatório no intervalo fechado `[a, b]`. 

### Parâmetros

a, b  |  \-  |  valores inteiros especificando o range   
  
### Valor de retorno

Um inteiro aleatório i no intervalo fechado `[a, b]`, produzido usando uma instância thread-local de [std::uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)&lt;IntType&gt; invocada com o [motor de números aleatórios por thread](<#/doc/experimental/lib_extensions_2>). 

### Observações

Se `IntType` não for um dos tipos short, int, long, long long, unsigned short, unsigned int, unsigned long, ou unsigned long long, o programa é malformado. 

O comportamento é indefinido se a > b. 

### Exemplo

Execute este código
```
    #include <experimental/random>
    #include <iostream>
     
    int main()
    {
        int random_number = std::experimental::randint(100, 999);
        std::cout << "random 3-digit number: " << random_number << '\n';
    }
```

Saída possível: 
```
    random 3-digit number: 273
```

### Veja também

[ reseed](<#/doc/experimental/reseed>) |  reinicializa o motor aleatório por thread   
(função)  