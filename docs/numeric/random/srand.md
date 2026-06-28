# std::srand

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void srand( unsigned seed );
```

Inicializa o gerador de números pseudoaleatórios usado por [std::rand()](<#/doc/numeric/random/rand>) com o valor `seed`.

Se [std::rand()](<#/doc/numeric/random/rand>) for usado antes de qualquer chamada a `srand()`, [std::rand()](<#/doc/numeric/random/rand>) se comporta como se tivesse sido inicializado com srand(1).

Cada vez que [std::rand()](<#/doc/numeric/random/rand>) é inicializado com a mesma `seed`, ele deve produzir a mesma sequência de valores.

`srand()` não tem garantia de ser thread-safe.

### Parâmetros

- **seed** — o valor da semente

### Valor de retorno

(nenhum)

### Notas

De modo geral, o gerador de números pseudoaleatórios deve ser inicializado apenas uma vez, antes de qualquer chamada a `rand()`, no início do programa. Ele não deve ser inicializado repetidamente, ou reinicializado toda vez que você desejar gerar um novo lote de números pseudoaleatórios.

A prática padrão é usar o resultado de uma chamada a [std::time](<#/doc/chrono/c/time>)(0) como semente. No entanto, [std::time](<#/doc/chrono/c/time>) retorna um valor [std::time_t](<#/doc/chrono/c/time_t>), e [std::time_t](<#/doc/chrono/c/time_t>) não tem garantia de ser um tipo integral. Na prática, porém, toda implementação principal define [std::time_t](<#/doc/chrono/c/time_t>) como um tipo integral, e isso também é o que o POSIX exige.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <ctime>
    #include <iostream>
    
    int main() 
    {
        std::srand(std::time(0)); // use current time as seed for random generator
        std::cout << "Random value on [0, " << RAND_MAX << "]: " << std::rand() << '\n';
    }
```

Saída possível:
```
    Random value on [0, 2147483647]: 1373858591
```

### Veja também

[ rand](<#/doc/numeric/random/rand>) | gera um número pseudoaleatório
(function)
[ RAND_MAX](<#/doc/numeric/random/RAND_MAX>) | valor máximo possível gerado por [std::rand](<#/doc/numeric/random/rand>)
(macro constant)
[ reseed](<#/doc/experimental/reseed>) | reinicializa o motor aleatório por thread
(function)
[Documentação C](<#/>) para srand