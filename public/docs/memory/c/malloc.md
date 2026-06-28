# std::malloc

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void* malloc( std::size_t size );
```

Aloca size bytes de armazenamento não inicializado.

Se a alocação for bem-sucedida, retorna um ponteiro para o byte mais baixo (primeiro) no bloco de memória alocado que está adequadamente alinhado para qualquer tipo escalar (pelo menos tão estritamente quanto [std::max_align_t](<#/doc/types/max_align_t>)) ([criando implicitamente](<#/doc/language/objects>) objetos na área de destino).

Se size for zero, o comportamento é definido pela implementação (um ponteiro nulo pode ser retornado, ou um ponteiro não nulo pode ser retornado que não pode ser usado para acessar o armazenamento, mas deve ser passado para [std::free](<#/doc/memory/c/free>)).

As seguintes funções são exigidas como thread-safe:

  * As versões de biblioteca de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>)
  * Versões de substituição do usuário de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>) globais
  * [std::calloc](<#/doc/memory/c/calloc>), **std::malloc** , [std::realloc](<#/doc/memory/c/realloc>), [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), [std::free](<#/doc/memory/c/free>)

Chamadas a essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [happens-before](<#/doc/atomic/memory_order>) a próxima alocação (se houver) nesta ordem. | (desde C++11)

### Parâmetros

- **size** — número de bytes a alocar

### Valor de retorno

Em caso de sucesso, retorna o ponteiro para o início da memória recém-alocada. Para evitar um vazamento de memória, o ponteiro retornado deve ser desalocado com [std::free()](<#/doc/memory/c/free>) ou [std::realloc()](<#/doc/memory/c/realloc>).

Em caso de falha, retorna um ponteiro nulo.

### Observações

Esta função não chama construtores nem inicializa a memória de forma alguma. Não existem smart pointers prontos para uso que possam garantir que a função de desalocação correspondente seja chamada. O método preferido de alocação de memória em C++ é usar funções prontas para RAII como [std::make_unique](<#/doc/memory/unique_ptr/make_unique>), [std::make_shared](<#/doc/memory/shared_ptr/make_shared>), construtores de containers, etc, e, em código de biblioteca de baixo nível, [new-expression](<#/doc/language/new>).

Para carregar um arquivo grande, o mapeamento de arquivo via funções específicas do SO, por exemplo, [`mmap`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/mmap.html>) em POSIX ou `CreateFileMapping`([`A`](<https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createfilemappinga>)/[`W`](<https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-createfilemappingw>)) juntamente com [`MapViewOfFile`](<https://docs.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-mapviewoffile>) no Windows, é preferível a alocar um buffer para leitura de arquivo.

### Exemplo

Execute este código
```cpp
    #include <cstdlib> 
    #include <iostream>   
    #include <memory>
    #include <string>
    
    int main() 
    {
        constexpr std::size_t size = 4;
        if (auto ptr = reinterpret_cast<std::string*>(std::malloc(size * sizeof(std::string))))
        {
            try
            {
                for (std::size_t i = 0; i < size; ++i)
                    std::construct_at(ptr + i, 5, 'a' + i);
                for (std::size_t i = 0; i < size; ++i)
                    std::cout << "ptr[" << i << "] == " << ptr[i] << '\n';
                std::destroy_n(ptr, size);
            }
            catch (...) {}
            std::free(ptr);
        }
    }
```

Saída:
```
    p[0] == aaaaa
    p[1] == bbbbb
    p[2] == ccccc
    p[3] == ddddd
```

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ get_temporary_buffer](<#/doc/memory/get_temporary_buffer>)(obsoleto desde C++17)(removido desde C++20) | obtém armazenamento não inicializado
(modelo de função)
Documentação C para malloc