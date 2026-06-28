# std::aligned_alloc

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void* aligned_alloc( std::size_t alignment, std::size_t size );
```

Aloca `size` bytes de armazenamento não inicializado cuja o alinhamento é especificado por `alignment` ([criando implicitamente](<#/doc/language/objects>) objetos na área de destino). O parâmetro `size` deve ser um múltiplo integral de `alignment`.

As seguintes funções são exigidas como thread-safe:

*   As versões de biblioteca de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>)
*   Versões de substituição do usuário de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>) globais
*   [std::calloc](<#/doc/memory/c/calloc>), [std::malloc](<#/doc/memory/c/malloc>), [std::realloc](<#/doc/memory/c/realloc>), **std::aligned_alloc** , [std::free](<#/doc/memory/c/free>)

Chamadas a essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [happens-before](<#/doc/atomic/memory_order>) a próxima alocação (se houver) nesta ordem.

### Parâmetros

- **alignment** — especifica o alinhamento. Deve ser um alinhamento válido suportado pela implementação.
- **size** — número de bytes a alocar. Um múltiplo integral de `alignment`.

### Valor de retorno

Em caso de sucesso, retorna o ponteiro para o início da memória recém-alocada. Para evitar um vazamento de memória, o ponteiro retornado deve ser desalocado com [std::free](<#/doc/memory/c/free>) ou [std::realloc](<#/doc/memory/c/realloc>).

Em caso de falha, retorna um ponteiro nulo.

### Notas

Passar um `size` que não é um múltiplo integral de `alignment` ou um `alignment` que não é válido ou não é suportado pela implementação faz com que a função falhe e retorne um ponteiro nulo (C11, conforme publicado, especificava comportamento indefinido neste caso, isso foi corrigido por [DR460](<https://open-std.org/JTC1/SC22/WG14/www/docs/summary.htm#dr_460>)).

Como exemplo do requisito "suportado pela implementação", a função POSIX [`posix_memalign`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/posix_memalign.html>) aceita qualquer alinhamento que seja uma potência de dois e um múltiplo de `sizeof(void*)`, e implementações de `aligned_alloc` baseadas em POSIX herdam esses requisitos.

Alinhamentos fundamentais são sempre suportados. Se `alignment` for uma potência de dois e não maior que `alignof([std::max_align_t](<#/doc/types/max_align_t>))`, `aligned_alloc` pode simplesmente chamar [std::malloc](<#/doc/memory/c/malloc>).

[std::malloc](<#/doc/memory/c/malloc>) regular alinha a memória adequada para qualquer tipo de objeto com um alinhamento fundamental. Esta função é útil para alocações super-alinhadas, como para [SSE](<https://en.wikipedia.org/wiki/Streaming_SIMD_Extensions> "enwiki:Streaming SIMD Extensions"), linha de cache, ou limite de [página de VM](<https://en.wikipedia.org/wiki/Page_\(computer_memory\)#Multiple_page_sizes> "enwiki:Page \(computer memory\)").

Esta função não é suportada na biblioteca de tempo de execução C da Microsoft porque sua implementação de [std::free](<#/doc/memory/c/free>) é [incapaz de lidar com alocações alinhadas](<https://learn.microsoft.com/en-us/cpp/standard-library/cstdlib#remarks-6>) de qualquer tipo. Em vez disso, o MS CRT fornece [`_aligned_malloc`](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-malloc>) (a ser liberado com [`_aligned_free`](<https://learn.microsoft.com/en-us/cpp/c-runtime-library/reference/aligned-free>)).

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    
    int main()
    {
        int* p1 = static_cast<int*>(std::malloc(10 * sizeof *p1));
        std::printf("default-aligned address:  %p\n", static_cast<void*>(p1));
        std::free(p1);
    
        int* p2 = static_cast<int*>(std::aligned_alloc(1024, 1024));
        std::printf("1024-byte aligned address: %p\n", static_cast<void*>(p2));
        std::free(p2);
    }
```

Saída possível:
```
    default-aligned address:   0x2221c20
    1024-byte aligned address: 0x2222400
```

### Veja também

[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto em C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de um determinado tamanho
(class template)
[Documentação C](<#/>) para aligned_alloc
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão