# std::calloc

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
void* calloc( std::size_t num, std::size_t size );
```

Aloca memória para um array de num objetos de tamanho size, inicializa-o com todos os bits zero ([criando implicitamente](<#/doc/language/objects>) objetos na área de destino).

Se a alocação for bem-sucedida, retorna um ponteiro para o byte mais baixo (primeiro) no bloco de memória alocado que está adequadamente alinhado para qualquer tipo de objeto.

Se size for zero, o comportamento é definido pela implementação (um ponteiro nulo pode ser retornado, ou um ponteiro não nulo pode ser retornado que não pode ser usado para acessar o armazenamento).

As seguintes funções são exigidas como thread-safe:

  * As versões de biblioteca de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>)
  * Versões de substituição do usuário de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>) globais
  * **std::calloc** , [std::malloc](<#/doc/memory/c/malloc>), [std::realloc](<#/doc/memory/c/realloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), [std::free](<#/doc/memory/c/free>)

Chamadas a essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [happens-before](<#/doc/atomic/memory_order>) a próxima alocação (se houver) nesta ordem. | (desde C++11)

### Parâmetros

- **num** — número de objetos
- **size** — tamanho de cada objeto

### Valor de retorno

Em caso de sucesso, retorna o ponteiro para o início da memória recém-alocada. Para evitar um vazamento de memória, o ponteiro retornado deve ser desalocado com [std::free()](<#/doc/memory/c/free>) ou [std::realloc()](<#/doc/memory/c/realloc>).

Em caso de falha, retorna um ponteiro nulo.

### Notas

Devido aos requisitos de alinhamento, o número de bytes alocados não é necessariamente igual a num * size.

A inicialização com todos os bits zero não garante que um ponto flutuante ou um ponteiro seja inicializado para 0.0 e o valor de ponteiro nulo, respectivamente (embora isso seja verdade em todas as plataformas comuns).

Originalmente (em C89), o suporte para tamanho zero foi adicionado para acomodar código como
```
    OBJ *p = calloc(0, sizeof(OBJ)); // "zero-length" placeholder
    ...
    while (1)
    {
        p = realloc(p, c * sizeof(OBJ)); // reallocations until size settles
        ... // code that may change c or break out of loop
    }
```

### Exemplo

Execute este código
```
    #include <cstdlib>
    #include <iostream>
    
    int main()
    {
        int* p1 = (int*)std::calloc(4, sizeof(int)); // allocate and zero out an array of 4 int
        int* p2 = (int*)std::calloc(1, sizeof(int[4])); // same, naming the array type directly
        int* p3 = (int*)std::calloc(4, sizeof *p3); // same, without repeating the type name
    
        if (p2)
            for (int n = 0; n < 4; ++n) // print the array
                std::cout << "p2[" << n << "] == " << p2[n] << '\n';
    
        std::free(p1);
        std::free(p2);
        std::free(p3);
    }
```

Saída:
```
    p2[0] == 0
    p2[1] == 0
    p2[2] == 0
    p2[3] == 0
```

### Veja também

[Documentação C](<#/>) para calloc
---