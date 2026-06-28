# std::free

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
void free( void* ptr );
```

Desaloca o espaço previamente alocado por [std::malloc](<#/doc/memory/c/malloc>), [std::calloc](<#/doc/memory/c/calloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), ou [std::realloc](<#/doc/memory/c/realloc>).

Se ptr for um ponteiro nulo, a função não faz nada.

O comportamento é indefinido se o valor de ptr não for igual a um valor retornado anteriormente por [std::malloc](<#/doc/memory/c/malloc>), [std::calloc](<#/doc/memory/c/calloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), ou [std::realloc](<#/doc/memory/c/realloc>).

O comportamento é indefinido se a área de memória referenciada por ptr já tiver sido desalocada, ou seja, `std::free` ou [std::realloc](<#/doc/memory/c/realloc>) já tiverem sido chamados com ptr como argumento e nenhuma chamada para [std::malloc](<#/doc/memory/c/malloc>), [std::calloc](<#/doc/memory/c/calloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), ou [std::realloc](<#/doc/memory/c/realloc>) resultou em um ponteiro igual a ptr posteriormente.

O comportamento é indefinido se, após o retorno de `std::free`, um acesso for feito através do ponteiro ptr (a menos que outra função de alocação tenha resultado em um valor de ponteiro igual a ptr).

As seguintes funções são exigidas como thread-safe:

* As versões da biblioteca de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>)
* Versões de substituição do usuário de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>) globais
* [std::calloc](<#/doc/memory/c/calloc>), [std::malloc](<#/doc/memory/c/malloc>), [std::realloc](<#/doc/memory/c/realloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), **std::free**

Chamadas a essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [happens-before](<#/doc/atomic/memory_order>) a próxima alocação (se houver) nesta ordem. | (desde C++11)

### Parâmetros

- **ptr** — ponteiro para a memória a ser desalocada

### Valor de retorno

(nenhum)

### Observações

A função aceita (e não faz nada com) o ponteiro nulo para reduzir a quantidade de casos especiais. Independentemente de a alocação ser bem-sucedida ou não, o ponteiro retornado por uma função de alocação pode ser passado para `std::free`.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    
    int main()
    {
        int* p1 = (int*)std::malloc(10 * sizeof *p1);
        std::free(p1); // todo ponteiro alocado deve ser liberado
    
        int* p2 = (int*)std::calloc(10, sizeof *p2);
        int* p3 = (int*)std::realloc(p2, 1000 * sizeof *p3);
        if (!p3) // p3 nulo significa que realloc falhou e p2 deve ser liberado.
            std::free(p2);
        std::free(p3); // p3 pode ser liberado, seja ele nulo ou não.
    }
```

### Veja também

[Documentação C](<#/>) para free
---